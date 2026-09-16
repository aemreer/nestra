import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ModelDetail } from "@/components/public/model-detail";
import { getPublicModel } from "@/lib/public/models";

export const dynamicParams = true;
export const revalidate = 60;

type ModelDetailPageProps = {
  params: Promise<{ slug: string }>;
};


export async function generateMetadata({
  params,
}: ModelDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = await getPublicModel(slug);

  if (!model) {
    notFound();
  }

  return {
    title: { absolute: model.detail.seoTitle },
    description: model.detail.seoDescription,
  };
}

export default async function ModelDetailPage({ params }: ModelDetailPageProps) {
  const { slug } = await params;
  const model = await getPublicModel(slug);

  if (!model) {
    notFound();
  }

  return <ModelDetail model={model} />;
}
