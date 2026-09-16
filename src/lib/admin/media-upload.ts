export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
export const IMAGE_TYPES = { "image/webp": "webp", "image/png": "png", "image/jpeg": "jpg" } as const;

export function validateImageFile(file: File | null) {
  if (!file || file.size === 0) return "Bir görsel seçin.";
  if (!Object.hasOwn(IMAGE_TYPES, file.type)) return "Yalnızca WebP, PNG veya JPEG görseller yüklenebilir.";
  if (file.size > MAX_IMAGE_SIZE) return "Görsel en fazla 10 MB olabilir.";
  return null;
}

export function isStorageImageUrl(value: string) {
  try {
    const project = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);
    const url = new URL(value);
    return url.protocol === "https:" && url.origin === project.origin && !url.username && !url.password && !url.search && !url.hash
      && url.pathname.startsWith("/storage/v1/object/public/model-media/");
  } catch { return false; }
}
