import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminModel } from "@/lib/admin/models";
import { ModelForm } from "@/components/admin/model-form";
import { getModelContent } from "@/lib/admin/model-content";
import { ModelContentEditor } from "@/components/admin/model-content-editor";
import { ModelMediaSlot } from "@/components/admin/model-media-slot";

export const metadata: Metadata = { title: "Model Düzenle" };

export default async function EditModelPage({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string | string[] }>;
}) {
  const { id } = await params;
  const model = await getAdminModel(id);
  if (!model) notFound();
  const content = await getModelContent(model.id);
  const query = await searchParams;
  return <>
    <Link href="/admin/modeller" className="inline-flex min-h-10 items-center text-sm text-warm-gray underline">← Modeller</Link>
    <h1 className="mb-3 mt-3 text-2xl font-medium tracking-tight sm:text-3xl">{model.name}</h1>
    <div className="mb-5 flex flex-wrap items-center gap-3 text-xs">
      <span className="break-all text-warm-gray">/{model.slug}</span>
      <span className={`border px-2.5 py-1 ${model.published ? "border-olive/30 bg-olive/10" : "border-charcoal/20 bg-stone/20"}`}>{model.published ? "Yayında" : "Taslak"}</span>
      {model.featured && <span className="font-medium text-olive">Öne Çıkan</span>}
    </div>
    <nav aria-label="Model düzenleme bölümleri" className="mb-6 flex flex-wrap gap-x-5 gap-y-2 border-b border-charcoal/15 pb-3 text-sm">
      <a href="#model-information" className="min-h-10 content-center underline underline-offset-4">Ana Bilgiler</a>
      <a href="#sections-heading" className="min-h-10 content-center underline underline-offset-4">İçerik Bölümleri</a>
      <a href="#media-heading" className="min-h-10 content-center underline underline-offset-4">Görseller</a>
    </nav>
    <div id="model-information" className="scroll-mt-6">
    <ModelForm key={model.id} model={model} created={query.created === "1"} />
    </div>
    <section className="mt-10" aria-labelledby="sections-heading">
      <h2 id="sections-heading" className="mb-3 scroll-mt-6 text-lg font-medium">İçerik Bölümleri</h2>
      <p className="mb-5 text-xs leading-5 text-warm-gray">Her bölüm ayrı kaydedilir. Düzenlemek için bölüm başlığını açın.</p>
      {content.sections === null ? <p role="alert" className="text-sm text-[#8a3f32]">İçerik bölümleri yüklenemedi. Lütfen sayfayı yenileyin.</p> : content.sections.length ?
        <div className="border-x border-t border-charcoal/15">{content.sections.map((row) => <ModelContentEditor key={row.id} kind="section" modelId={model.id} row={row} />)}</div> : <p className="text-sm text-warm-gray">Bu modele ait içerik bölümü bulunmuyor.</p>}
    </section>
    <section className="mt-10" aria-labelledby="media-heading">
      <h2 id="media-heading" className="mb-3 scroll-mt-6 text-lg font-medium">Görseller</h2>
      <p className="mb-5 text-xs leading-5 text-warm-gray">Görsel bilgilerini elle düzenleyebilir veya dosya yükleyebilirsiniz. Yükleme tamamlandığında görsel yolu otomatik güncellenir.</p>
      {content.media === null ? <p role="alert" className="text-sm text-[#8a3f32]">Görseller yüklenemedi. Lütfen sayfayı yenileyin.</p> : content.media.length || content.missingRoles.length ?
        <div className="border-x border-t border-charcoal/15">
          {content.media.map((row) => <ModelContentEditor key={row.id} kind="media" modelId={model.id} row={row} />)}
          {content.missingRoles.map((role) => <ModelMediaSlot key={role} modelId={model.id} role={role} />)}
        </div> : <p className="text-sm text-warm-gray">Bu modele ait görsel bulunmuyor.</p>}
    </section>
  </>;
}
