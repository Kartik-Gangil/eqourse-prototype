import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AIDataServicesLayoutProps {
  children: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
}

const AIDataServicesLayout = ({ children, breadcrumbs }: AIDataServicesLayoutProps) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="bg-gradient-to-r from-muted/60 to-background border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5" />
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {children}

      {pathname.startsWith("/ai-data-services/annotation-labeling/") && (
        <aside className="border-y border-border bg-[#eef7f4]" aria-label="Existing dataset quality audit">
          <div className="container mx-auto flex flex-col items-start justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center">
            <div><p className="text-xs font-bold uppercase tracking-[.16em] text-primary">Already have a labeled dataset?</p><p className="mt-1 text-sm text-muted-foreground">Measure its error rate, class confusion and split integrity before adding more labels.</p></div>
            <Link to="/ai-data-services/cleaning-validation/dataset-qa-label-audit" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">Get it audited <ChevronRight className="h-4 w-4" /></Link>
          </div>
        </aside>
      )}

      <Footer />

    </div>
  );
};

export default AIDataServicesLayout;
