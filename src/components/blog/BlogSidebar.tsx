import { ArrowRight, Hash, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "./blogData";

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: { id: string; label: string; count: number }[];
}

/* LinkedIn glyph - matches the canonical CTA used across the site */
const LinkedInGlyph = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`${className} flex-shrink-0`}
    aria-hidden="true"
  >
    <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 1 1 0-3.96 1.98 1.98 0 0 1 0 3.96zm1.959 13.019H3.378V9h3.918v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const BlogSidebar = ({ recentPosts, categories }: BlogSidebarProps) => {
  return (
    <aside className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      {/* LinkedIn Follow CTA */}
      <section
        aria-labelledby="blog-sidebar-linkedin-heading"
        className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm"
      >
        <h3
          id="blog-sidebar-linkedin-heading"
          className="font-heading font-bold text-lg mb-3 flex items-center gap-2"
        >
          <LinkedInGlyph className="w-5 h-5 text-primary" />
          Insights Shaping the Future of Content and AI
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Follow us on LinkedIn for insights on learning, content, and AI solutions at scale.
        </p>
        <a
          href="https://www.linkedin.com/company/eqourse"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow eQOURSE on LinkedIn for learning, content, and AI insights"
          className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg text-sm transition-colors"
        >
          <LinkedInGlyph className="w-4 h-4" />
          Follow on LinkedIn
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

      {/* Categories */}
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-primary" />
          Categories
        </h3>
        <ul className="space-y-2">
          {categories
            .filter((cat) => cat.id !== "All")
            .map((cat) => {
              const isContentServices = cat.id === "Content Services";
              return (
                <li key={cat.id}>
                  <Link
                    to={`/blog?category=${cat.id}`}
                    className="flex items-center justify-between group p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
                      <ChevronRight
                        className={`w-4 h-4 ${isContentServices ? "text-primary" : "text-[#1B9AAA]"
                          } opacity-0 group-hover:opacity-100 transition-opacity -ml-6 group-hover:ml-0`}
                      />
                      {cat.id === "Content Services" ? "Content Service" : cat.label}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${isContentServices
                        ? "bg-primary/10 text-primary"
                        : "bg-[#0D1B2A]/10 text-[#0D1B2A] dark:text-[#1B9AAA]"
                        }`}
                    >
                      {cat.count}
                    </span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-lg mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link key={post.id} to={post.slug} className="group flex gap-3 items-start">
              <div className={`w-16 h-16 rounded-lg flex-shrink-0 bg-muted overflow-hidden relative ${post.thumbnailColor === 'teal' ? 'bg-primary/20' : 'bg-[#0D1B2A]/20'}`}>
                <div className="absolute inset-0 flex items-center justify-center font-bold opacity-30 text-2xl">
                  {post.id % 10}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Free Pilot CTA */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg group block cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4A6] to-[#0D1B2A] z-0 transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-0" />
        <div className="relative z-10 p-8 text-center text-white flex flex-col items-center justify-center min-h-[250px]">
          <h3 className="font-heading font-bold text-2xl mb-3 drop-shadow-md">Ready to Scale?</h3>
          <p className="text-sm text-white/80 mb-6 font-medium">Try our premium Content Services & AI Data solutions today.</p>
          <Link to="/free-pilot" className="bg-white text-[#0D1B2A] px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2">
            Start Free Pilot <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
