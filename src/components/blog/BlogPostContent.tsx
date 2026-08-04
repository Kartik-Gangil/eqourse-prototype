import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Share2, Linkedin, Twitter, Mail, CheckCircle2 } from "lucide-react";
import { BlogPost, blogsData } from "./blogData";
import BlogCard from "./BlogCard";

// ─── Helpers ────────────────────────────────────────────────

function getSectionsFromMarkdown(body: string) {
  const headings: { title: string; level: 'h2' | 'h3' }[] = [];
  const lines = body.split('\n');
  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('## ')) {
      headings.push({ title: line.replace(/^##\s+/, '').trim(), level: 'h2' });
    } else if (line.startsWith('### ')) {
      headings.push({ title: line.replace(/^###\s+/, '').trim(), level: 'h3' });
    }
  }
  return headings;
}

function getSectionsFromHtml(body: string) {
  const headings: { title: string; level: 'h2' | 'h3' }[] = [];
  const regex = /<(h[23])\b[^>]*>(.*?)<\/h[23]>/gi;
  let match;
  while ((match = regex.exec(body)) !== null) {
    const level = match[1].toLowerCase() as 'h2' | 'h3';
    const title = match[2].replace(/<[^>]*>/g, '').trim();
    headings.push({ title, level });
  }
  return headings;
}

function getBlogSections(blog: BlogPost) {
  if (blog.sections && blog.sections.length > 0) {
    return blog.sections;
  }
  if (!blog.body) {
    return [];
  }
  if (blog.bodyFormat === 'html') {
    return getSectionsFromHtml(blog.body);
  }
  return getSectionsFromMarkdown(blog.body);
}

function parseMarkdown(md: string): string {
  if (!md) return "";

  // 1. Escape HTML entities to prevent XSS (allowing only safe block markdown transforms)
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Handle headers (h1 to h3) with generated IDs for Table of Contents anchors
  html = html.replace(/^# (.*?)$/gm, (match, title) => {
    const cleanTitle = title.replace(/\*\*/g, '').replace(/\*/g, '');
    const id = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<h1 id="${id}" class="scroll-mt-32 font-heading font-extrabold text-3xl md:text-5xl mt-12 mb-6">${title}</h1>`;
  });
  
  html = html.replace(/^## (.*?)$/gm, (match, title) => {
    const cleanTitle = title.replace(/\*\*/g, '').replace(/\*/g, '');
    const id = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<h2 id="${id}" class="scroll-mt-32 font-heading font-bold text-2xl md:text-3xl mt-12 mb-6">${title}</h2>`;
  });
  
  html = html.replace(/^### (.*?)$/gm, (match, title) => {
    const cleanTitle = title.replace(/\*\*/g, '').replace(/\*/g, '');
    const id = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<h3 id="${id}" class="scroll-mt-32 font-heading font-bold text-xl md:text-2xl mt-8 mb-4">${title}</h3>`;
  });

  // 3. Handle bold (**text**) and italics (*text*)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 4. Handle blockquotes
  html = html.replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">$1</blockquote>');

  // 5. Handle lists (unordered and ordered) line by line
  const lines = html.split('\n');
  let inUl = false;
  let inOl = false;
  let inParagraph = false;
  const processedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      if (inUl) {
        processedLines.push('</ul>');
        inUl = false;
      }
      if (inOl) {
        processedLines.push('</ol>');
        inOl = false;
      }
      if (inParagraph) {
        processedLines.push('</p>');
        inParagraph = false;
      }
      continue;
    }

    // If it's already a heading or blockquote, close active lists/paragraphs
    if (line.startsWith('<h1') || line.startsWith('<h2') || line.startsWith('<h3') || line.startsWith('<h4') || line.startsWith('<blockquote')) {
      if (inUl) { processedLines.push('</ul>'); inUl = false; }
      if (inOl) { processedLines.push('</ol>'); inOl = false; }
      if (inParagraph) { processedLines.push('</p>'); inParagraph = false; }
      processedLines.push(lines[i]);
      continue;
    }

    // Bullet points: - or *
    const ulMatch = line.match(/^[\*\-]\s+(.*)$/);
    if (ulMatch) {
      if (inOl) { processedLines.push('</ol>'); inOl = false; }
      if (inParagraph) { processedLines.push('</p>'); inParagraph = false; }
      if (!inUl) {
        processedLines.push('<ul class="list-disc pl-6 my-4 space-y-2">');
        inUl = true;
      }
      processedLines.push(`<li class="text-muted-foreground leading-relaxed">${ulMatch[1]}</li>`);
      continue;
    }

    // Numbered list items: 1. or 2.
    const olMatch = line.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (inUl) { processedLines.push('</ul>'); inUl = false; }
      if (inParagraph) { processedLines.push('</p>'); inParagraph = false; }
      if (!inOl) {
        processedLines.push('<ol class="list-decimal pl-6 my-4 space-y-2">');
        inOl = true;
      }
      processedLines.push(`<li class="text-muted-foreground leading-relaxed">${olMatch[1]}</li>`);
      continue;
    }

    // Regular text line
    if (inUl) { processedLines.push('</ul>'); inUl = false; }
    if (inOl) { processedLines.push('</ol>'); inOl = false; }

    if (!inParagraph) {
      processedLines.push('<p class="text-muted-foreground leading-relaxed mb-6">');
      inParagraph = true;
    }
    processedLines.push(lines[i]);
  }

  if (inUl) processedLines.push('</ul>');
  if (inOl) processedLines.push('</ol>');
  if (inParagraph) processedLines.push('</p>');

  return processedLines.join('\n');
}

interface BlogPostContentProps {
  blog: BlogPost;
}

const BlogPostContent = ({ blog }: BlogPostContentProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [copied, setCopied] = useState(false);

  const activeSections = useMemo(() => getBlogSections(blog), [blog]);

  // Scroll Progress and Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      // Progress bar
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);

      // Scroll Spy
      if (activeSections && activeSections.length > 0) {
        const sections = activeSections.map(s => document.getElementById(s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')));
        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(activeSections[i].title);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isTeal = blog.thumbnailColor === 'teal';

  // Get 3 related posts
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(true);

  useEffect(() => {
    setIsLoadingRelated(true);
    setRelatedPosts([]);

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
    if (!baseUrl) {
      setIsLoadingRelated(false);
      return;
    }

    const tags = blog.keywords || [];
    if (tags.length === 0) {
      setIsLoadingRelated(false);
      return;
    }

    const tagsParam = tags.map(t => encodeURIComponent(t)).join(",");
    let cancelled = false;

    fetch(`${baseUrl}/api/blogs?limit=4&tags=${tagsParam}`)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((body) => {
        if (cancelled) return;
        setIsLoadingRelated(false);
        if (!body || !body.success || !body.data || !body.data.items) return;
        const apiBlogs = body.data.items as any[];
        // Filter out current blog by slug to avoid showing the same blog as related
        const filteredApiBlogs = apiBlogs.filter((b: any) => `/blog/${b.slug}` !== blog.slug);

        if (filteredApiBlogs.length === 0) return;

        const mapped: BlogPost[] = filteredApiBlogs.map((b: any, i: number) => ({
          id: i + 1000,
          title: b.title,
          slug: `/blog/${b.slug}`,
          category: (b.tags?.includes("AI Data") ? "AI Data" : "Content Services") as BlogPost["category"],
          date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "2026",
          author: b.author?.name || "eQOURSE",
          excerpt: b.excerpt,
          thumbnailColor: (b.tags?.includes("AI Data") ? "navy" : "teal") as BlogPost["thumbnailColor"],
          keywords: b.tags,
          coverImageUrl: b.coverImageUrl ? (b.coverImageUrl.startsWith("/") ? `${baseUrl}${b.coverImageUrl}` : b.coverImageUrl) : undefined,
          coverImageAlt: b.seo?.coverImageAlt || `${b.title} — eQOURSE blog cover image`,
          coverImageTitle: b.seo?.coverImageTitle || b.title,
        }));

        setRelatedPosts(mapped.slice(0, 3));
      })
      .catch((err) => {
        console.error("Error fetching related blogs:", err);
        if (!cancelled) {
          setIsLoadingRelated(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [blog]);

  return (
    <article className="min-h-screen bg-background relative pb-20">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-muted">
        <div 
          className={`h-full ${isTeal ? 'bg-primary' : 'bg-[#1B9AAA]'}`} 
          style={{ width: `${scrollProgress}%`, transition: 'width 0.1s' }} 
        />
      </div>

      {/* Blog Hero Header */}
      <header className={`relative pt-32 pb-20 overflow-hidden ${isTeal ? 'bg-gradient-to-br from-[#00B4A6]/20 to-background' : 'bg-gradient-to-bl from-[#0D1B2A]/20 to-background'}`}>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <span className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase shadow-sm ${isTeal ? 'bg-primary text-white' : 'bg-[#0D1B2A] text-[#1B9AAA] border border-[#1B9AAA]/30'}`}>
              {blog.category}
            </span>
          </div>
          
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold leading-tight text-foreground mb-8">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground font-medium text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {blog.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              By {blog.author}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-border" />
              {Math.max(5, Math.ceil(blog.excerpt.length / 50))} min read
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          
          {/* Left Sidebar (Socials + TOC) */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32 space-y-8">
              
              {/* Share */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Share Article</h4>
                <div className="flex gap-3">
                  <button onClick={handleShare} className="p-2.5 rounded-full bg-muted text-foreground hover:bg-primary hover:text-white transition-colors" title="Copy Link">
                    {copied ? <CheckCircle2 className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                  </button>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-muted text-foreground hover:bg-[#0077b5] hover:text-white transition-colors" title="Share on LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${window.location.href}`} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-muted text-foreground hover:bg-[#1DA1F2] hover:text-white transition-colors" title="Share on Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Table of Contents */}
              {activeSections && activeSections.length > 0 && (
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                  <h4 className="font-heading font-bold mb-4">Table of Contents</h4>
                  <ul className="space-y-3 text-sm">
                    {activeSections.map((section, idx) => {
                      const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      const isActive = activeSection === section.title;
                      return (
                        <li key={idx} className={section.level === 'h3' ? 'ml-4' : ''}>
                          <a 
                            href={`#${id}`}
                            className={`block transition-colors ${isActive ? (isTeal ? 'text-primary font-bold' : 'text-[#1B9AAA] font-bold') : 'text-muted-foreground hover:text-foreground'}`}
                          >
                            {section.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content Body */}
          <div className="lg:w-3/4 max-w-3xl">
            {blog.coverImageUrl && (
              <div className="mb-8 rounded-2xl overflow-hidden aspect-[16/9] w-full border border-border/50">
                <img src={blog.coverImageUrl} alt={blog.coverImageAlt || blog.title} title={blog.coverImageTitle || blog.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl text-muted-foreground font-medium mb-10 border-l-4 border-primary pl-6 py-2 bg-muted/30 rounded-r-lg">
                {blog.excerpt}
              </p>

              {blog.body ? (
                <div 
                  className="prose-content"
                  dangerouslySetInnerHTML={{ 
                    __html: blog.bodyFormat === 'html' ? blog.body : parseMarkdown(blog.body) 
                  }} 
                />
              ) : (
                /* Procedurally rendered body based on outline */
                blog.sections?.map((section, idx) => {
                  const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  const Heading = section.level as keyof JSX.IntrinsicElements;
                  return (
                    <div key={idx} id={id} className="scroll-mt-32 mb-10">
                      <Heading className="font-heading font-bold text-2xl md:text-3xl mt-12 mb-6">
                        {section.title}
                      </Heading>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        This is a simulated paragraph for the section "{section.title}". In a real CMS integration, this would be populated with rich HTML content. The eQOURSE team covers comprehensive insights on this topic, exploring best practices, challenges, and scalable solutions for modern requirements.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Leveraging industry expertise, this section highlights the critical strategies necessary for success. Whether deploying advanced Content Services platforms or robust AI data pipelines, understanding these foundational elements ensures reliable and impactful outcomes.
                      </p>
                    </div>
                  );
                })
              )}

              {/* Internal Links Block */}
              {blog.internalLinks && blog.internalLinks.length > 0 && (
                <div className="my-12 p-6 bg-muted/50 rounded-2xl border border-border">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary" />
                    Related Services & Resources
                  </h4>
                  <ul className="space-y-2 m-0 list-none p-0">
                    {blog.internalLinks.map((link, idx) => (
                      <li key={idx} className="p-0">
                        <Link to={link} className="text-primary hover:underline font-medium inline-flex items-center gap-1.5">
                          Explore {link.split('/').pop()?.replace(/-/g, ' ')}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom CTA */}
            <div className={`mt-16 rounded-3xl overflow-hidden shadow-lg relative p-10 md:p-16 text-center ${isTeal ? 'bg-gradient-to-br from-[#00B4A6] to-[#004D47]' : 'bg-gradient-to-br from-[#0D1B2A] to-[#1B9AAA]'}`}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
              <div className="relative z-10">
                <h3 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4">Ready to get started?</h3>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  Transform your operations with our premium {isTeal ? 'Content Services' : 'AI Data'} solutions. Partner with eQOURSE today.
                </p>
                <Link to="/free-pilot" className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-3.5 rounded-full font-bold shadow-xl hover:scale-105 transition-transform duration-300">
                  Request a Free Pilot <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="container mx-auto px-4 mt-24">
        <div className="border-t border-border pt-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Related Articles</h2>
            <Link to="/blog" className="text-primary font-bold flex items-center gap-2 hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {isLoadingRelated ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-card border border-border/50 rounded-2xl p-6 h-64 animate-pulse flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : relatedPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <BlogCard key={related.id} blog={related} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-2xl border border-border/50 shadow-sm">
              <p className="text-muted-foreground font-medium">No related articles found.</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogPostContent;
