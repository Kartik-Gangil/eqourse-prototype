import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { X, ZoomIn } from "lucide-react";
import PageLayout from "@/components/shared/PageLayout";
import { pageSeo } from "@/seo/pageSeo";

/* Approved title + meta description for this route (see src/seo/pageSeo.ts). */
const PAGE_SEO = pageSeo["/gallery"];

// Gallery images with descriptive, SEO-optimized alt tags
const galleryImages = [
  { id: 1, src: "/assets/about/gallery/1.webp", alt: "eQOURSE team members during an international strategy planning session" },
  { id: 2, src: "/assets/about/gallery/2.webp", alt: "eQOURSE founder meeting with global AI data services clients at industry conference" },
  { id: 3, src: "/assets/about/gallery/3.webp", alt: "eQOURSE content services team collaborating on editorial publishing project" },
  { id: 4, src: "/assets/about/gallery/4.webp", alt: "eQOURSE India office workspace showcasing modern work environment" },
  { id: 5, src: "/assets/about/gallery/5.webp", alt: "eQOURSE leadership team at annual business review and planning event" },
  { id: 6, src: "/assets/about/gallery/6.webp", alt: "eQOURSE team attending international ed-tech and AI data conference" },
  { id: 7, src: "/assets/about/gallery/7.webp", alt: "eQOURSE employees celebrating team achievement and milestone event" },
  { id: 8, src: "/assets/about/gallery/8.webp", alt: "eQOURSE global partnership meeting with content services stakeholders" },
  { id: 9, src: "/assets/about/gallery/9.webp", alt: "eQOURSE office tour showcasing annotation and labeling operations center" },
  { id: 10, src: "/assets/about/gallery/10.webp", alt: "eQOURSE business development team at client engagement workshop" },
  { id: 11, src: "/assets/about/gallery/11.webp", alt: "eQOURSE corporate event highlighting company culture and team spirit" },
  { id: 12, src: "/assets/about/gallery/12.webp", alt: "eQOURSE leadership presenting AI data services capabilities to enterprise clients" },
  { id: 13, src: "/assets/about/gallery/13.webp", alt: "eQOURSE team building activity fostering collaboration across departments" },
  { id: 14, src: "/assets/about/gallery/14.webp", alt: "eQOURSE knowledge sharing session on content services best practices" },
  { id: 15, src: "/assets/about/gallery/15.webp", alt: "eQOURSE international office visit and cross-border team collaboration" },
  { id: 16, src: "/assets/about/gallery/16.webp", alt: "eQOURSE partner meeting discussing e-learning and localization solutions" },
  { id: 17, src: "/assets/about/gallery/17.webp", alt: "eQOURSE team at industry networking event for AI and data services" },
  { id: 18, src: "/assets/about/gallery/18.webp", alt: "eQOURSE workspace interior showcasing professional office environment" },
  { id: 19, src: "/assets/about/gallery/19.webp", alt: "eQOURSE executives at strategic partnership signing ceremony" },
  { id: 20, src: "/assets/about/gallery/20.webp", alt: "eQOURSE team group photo at company annual day celebration" },
  { id: 21, src: "/assets/about/gallery/21.webp", alt: "eQOURSE project delivery team reviewing quality assurance milestones" },
  { id: 22, src: "/assets/about/gallery/22.webp", alt: "eQOURSE team exploring next-generation AI innovation platform during international tech visit" },
  { id: 23, src: "/assets/about/gallery/23.webp", alt: "eQOURSE leadership and partner team at collaborative business meeting in modern conference room" },
  { id: 24, src: "/assets/about/gallery/24.webp", alt: "eQOURSE global team group photo at AI multilingual innovation center" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <PageLayout breadcrumbs={[{ label: "About Us", href: "/aboutus" }, { label: "Gallery" }]}>
      <Helmet>
        <title>{PAGE_SEO.title}</title>
        <meta name="description" content={PAGE_SEO.description} />
        <meta name="keywords" content="eQOURSE gallery, office tour, business meetings, eQOURSE team, company culture, AI data services team, content services office" />
        <link rel="canonical" href="https://www.eqourse.com/gallery" />
        <meta property="og:title" content="eQOURSE Gallery | Office Tours & Business Highlights" />
        <meta property="og:description" content="Take a visual journey through eQOURSE's global office tours, key business meetings, and industry events." />
        <meta property="og:url" content="https://www.eqourse.com/gallery" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-primary opacity-[0.03] z-0" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium border rounded-full border-primary/20 text-primary bg-primary/5 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Inside eQOURSE
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Our <span className="text-transparent bg-clip-text bg-gradient-primary">Gallery</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Take a visual journey through our global office tours, key business meetings, and industry events. Experience the vibrant culture that drives eQOURSE forward.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-secondary/20">
        <div className="container px-4 mx-auto">
          {/* CSS Masonry Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                className="relative overflow-hidden rounded-2xl group break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-500 bg-card border border-border/40 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${(index % 10) * 50}ms` }}
                onClick={() => setSelectedImage({ src: image.src, alt: image.alt })}
              >
                {/* Image */}
                <div className="relative aspect-auto overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    title={image.alt}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/40 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={() => setSelectedImage(null)}>
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110]"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-fade-in-up"
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Gallery;
