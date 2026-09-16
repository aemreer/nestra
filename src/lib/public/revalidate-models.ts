import "server-only";
import { revalidatePath, updateTag } from "next/cache";

export function revalidatePublicModels() {
  updateTag("public-models");
  revalidatePath("/");
  revalidatePath("/modeller");
  revalidatePath("/modeller/[slug]", "page");
}
