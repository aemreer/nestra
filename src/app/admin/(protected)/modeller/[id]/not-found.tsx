import Link from "next/link";

export default function ModelNotFound() {
  return <section><h1 className="text-2xl font-medium">Model bulunamadı.</h1><Link href="/admin/modeller" className="mt-5 inline-block text-sm underline">Modellere dön</Link></section>;
}
