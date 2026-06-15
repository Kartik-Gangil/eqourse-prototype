import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import BlogFilterBar from "./BlogFilterBar";
import BlogPagination from "./BlogPagination";
import BlogSidebar from "./BlogSidebar";
import { blogsData as staticBlogs, BlogPost } from "./blogData";
import { fetchPublishedBlogs } from "@/lib/publicApi";

const POSTS_PER_PAGE = 12;

const BlogGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>(staticBlogs);

  // Try to fetch blogs from API, fall back to static data
  useEffect(() => {
    let cancelled = false;
    fetchPublishedBlogs().then((apiBlogs) => {
      if (cancelled || !apiBlogs || apiBlogs.length === 0) return;
      // Map API blogs to the static BlogPost shape for compatibility
      const mapped: BlogPost[] = apiBlogs.map((b, i) => ({
        id: i + 1,
        title: b.title,
        slug: `/blog/${b.slug}`,
        category: (b.tags?.includes("AI Data") ? "AI Data" : "Content Services") as BlogPost["category"],
        date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "2026",
        author: b.author?.name || "eQOURSE",
        excerpt: b.excerpt,
        thumbnailColor: (b.tags?.includes("AI Data") ? "navy" : "teal") as BlogPost["thumbnailColor"],
        keywords: b.tags,
        coverImageUrl: b.coverImageUrl ? (b.coverImageUrl.startsWith("/") ? `${import.meta.env.VITE_API_BASE_URL || ""}${b.coverImageUrl}` : b.coverImageUrl) : undefined,
      }));
      setAllBlogs(mapped);
    });
    return () => { cancelled = true; };
  }, []);

  // Sync state with URL params
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== activeCategory) {
      setActiveCategory(cat);
      setCurrentPage(1);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setCurrentPage(1);
      if (cat === "All") {
        searchParams.delete("category");
      } else {
        searchParams.set("category", cat);
      }
      setSearchParams(searchParams);
      setIsTransitioning(false);
    }, 300); // Wait for fade out
  };

  const handlePageChange = (page: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: document.getElementById('blog-grid')?.offsetTop! - 100, behavior: 'smooth' });
      setIsTransitioning(false);
    }, 300);
  };

  // Filter blogs
  const filteredBlogs = activeCategory === "All" 
    ? allBlogs 
    : allBlogs.filter(b => b.category === activeCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Featured post is the first one in the filtered list (only on page 1)
  const showFeatured = currentPage === 1 && currentBlogs.length > 0;
  const featuredBlog = currentBlogs[0];
  const gridBlogs = showFeatured ? currentBlogs.slice(1) : currentBlogs;

  // Categories for filter bar
  const [categories, setCategories] = useState([
    { id: "All", label: "All Topics", count: allBlogs.length },
    { id: "Content Services", label: "Content Services", count: allBlogs.filter(b => b.category === "Content Services").length },
    { id: "AI Data", label: "AI Data Services", count: allBlogs.filter(b => b.category === "AI Data").length }
  ]);

  useEffect(() => {
    setCategories([
      { id: "All", label: "All Topics", count: allBlogs.length },
      { id: "Content Services", label: "Content Services", count: allBlogs.filter(b => b.category === "Content Services").length },
      { id: "AI Data", label: "AI Data Services", count: allBlogs.filter(b => b.category === "AI Data").length }
    ]);
  }, [allBlogs]);

  // Recent posts for sidebar (top 5 overall)
  const recentPosts = allBlogs.slice(0, 5);

  return (
    <section id="blog-grid" className="py-20 bg-muted/20 relative min-h-screen">
      {/* Decorative Particles */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-[#0D1B2A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Filter Bar */}
        <BlogFilterBar 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelect={handleCategoryChange} 
        />

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3 xl:w-3/4">
            
            <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              
              {/* Featured Post (Only on Page 1) */}
              {showFeatured && (
                <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <BlogCard blog={featuredBlog} featured={true} />
                </div>
              )}

              {/* Blog Grid */}
              {gridBlogs.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {gridBlogs.map((blog, index) => (
                    <div 
                      key={blog.id} 
                      className="animate-fade-in-up" 
                      style={{ animationDelay: `${(index % 6) * 0.1 + 0.2}s` }}
                    >
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </div>
              ) : (
                !showFeatured && (
                  <div className="text-center py-20 bg-card rounded-2xl border border-border/50">
                    <h3 className="text-xl font-bold text-muted-foreground mb-2">No articles found</h3>
                    <p className="text-muted-foreground">Try selecting a different category.</p>
                  </div>
                )
              )}

              {/* Pagination */}
              <BlogPagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
              
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="sticky top-24">
              <BlogSidebar recentPosts={recentPosts} categories={categories} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
