import { lazy, useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DeferredSection from "@/components/performance/DeferredSection";
import { pageSeo } from "@/seo/pageSeo";

const JourneyTimeline = lazy(() => import("@/components/JourneyTimeline"));
const StatsSection = lazy(() => import("@/components/StatsSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const IndustriesSection = lazy(() => import("@/components/IndustriesSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const CaseStudiesSection = lazy(() => import("@/components/CaseStudiesSection"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const CTASection = lazy(() => import("@/components/CTASection"));
const ClientsSection = lazy(() => import("@/components/ClientsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const NewsletterSection = lazy(() => import("@/components/NewsletterSection"));
const Footer = lazy(() => import("@/components/Footer"));
const OurBrandsSection = lazy(() => import("@/components/OurBrandsSection"));
const LeadFormPopup = lazy(() => import("@/components/LeadFormPopup"));

const PAGE_SEO = pageSeo["/"];

const Index = () => {
  const [activeServiceTab, setActiveServiceTab] = useState<"education" | "ai">("education");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{PAGE_SEO.title}</title>
        <meta
          name="description"
          content={PAGE_SEO.description}
        />
        <meta
          name="keywords"
          content="eQOURSE, Content Services, AI data services, robotics training data, Physical AI, Embodied AI, e-learning content development, custom e-learning, curriculum development, data annotation, AI training data, model testing, K12 content, educational technology, localization services, LMS integration, India, Singapore"
        />
        <link rel="canonical" href="https://www.eqourse.com/" />
        <meta property="og:title" content={PAGE_SEO.title} />
        <meta
          property="og:description"
          content={PAGE_SEO.description}
        />
        <meta property="og:url" content="https://www.eqourse.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="eQOURSE" />
        <meta property="og:image" content="https://www.eqourse.com/assets/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EQourse" />
        <meta name="twitter:title" content={PAGE_SEO.title} />
        <meta
          name="twitter:description"
          content={PAGE_SEO.description}
        />
        <meta name="twitter:image" content="https://www.eqourse.com/assets/og-image.png" />

        {/* Organization structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.eqourse.com/#organization",
              "name": "eQOURSE",
              "alternateName": "eQOURSE PTE LTD",
              "url": "https://www.eqourse.com",
              "logo": "https://www.eqourse.com/assets/og-image.png",
              "description": "eQOURSE delivers end-to-end Content Services and AI data services. Custom e-learning content, curriculum development, data annotation, and model testing for global education and AI teams.",
              "foundingDate": "2020",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "minValue": 500
              },
              "sameAs": [
                "https://www.linkedin.com/company/eqourse",
                "https://www.facebook.com/eQOURSE-102057078229490",
                "https://www.instagram.com/eqourse/",
                "https://www.youtube.com/@eqourse",
                "https://twitter.com/EQourse"
              ],
              "subOrganization": [
                {
                  "@type": "Organization",
                  "@id": "https://tutrain.com/#organization",
                  "name": "TUTRAIN",
                  "url": "https://tutrain.com"
                },
                {
                  "@type": "Organization",
                  "@id": "https://plus.eqourse.com/#organization",
                  "name": "eQOURSE+",
                  "url": "https://plus.eqourse.com"
                }
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-92144-45870",
                  "contactType": "customer service",
                  "email": "info@eqourse.com",
                  "areaServed": ["IN", "SG", "US", "GB", "AE", "CN"],
                  "availableLanguage": ["English", "Hindi"]
                }
              ],
              "knowsAbout": [
                "Content Services",
                "AI Data Services",
                "E-Learning Content Development",
                "Curriculum Development",
                "Data Annotation & Labeling",
                "AI Model Testing",
                "Robotics & Physical AI Training Data",
                "Embodied AI Data",
                "Localization Services",
                "LMS Integration"
              ],
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "C-29, Indra Vihar, Shiv Jyoti School Road",
                  "addressLocality": "Kota",
                  "addressRegion": "Rajasthan",
                  "postalCode": "324005",
                  "addressCountry": "IN"
                },
                {
                  "@type": "PostalAddress",
                  "streetAddress": "760 Bedok Reservoir Road, #04-13, Waterfront Waves",
                  "addressLocality": "Singapore",
                  "postalCode": "479245",
                  "addressCountry": "SG"
                }
              ]
            }
          `}
        </script>

        {/* WebSite structured data for sitelinks search box */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "eQOURSE",
              "url": "https://www.eqourse.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.eqourse.com/blog?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Helmet>

      <Navbar />
      <HeroSection />
      <AboutSection />
      <DeferredSection minHeight={720}><JourneyTimeline /></DeferredSection>
        <DeferredSection minHeight={420}><StatsSection /></DeferredSection>
        <DeferredSection minHeight={900}>
          <ServicesSection activeTab={activeServiceTab} onTabChange={setActiveServiceTab} />
        </DeferredSection>
        <DeferredSection minHeight={720}><ProcessSection /></DeferredSection>
        <DeferredSection minHeight={800}><IndustriesSection /></DeferredSection>
        <DeferredSection minHeight={680}><CaseStudiesSection /></DeferredSection>
        <DeferredSection minHeight={760}><WhyChooseUs /></DeferredSection>
        <DeferredSection minHeight={360}><CTASection /></DeferredSection>
        <DeferredSection minHeight={520}><OurBrandsSection /></DeferredSection>
        <DeferredSection minHeight={420}><ClientsSection /></DeferredSection>
        <DeferredSection minHeight={700}><TestimonialsSection /></DeferredSection>
        <DeferredSection minHeight={700}><BlogSection /></DeferredSection>
        <DeferredSection minHeight={320}><NewsletterSection /></DeferredSection>
        <DeferredSection minHeight={720}><Footer /></DeferredSection>
      <DeferredSection minHeight={1}><LeadFormPopup /></DeferredSection>
    </div>
  );
};

export default Index;
