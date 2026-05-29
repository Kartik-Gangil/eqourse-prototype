import { Phone, Mail, MapPin, Shield, Linkedin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import eqourseLogoLight from "@/assets/eqourse-logo-light.png";
import { Link } from "react-router-dom";

/* ── Quick Links: key top-level pages for crawlability ── */
const quickLinks = [
  { label: "About Us", to: "/aboutus" },
  { label: "Case Studies", to: "/casestudy" },
  { label: "Samples", to: "/samples" },
  { label: "Blog", to: "/blog" },
  { label: "Testimonials", to: "/clients-testimonials" },
  { label: "Careers", to: "/career" },
  { label: "FAQs", to: "/faq" },
];

/* ── Content Services: 7 top-level service categories for SEO ── */
const contentServicesLinks = [
  { label: "Content Services Overview", to: "/content-services" },
  { label: "Custom E-Learning Content", to: "/content-services/custom-e-learning-content" },
  { label: "Exam Preparation Content", to: "/content-services/exam-preparation-content" },
  { label: "Learning Solutions", to: "/content-services/learning-solutions" },
  { label: "E-Learning Video Solutions", to: "/content-services/elearning-video-solutions" },
  { label: "Localization Services", to: "/content-services/localization-services" },
  { label: "Technology Solutions", to: "/content-services/technology-solutions" },
  { label: "Subject Matter Experts", to: "/content-services/subject-matter-experts" },
];

/* ── AI Data Services ── */
const aiServiceLinks = [
  { label: "AI Services Overview", to: "/ai-data-services" },
  { label: "Data Collection", to: "/ai-data-services/data-collection" },
  { label: "Annotation & Labeling", to: "/ai-data-services/annotation-labeling" },
  { label: "Cleaning & Validation", to: "/ai-data-services/cleaning-validation" },
  { label: "Model Testing", to: "/ai-data-services/model-testing" },
  { label: "Start Free Pilot", to: "/free-pilot" },
];

/* ── Legal ── */
const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Contact Us", to: "/contact" },
  { label: "Sitemap", to: "/sitemap" },
];

const Footer = () => {
  const linkClass = "block text-sm hover:text-primary transition-colors font-medium";
  const linkColor = { color: "hsl(0, 0%, 95%)", textShadow: "0 1px 4px rgba(0,0,0,0.9)" };
  const headingColor = { color: "hsl(0, 0%, 100%)", textShadow: "0 2px 6px rgba(0,0,0,0.9)" };
  const headingClass = "font-heading font-bold text-lg tracking-wider uppercase pb-2 border-b-2 border-primary/80 inline-block mb-5";

  return (
    <footer className="relative py-16 lg:py-24 bg-foreground overflow-hidden">
      {/* Aesthetic Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-[center_top] opacity-100 blur-[2px]"
        style={{ backgroundImage: "url('/assets/footer-bg.jpg')" }}
      />
      {/* Balanced purple overlay to tint image but maintain readability */}
      <div className="absolute inset-0 z-0 bg-foreground/60 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-foreground/40" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-8">
          {/* ── Brand Column ── */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src={eqourseLogoLight} 
                alt="eQOURSE Logo - Professional AI Data and Content Services" 
                className="h-10 sm:h-12 w-auto object-contain" 
              />
            </Link>
            <p className="text-sm leading-relaxed" style={linkColor}>
              eQOURSE partners with education companies and AI builders worldwide. We design digital learning content, create production-grade AI training datasets, and test AI models in real-world environments — all powered by 500+ domain experts.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold" style={{ color: "hsl(170, 82%, 55%)" }}>ISO 9001</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold" style={{ color: "hsl(170, 82%, 55%)" }}>ISO 27001</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
                <span className="text-[10px] font-bold" style={{ color: "hsl(165, 75%, 65%)" }}>#startupindia</span>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              {[
                { icon: Linkedin, name: "LinkedIn", href: "https://www.linkedin.com/company/eqourse" },
                { icon: Facebook, name: "Facebook", href: "https://www.facebook.com/eQOURSE-102057078229490" },
                { icon: Instagram, name: "Instagram", href: "https://www.instagram.com/eqourse/" },
                { icon: Youtube, name: "YouTube", href: "https://www.youtube.com/@eqourse" },
                { icon: Twitter, name: "X", href: "https://twitter.com/EQourse" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="w-10 h-10 rounded-full hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(20,184,166,0.3)] transition-all duration-300 border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 group">
                    <Icon className="w-5 h-5 text-white/90 group-hover:text-primary transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className={headingClass} style={headingColor}>Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link key={link.label} to={link.to} className={linkClass} style={linkColor}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Content Services ── */}
          <div>
            <h4 className={headingClass} style={headingColor}>Content Services</h4>
            <div className="space-y-3">
              {contentServicesLinks.map((link) => (
                <Link key={link.label} to={link.to} className={linkClass} style={linkColor}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── AI Data Services + Legal ── */}
          <div>
            <h4 className={headingClass} style={headingColor}>AI Data Services</h4>
            <div className="space-y-3">
              {aiServiceLinks.map((link) => (
                <Link key={link.label} to={link.to} className={linkClass} style={linkColor}>
                  {link.label}
                </Link>
              ))}
            </div>
            <h4 className={`${headingClass} mt-6`} style={headingColor}>Legal</h4>
            <div className="space-y-3">
              {legalLinks.map((link) => (
                <Link key={link.label} to={link.to} className={linkClass} style={linkColor}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Our Brand Family ── */}
          <div>
            <h4 className={headingClass} style={headingColor}>Our Brand Family</h4>
            <div className="space-y-3">
              <Link to="/tutrain" className={linkClass} style={linkColor}>TUTRAIN</Link>
              <a href="https://tutrain.com" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkColor}>Visit TUTRAIN.com →</a>
            </div>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className={headingClass} style={headingColor}>Contact</h4>
            <div className="space-y-4">
              <a href="tel:+919214445870" className="flex items-center gap-2 text-sm hover:text-primary transition-colors" style={linkColor}>
                <Phone className="w-4 h-4 text-primary flex-shrink-0" /> +91 - 92144 - 45870
              </a>
              <a href="mailto:info@eqourse.com" className="flex items-center gap-2 text-sm hover:text-primary transition-colors" style={linkColor}>
                <Mail className="w-4 h-4 text-primary flex-shrink-0" /> info@eqourse.com
              </a>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2 text-sm" style={linkColor}>
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block" style={{ color: "hsl(0, 0%, 85%)" }}>India Office</span>
                    C-29, Indra Vihar, Shiv Jyoti School Road, Kota, Rajasthan - 324005
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm" style={linkColor}>
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block" style={{ color: "hsl(0, 0%, 85%)" }}>Singapore Office</span>
                    760 Bedok Reservoir Road, #04-13, Waterfront Waves - 479245
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm font-medium" style={{ color: "hsl(0, 0%, 90%)", textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}>
          &copy; {new Date().getFullYear()} eQOURSE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
