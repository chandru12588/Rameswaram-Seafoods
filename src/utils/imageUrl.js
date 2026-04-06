const ABSOLUTE_URL_PATTERN = /^(https?:)?\/\//i;

export function resolveImageUrl(image, baseUrl = import.meta.env.VITE_API_URL) {
  if (!image) return "";

  const value = String(image).trim();
  if (!value) return "";

  if (
    ABSOLUTE_URL_PATTERN.test(value) ||
    value.startsWith("data:") ||
    value.startsWith("blob:")
  ) {
    return value;
  }

  if (!baseUrl) return value;

  const normalizedBase = String(baseUrl).replace(/\/+$/, "");

  if (value.startsWith("/uploads/")) return `${normalizedBase}${value}`;
  if (value.startsWith("uploads/")) return `${normalizedBase}/${value}`;
  if (value.startsWith("/")) return `${normalizedBase}${value}`;

  return `${normalizedBase}/uploads/${value}`;
}

export function resolveProductImage(product, baseUrl = import.meta.env.VITE_API_URL) {
  const fromImages = Array.isArray(product?.images) ? product.images : [];
  const preferredAbsolute = fromImages.find((img) => ABSOLUTE_URL_PATTERN.test(String(img || "")));
  const image = preferredAbsolute || fromImages[0] || product?.image || "";
  return resolveImageUrl(image, baseUrl);
}
