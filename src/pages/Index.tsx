import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import IndustriesSection from "@/components/IndustriesSection";
import ProcessSection from "@/components/ProcessSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import StrategySection from "@/components/StrategySection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";
import ClientsSection from "@/components/ClientsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

import LeadFormPopup from "@/components/LeadFormPopup";

const Index = () => {
  const [activeServiceTab, setActiveServiceTab] = useState<"education" | "ai">("education");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <JourneyTimeline />
      <StatsSection />
      <ServicesSection activeTab={activeServiceTab} onTabChange={setActiveServiceTab} />

      {/* Conditionally show the relevant process section based on the active services tab.
          Both sections are rendered in the DOM for SEO — only visibility toggles. */}
      <div className="services-process-toggle">
        <div
          className={`services-process-panel ${activeServiceTab === "education" ? "services-process-panel--active" : ""}`}
          aria-hidden={activeServiceTab !== "education"}
        >
          <StrategySection />
        </div>
        <div
          className={`services-process-panel ${activeServiceTab === "ai" ? "services-process-panel--active" : ""}`}
          aria-hidden={activeServiceTab !== "ai"}
        >
          <HowItWorksSection />
        </div>
      </div>

      <IndustriesSection />
      <ProcessSection />
      <CaseStudiesSection />
      <WhyChooseUs />
      <CTASection />
      <ClientsSection />
      <TestimonialsSection />
      <BlogSection />
      <NewsletterSection />
      <Footer />

      <LeadFormPopup />
    </div>
  );
};

export default Index;
