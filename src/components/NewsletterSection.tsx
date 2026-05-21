const NewsletterSection = () => {
  return (
    <section aria-labelledby="insights-heading" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4 text-center">
        <h2
          id="insights-heading"
          className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight px-2"
          style={{ color: 'hsl(0, 0%, 100%)' }}
        >
          Insights Shaping the Future of Content and AI
        </h2>
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-8 px-4 leading-relaxed"
          style={{ color: 'hsl(242, 20%, 70%)' }}
        >
          Follow us on LinkedIn for insights on learning, content, and AI solutions at scale.
        </p>

        <a
          href="https://www.linkedin.com/company/eqourse"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow eQOURSE on LinkedIn for learning, content, and AI insights"
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-soft"
          style={{ background: 'linear-gradient(135deg, hsl(170, 82%, 36%), hsl(168, 80%, 28%))' }}
        >
          {/* LinkedIn icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 flex-shrink-0"
            aria-hidden="true"
          >
            <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 1 1 0-3.96 1.98 1.98 0 0 1 0 3.96zm1.959 13.019H3.378V9h3.918v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Follow on LinkedIn
        </a>
      </div>
    </section>
  );
};

export default NewsletterSection;
