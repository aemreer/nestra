-- Supabase SQL Editor: tamamını bir kez çalıştırın (tekrar çalıştırılabilir).
-- Model kaydı ve featured değişikliği tek transaction'da yapılır.
-- SECURITY INVOKER: mevcut authenticated izinleri ve RLS aynen geçerlidir.
-- Tablo izinlerini genişletmez; public içerik/section/media değiştirmez.
-- Önkoşul: authenticated rolünün models üzerinde SELECT/INSERT/UPDATE izinleri ve
-- aktif adminlere izin veren RLS policy'leri; admin_users üzerinde kendi kaydını SELECT.
-- Hata olursa (slug çakışması dahil) featured sıfırlaması da otomatik geri alınır.
begin;

-- Doğrudan tablo yazımlarında da en fazla bir featured model bulunabilir.
-- Mevcut birden çok featured kayıt varsa sessiz veri değişikliği yerine hata verir.
create unique index if not exists models_single_featured_idx
  on public.models (featured) where featured = true;

create or replace function public.admin_save_model(p_id uuid, p_values jsonb)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  v public.models%rowtype;
  v_id uuid;
begin
  if auth.uid() is null or not exists (
    select 1 from public.admin_users where user_id = auth.uid() and is_active = true
  ) then
    raise exception 'ADMIN_REQUIRED' using errcode = '42501';
  end if;

  -- Tüm bu fonksiyon çağrıları aynı kilidi alır; eşzamanlı featured seçimleri sıralanır.
  perform pg_catalog.pg_advisory_xact_lock(184723901, 20260913);

  if pg_catalog.jsonb_typeof(p_values) is distinct from 'object'
    or pg_catalog.jsonb_typeof(p_values->'featured') is distinct from 'boolean'
    or pg_catalog.jsonb_typeof(p_values->'published') is distinct from 'boolean' then
    raise exception 'INVALID_MODEL' using errcode = '22023';
  end if;
  select * into v from pg_catalog.jsonb_populate_record(null::public.models, p_values);
  if v.name is null or pg_catalog.btrim(v.name) = ''
    or v.slug is null or v.slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$'
    or v.area_sqm is null or v.area_sqm <= 0
    or v.rooms is null or pg_catalog.btrim(v.rooms) = ''
    or v.keyword is null or pg_catalog.btrim(v.keyword) = ''
    or v.sort_order is null then
    raise exception 'INVALID_MODEL' using errcode = '22023';
  end if;

  if p_id is not null then
    perform 1 from public.models where id = p_id for update;
    if not found then raise exception 'MODEL_NOT_FOUND' using errcode = 'P0002'; end if;
  end if;
  if exists (select 1 from public.models where slug = v.slug and (p_id is null or id <> p_id)) then
    raise exception 'MODEL_SLUG_CONFLICT' using errcode = '23505';
  end if;

  if v.featured then
    update public.models set featured = false, updated_at = now()
    where featured = true and (p_id is null or id <> p_id);
  end if;

  if p_id is null then
    insert into public.models (
      id, name, slug, area_sqm, rooms, keyword, level_label, summary,
      featured, published, sort_order, created_at, updated_at
    ) values (
      gen_random_uuid(), pg_catalog.btrim(v.name), v.slug, v.area_sqm,
      pg_catalog.btrim(v.rooms), pg_catalog.btrim(v.keyword),
      nullif(pg_catalog.btrim(v.level_label), ''), nullif(pg_catalog.btrim(v.summary), ''),
      v.featured, v.published, v.sort_order, now(), now()
    ) returning id into v_id;
  else
    update public.models set
      name = pg_catalog.btrim(v.name), slug = v.slug, area_sqm = v.area_sqm,
      rooms = pg_catalog.btrim(v.rooms), keyword = pg_catalog.btrim(v.keyword),
      level_label = nullif(pg_catalog.btrim(v.level_label), ''),
      summary = nullif(pg_catalog.btrim(v.summary), ''),
      featured = v.featured, published = v.published, sort_order = v.sort_order, updated_at = now()
    where id = p_id returning id into v_id;
    if v_id is null then raise exception 'MODEL_NOT_FOUND' using errcode = 'P0002'; end if;
  end if;
  return v_id;
end;
$function$;

revoke all on function public.admin_save_model(uuid, jsonb) from public, anon;
grant execute on function public.admin_save_model(uuid, jsonb) to authenticated;

commit;
