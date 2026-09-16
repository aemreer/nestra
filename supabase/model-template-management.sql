-- Supabase SQL Editor'de tamamını çalıştırın. Tekrar çalıştırılabilir.
-- Önkoşul: model-management.sql içindeki admin_save_model fonksiyonu,
-- models/model_sections/model_media için aktif admin SELECT/INSERT/UPDATE RLS ve izinleri.
-- Mevcut model/section/media kayıtlarını değiştirmez. RLS/Storage izinlerini genişletmez.
begin;

create or replace function public.admin_create_model_template(p_values jsonb, p_template text)
returns uuid language plpgsql security invoker set search_path = '' as $function$
declare
  v_id uuid;
  v_keys text[];
  v_key text;
  v_metadata jsonb;
  v_order integer := 0;
begin
  if auth.uid() is null or not exists (select 1 from public.admin_users where user_id = auth.uid() and is_active = true) then
    raise exception 'ADMIN_REQUIRED' using errcode = '42501';
  end if;
  v_keys := case p_template
    when 'single' then array['hero','story','specifications','living','private','approach','layout','cta']
    when 'loft' then array['hero','story','specifications','living','loft','approach','layout','cta']
    when 'wide' then array['hero','story','specifications','living','private','outdoor','approach','layout','cta']
    when 'upper' then array['hero','story','specifications','living','upper-level','private','outdoor','approach','layout','cta']
    when 'empty' then array['hero','specifications','cta']
    else null end;
  if v_keys is null then raise exception 'INVALID_TEMPLATE' using errcode = '22023'; end if;
  -- Reuse slug validation, advisory lock and featured handling in the same transaction.
  v_id := public.admin_save_model(null, p_values);
  foreach v_key in array v_keys loop
    v_order := v_order + 1;
    v_metadata := case
      when v_key in ('hero','living','private','loft','upper-level','outdoor') then pg_catalog.jsonb_build_object('mediaRole',v_key)
      when v_key = 'story' then '{"mediaRole":"exterior"}'::jsonb
      when v_key = 'approach' then '{"mediaRole":"detail","features":[]}'::jsonb
      when v_key = 'specifications' then '{"items":[]}'::jsonb
      when v_key = 'layout' then pg_catalog.jsonb_build_object('mediaRoles',case p_template
        when 'loft' then array['plan-ground','plan-loft']
        when 'upper' then array['plan-ground','plan-upper']
        else array['plan-ground'] end)
      when v_key = 'cta' then '{"href":"/teklif-al","label":"Teklif Al"}'::jsonb
      else '{}'::jsonb end;
    insert into public.model_sections(id,model_id,section_key,eyebrow,title,body,layout,metadata,sort_order,created_at,updated_at)
    values(gen_random_uuid(),v_id,v_key,case v_key
      when 'hero' then 'MODEL' when 'story' then 'MODEL HAKKINDA' when 'specifications' then 'TEMEL BİLGİLER'
      when 'living' then 'YAŞAM' when 'private' then 'ÖZEL ALANLAR' when 'loft' then 'LOFT'
      when 'upper-level' then 'ÜST SEVİYE' when 'outdoor' then 'İÇ-DIŞ YAŞAM'
      when 'approach' then 'MODEL YAKLAŞIMI' when 'layout' then 'YERLEŞİM' else 'TEKLİF' end,
      'Başlık ekleyin','Bu bölümün açıklamasını ekleyin.',null,v_metadata,v_order,now(),now());
  end loop;
  return v_id;
end;
$function$;

-- Serializes first-slot uploads for a model without imposing a new unique constraint
-- on existing seeded media. A concurrent second upload updates the same role.
create or replace function public.admin_attach_model_media(p_model_id uuid, p_role text, p_src text)
returns uuid language plpgsql security invoker set search_path = '' as $function$
declare v_id uuid;
begin
  if auth.uid() is null or not exists (select 1 from public.admin_users where user_id = auth.uid() and is_active = true) then
    raise exception 'ADMIN_REQUIRED' using errcode = '42501';
  end if;
  if p_role is null or p_role !~ '^[a-zA-Z0-9_-]+$' or p_src is null or pg_catalog.btrim(p_src) = '' then
    raise exception 'INVALID_MEDIA' using errcode = '22023';
  end if;
  perform 1 from public.models where id = p_model_id for update;
  if not found then raise exception 'MODEL_NOT_FOUND' using errcode = 'P0002'; end if;
  if not exists (select 1 from public.model_sections where model_id = p_model_id
    and (metadata->>'mediaRole' = p_role or
      (pg_catalog.jsonb_typeof(metadata->'mediaRoles') = 'array' and (metadata->'mediaRoles') ? p_role))) then
    raise exception 'UNEXPECTED_MEDIA_ROLE' using errcode = '22023';
  end if;
  select id into v_id from public.model_media where model_id = p_model_id and role = p_role order by sort_order,id limit 1 for update;
  if v_id is null then
    insert into public.model_media(id,model_id,role,src,alt_text,aspect_ratio,sort_order,created_at)
    values(gen_random_uuid(),p_model_id,p_role,p_src,null,null,
      (select coalesce(max(sort_order),0) + 1 from public.model_media where model_id = p_model_id),now()) returning id into v_id;
  else
    update public.model_media set src = p_src where id = v_id;
  end if;
  return v_id;
end;
$function$;

revoke all on function public.admin_create_model_template(jsonb,text) from public,anon;
revoke all on function public.admin_attach_model_media(uuid,text,text) from public,anon;
grant execute on function public.admin_create_model_template(jsonb,text) to authenticated;
grant execute on function public.admin_attach_model_media(uuid,text,text) to authenticated;
commit;
