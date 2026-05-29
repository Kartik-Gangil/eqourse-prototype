import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { X, ZoomIn } from "lucide-react";
import PageLayout from "@/components/shared/PageLayout";

// Construct the array of 21 images dynamically
const galleryImages = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  src: `/assets/about/gallery/${i + 1}.png`,
  alt: `eQOURSE Gallery Image ${i + 1} - Office Tour and Business Meetings`,
}));

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <PageLayout breadcrumbs={[{ label: "About Us", href: "/aboutus" }, { label: "Gallery" }]}>
      <Helmet>
        <title>eQOURSE Gallery | Office Tours & Business Highlights</title>
        <meta 
          name="description" 
          content="Explore the eQOURSE gallery featuring our office tours, CEO business meetings, and event highlights. See the people behind our AI data and content services." 
        />
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
                onClick={() => setSelectedImage(image.src)}
              >
                {/* Image */}
                <div className="relative aspect-auto overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
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
              src={selectedImage} 
              alt="Gallery Preview Fullscreen" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-fade-in-up"
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Gallery;
