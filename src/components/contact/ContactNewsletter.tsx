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

const ContactNewsletter = () => {
  return (
    <section
      aria-labelledby="contact-linkedin-heading"
      className="py-16 md:py-20 bg-background relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 reveal-up">
        <div className="max-w-5xl mx-auto bg-card rounded-3xl p-6 sm:p-8 md:p-12 border border-border shadow-elevated overflow-hidden relative">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-3 space-y-5 md:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                <LinkedInGlyph className="w-4 h-4" /> LinkedIn
              </div>

              <h2
                id="contact-linkedin-heading"
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight"
                style={{ color: '#1A1A1A' }}
              >
                Insights Shaping the Future of Content and AI
              </h2>

              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed" style={{ color: '#666666' }}>
                Follow us on LinkedIn for insights on learning, content, and AI solutions at scale.
              </p>

              <div className="pt-2 flex justify-center lg:justify-start">
                <a
                  href="https://www.linkedin.com/company/eqourse"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow eQOURSE on LinkedIn for learning, content, and AI insights"
                  className="inline-flex items-center justify-center gap-2.5 h-[56px] px-6 sm:px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl whitespace-nowrap shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
                >
                  <LinkedInGlyph className="w-5 h-5" />
                  Follow on LinkedIn
                </a>
              </div>
            </div>

            {/* Right Visual (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-2 relative h-full min-h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-navy/20 rounded-2xl flex items-center justify-center border border-border/50 shadow-inner overflow-hidden">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/50" />
                  <LinkedInGlyph className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-primary/30" />
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl" />
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-navy/20 rounded-full blur-2xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-card rounded-xl shadow-lg border border-border flex flex-col p-4 rotate-12 hover:rotate-0 transition-transform duration-500">
                    <div className="w-8 h-2 bg-primary/20 rounded-full mb-3" />
                    <div className="space-y-2">
                      <div className="w-full h-1.5 bg-muted rounded-full" />
                      <div className="w-5/6 h-1.5 bg-muted rounded-full" />
                      <div className="w-4/6 h-1.5 bg-muted rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactNewsletter;
