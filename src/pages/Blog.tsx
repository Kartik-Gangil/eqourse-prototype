import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { pageSeo } from "@/seo/pageSeo";

/* Approved title + meta description for this route (see src/seo/pageSeo.ts). */
const PAGE_SEO = pageSeo["/blog"];

const Blog = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "Blog", href: "/blog" }]}>
      <Helmet>
        <title>{PAGE_SEO.title}</title>
        <meta name="description" content={PAGE_SEO.description} />
        <meta
          name="keywords"
          content="Content Services blog, AI data services blog, e-learning insights, machine learning training data, annotation best practices, eQOURSE blog"
        />
        <meta property="og:title" content="Insights & Trends in Content Services and AI Data Services │ eQOURSE" />
        <meta property="og:description" content="Expert articles and industry perspectives covering Content Services and AI Data Services." />
        <link rel="canonical" href="https://www.eqourse.com/blog" />
        
        {/* CollectionPage Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "eQOURSE Blog",
              "description": "Insights & Trends in Content Services and AI Data Services",
              "url": "https://www.eqourse.com/blog",
              "publisher": {
                "@type": "Organization",
                "name": "eQOURSE",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.eqourse.com/logo.png"
                }
              }
            }
          `}
        </script>
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "Blog", item: "https://www.eqourse.com/blog" }
        ]}
      />

      <BlogHero />
      <BlogGrid />
      
    </PageLayout>
  );
};

export default Blog;
