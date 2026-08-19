import { Helmet } from "react-helmet-async";
import type { ArticleSeoConfig } from "@/seo/articleSeoHead";

/**
 * CMS article SEO head — uses react-helmet-async so that it shares the same
 * tag-reconciliation path as the prerender script's `data-rh="true"` tags.
 *
 * Previous versions used direct DOM manipulation (`applyArticleSeo`), which
 * deleted Helmet's tracked tags and caused Helmet to re-insert them, producing
 * duplicate title / description / canonical on every blog and case-study page.
 */
const ArticleSEOHead = (config: ArticleSeoConfig) => {
  const ogImage = config.image || "https://www.eqourse.com/assets/og-image.webp";

  return (
    <Helmet>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      {config.keywords?.length ? (
        <meta name="keywords" content={config.keywords.join(", ")} />
      ) : null}
      <link rel="canonical" href={config.canonical} />

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="eQOURSE" />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:url" content={config.canonical} />
      <meta property="og:image" content={ogImage} />
      {config.imageAlt ? <meta property="og:image:alt" content={config.imageAlt} /> : null}
      {config.author ? <meta property="article:author" content={config.author} /> : null}
      {config.publishedAt ? <meta property="article:published_time" content={config.publishedAt} /> : null}
      {config.modifiedAt ? <meta property="article:modified_time" content={config.modifiedAt} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@EQourse" />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={ogImage} />

      {config.schema ? (
        <script type="application/ld+json">
          {JSON.stringify(config.schema).replace(/</g, "\\u003c")}
        </script>
      ) : null}
    </Helmet>
  );
};

export default ArticleSEOHead;
