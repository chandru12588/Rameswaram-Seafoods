import { useEffect } from "react";

const SITE_URL = "https://rameswaram-seafoods.vercel.app";

function upsertMetaByName(name, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertMetaByProperty(property, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export default function Seo({ title, description, path = "/", keywords, image = "/logo.png" }) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`;
    const fullTitle = title
      ? `${title} | Rameswaram Fresh Seafoods`
      : "Rameswaram Fresh Seafoods | Order Fresh Seafood in Trichy";

    document.title = fullTitle;
    upsertMetaByName("description", description);
    upsertMetaByName("keywords", keywords);
    upsertMetaByName("robots", "index,follow,max-image-preview:large");
    upsertCanonical(canonicalUrl);

    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:site_name", "Rameswaram Fresh Seafoods");
    upsertMetaByProperty("og:title", fullTitle);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:image", `${SITE_URL}${image}`);

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", fullTitle);
    upsertMetaByName("twitter:description", description);
    upsertMetaByName("twitter:image", `${SITE_URL}${image}`);
  }, [title, description, path, keywords, image]);

  return null;
}
