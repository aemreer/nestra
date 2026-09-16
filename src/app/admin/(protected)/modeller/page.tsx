import type { Metadata } from "next";
import Link from "next/link";
import { getAdminModels } from "@/lib/admin/models";

export const metadata: Metadata = { title: "Model Yönetimi" };

export default async function AdminModelsPage() {
  const models = await getAdminModels();
  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">Modeller</h1>
        <Link href="/admin/modeller/yeni" className="inline-flex min-h-12 items-center bg-charcoal px-5 text-sm text-soft-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal">Yeni Model</Link>
      </div>
      {models.length ? <div className="overflow-x-auto border border-charcoal/15 bg-soft-white">
        <table className="admin-table w-full text-left text-sm">
          <caption className="sr-only">Modeller, sıralama değerine göre. Düzenlemek için model adına tıklayın.</caption>
          <thead className="border-b border-charcoal/15 bg-stone/15 text-xs text-warm-gray">
            <tr>{["Model adı", "Alan", "Plan", "Karakter", "Yapı", "Yayın Durumu", "Sıra"].map((label) => <th key={label} scope="col" className="whitespace-nowrap px-5 py-4 font-medium">{label}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10">
            {models.map((model) => <tr key={model.id} className="relative hover:bg-stone/15 focus-within:bg-stone/15">
              <th scope="row" className="px-5 py-4 font-medium">
                <Link href={`/admin/modeller/${model.id}`} className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal">{model.name}<span aria-hidden="true" className="ml-2 text-warm-gray">↗</span><span className="sr-only"> — düzenle</span></Link>
                <span className="mt-1 block break-all text-xs font-normal text-warm-gray">/{model.slug}</span>
                {model.featured && <span className="mt-1 block text-xs font-normal text-olive">Öne Çıkan</span>}
              </th>
              <td data-label="Alan" className="whitespace-nowrap px-5 py-4">{model.area_sqm.toLocaleString("tr-TR")} m²</td>
              <td data-label="Plan" className="whitespace-nowrap px-5 py-4">{model.rooms}</td>
              <td data-label="Karakter" className="px-5 py-4">{model.keyword}</td>
              <td data-label="Yapı" className="px-5 py-4">{model.level_label || "Belirtilmedi"}</td>
              <td data-label="Yayın Durumu" className="px-5 py-4"><span className={`inline-flex border px-2.5 py-1 text-xs ${model.published ? "border-olive/30 bg-olive/10" : "border-charcoal/20 bg-stone/20 text-warm-gray"}`}>{model.published ? "Yayında" : "Taslak"}</span></td>
              <td data-label="Sıra" className="px-5 py-4 tabular-nums">{model.sort_order}</td>
            </tr>)}
          </tbody>
        </table>
      </div> : <p className="border border-charcoal/15 bg-soft-white p-6 text-sm text-warm-gray">Henüz model bulunmuyor.</p>}
    </>
  );
}
