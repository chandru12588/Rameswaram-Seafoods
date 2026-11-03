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
  // Product edits put the replacement image first. Do not search ahead for
  // another absolute URL, since that can select an older image instead.
  const image = fromImages[0] || product?.image || "";
  return resolveImageUrl(image, baseUrl);
}
