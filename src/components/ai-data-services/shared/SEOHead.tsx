import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getPageSeo } from "@/seo/pageSeo";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
  ogImage?: string;
}

const SEOHead = ({ title, description, canonical, ogTitle, ogDescription, keywords, ogImage }: SEOHeadProps) => {
  const { pathname } = useLocation();

  /**
   * The approved title/description for a route live in src/seo/pageSeo.ts and
   * take precedence over whatever the page passes in. That keeps a single
   * source of truth for SEO copy across ~100 pages instead of scattering it
   * over individual page components and data files. Unmapped routes (blog and
   * case-study detail pages, which are content-driven) fall back to props.
   */
  const mapped = getPageSeo(pathname);
  const resolvedTitle = mapped?.title ?? title;
  const resolvedDescription = mapped?.description ?? description;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={ogTitle || resolvedTitle} />
      <meta property="og:description" content={ogDescription || resolvedDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="eQOURSE" />
      <meta property="og:image" content={ogImage || "https://www.eqourse.com/assets/og-image.png"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@EQourse" />
      <meta name="twitter:title" content={ogTitle || resolvedTitle} />
      <meta name="twitter:description" content={ogDescription || resolvedDescription} />
      <meta name="twitter:image" content={ogImage || "https://www.eqourse.com/assets/og-image.png"} />
    </Helmet>
  );
};

export default SEOHead;
