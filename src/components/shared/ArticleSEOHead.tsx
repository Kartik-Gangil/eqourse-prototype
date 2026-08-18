import { useLayoutEffect } from "react";
import { applyArticleSeo, type ArticleSeoConfig } from "@/seo/articleSeoHead";

const ArticleSEOHead = (config: ArticleSeoConfig) => {
  const {
    title,
    description,
    canonical,
    image,
    imageAlt,
    author,
    publishedAt,
    modifiedAt,
  } = config;
  const keywordsKey = config.keywords?.join("\u0000") || "";
  const schemaKey = config.schema ? JSON.stringify(config.schema) : "";

  useLayoutEffect(
    () => applyArticleSeo(document, {
      title,
      description,
      canonical,
      keywords: keywordsKey ? keywordsKey.split("\u0000") : undefined,
      image,
      imageAlt,
      author,
      publishedAt,
      modifiedAt,
      schema: schemaKey ? JSON.parse(schemaKey) : undefined,
    }),
    [
      title,
      description,
      canonical,
      keywordsKey,
      image,
      imageAlt,
      author,
      publishedAt,
      modifiedAt,
      schemaKey,
    ],
  );

  return null;
};

export default ArticleSEOHead;
