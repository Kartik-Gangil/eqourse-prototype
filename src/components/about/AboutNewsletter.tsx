/* LinkedIn glyph — matches the canonical CTA used across the site */
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

const AboutNewsletter = () => {
  return (
    <section
      aria-labelledby="about-linkedin-heading"
      className="py-20 md:py-24 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-primary rounded-3xl p-1 md:p-2 shadow-2xl">
          <div className="bg-card rounded-[1.3rem] p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-8 md:gap-10 border border-border/10">
            <div className="flex-1">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-5 md:mb-6 mx-auto md:mx-0">
                <LinkedInGlyph className="w-6 h-6" />
              </div>
              <h2
                id="about-linkedin-heading"
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-3 md:mb-4 leading-tight"
              >
                Insights Shaping the Future of Content and AI
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mb-0 mx-auto md:mx-0">
                Follow us on LinkedIn for insights on learning, content, and AI solutions at scale.
              </p>
            </div>

            <div className="w-full md:w-auto flex justify-center md:justify-end">
              <a
                href="https://www.linkedin.com/company/eqourse"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow eQOURSE on LinkedIn for learning, content, and AI insights"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-primary border-0 shadow-soft hover:opacity-90 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto whitespace-nowrap"
              >
                <LinkedInGlyph className="w-5 h-5" />
                Follow on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNewsletter;
