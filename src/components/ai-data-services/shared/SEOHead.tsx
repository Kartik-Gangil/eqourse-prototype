import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
  ogImage?: string;
}

const SEOHead = ({ title, description, canonical, ogTitle, ogDescription, keywords, ogImage }: SEOHeadProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}
    <link rel="canonical" href={canonical} />
    <meta property="og:title" content={ogTitle || title} />
    <meta property="og:description" content={ogDescription || description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    <meta property="og:site_name" content="eQOURSE" />
    <meta property="og:image" content={ogImage || "https://www.eqourse.com/assets/og-image.png"} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@EQourse" />
    <meta name="twitter:title" content={ogTitle || title} />
    <meta name="twitter:description" content={ogDescription || description} />
    <meta name="twitter:image" content={ogImage || "https://www.eqourse.com/assets/og-image.png"} />
  </Helmet>
);

export default SEOHead;
