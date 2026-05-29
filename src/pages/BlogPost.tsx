import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import { blogsData, BlogPost as BlogPostType } from "@/components/blog/blogData";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { fetchBlogBySlug } from "@/lib/publicApi";
import { Loader2 } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogPostType | null | undefined>(undefined); // undefined = loading

  useEffect(() => {
    if (!slug) return;

    // First, try static data for instant render
    const fullSlug = `/blog/${slug}`;
    const staticBlog = blogsData.find(b => b.slug === fullSlug);
    
    if (staticBlog) {
      setBlog(staticBlog);
    }

    // Then try API (will override static if successful)
    fetchBlogBySlug(slug).then((apiBlog) => {
      if (!apiBlog) {
        // API unavailable - keep static result (or null if not found statically)
        if (!staticBlog) setBlog(null);
        return;
      }
      // Map API blog to static BlogPost shape
      setBlog({
        id: 1,
        title: apiBlog.title,
        slug: `/blog/${apiBlog.slug}`,
        category: (apiBlog.tags?.includes("AI Data") ? "AI Data" : "Content Services") as BlogPostType["category"],
        date: apiBlog.publishedAt ? new Date(apiBlog.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "2026",
        author: apiBlog.author?.name || "eQOURSE",
        excerpt: apiBlog.excerpt,
        thumbnailColor: (apiBlog.tags?.includes("AI Data") ? "navy" : "teal") as BlogPostType["thumbnailColor"],
        keywords: apiBlog.tags,
        coverImageUrl: apiBlog.coverImageUrl ? (apiBlog.coverImageUrl.startsWith("/") ? `${import.meta.env.VITE_API_BASE_URL || ""}${apiBlog.coverImageUrl}` : apiBlog.coverImageUrl) : undefined,
        body: apiBlog.body,
        bodyFormat: apiBlog.bodyFormat,
      });
    });
  }, [slug]);

  // Loading state
  if (blog === undefined) {
    return (
      <PageLayout breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: "Loading..." }]}>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </PageLayout>
    );
  }

  if (!blog) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageLayout breadcrumbs={[
      { label: "Blog", href: "/blog" },
      { label: blog.title }
    ]}>
      <Helmet>
        <title>{blog.title} │ eQOURSE Blog</title>
        <meta name="description" content={blog.excerpt} />
        {blog.keywords && (
          <meta name="keywords" content={blog.keywords.join(", ")} />
        )}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={blog.date} />
        <meta property="article:author" content={blog.author} />
        <link rel="canonical" href={`https://www.eqourse.com${blog.slug}`} />

        {/* BlogPosting Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.eqourse.com${blog.slug}"
              },
              "headline": "${blog.title}",
              "description": "${blog.excerpt.replace(/"/g, '\\"')}",
              "author": {
                "@type": "Organization",
                "name": "${blog.author}"
              },
              "publisher": {
                "@type": "Organization",
                "name": "eQOURSE",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.eqourse.com/logo.png"
                }
              },
              "datePublished": "2026-04-01"
            }
          `}
        </script>
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "Blog", item: "https://www.eqourse.com/blog" },
          { name: blog.title, item: `https://www.eqourse.com${blog.slug}` }
        ]}
      />

      <BlogPostContent blog={blog} />
    </PageLayout>
  );
};

export default BlogPost;
