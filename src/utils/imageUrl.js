const ABSOLUTE_URL_PATTERN = /^(https?:)?\/\//i;

export function resolveImageUrl(image, baseUrl = import.meta.env.VITE_API_URL) {
  if (!image) return "/logo.png";

  const value = String(image).trim();
  if (!value) return "/logo.png";

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
  const image = product?.images?.[0] || product?.image || "";
  return resolveImageUrl(image, baseUrl);
}
