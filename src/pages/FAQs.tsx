import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import FAQsAccordion from "@/components/faqs/FAQsAccordion";
import { HelpCircle, MessageCircle, Info } from "lucide-react";

const FAQs = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "About Us", href: "/aboutus" }, { label: "FAQs" }]}>
      <Helmet>
        <title>FAQs │ Content Service & AI Data Services │ eQOURSE</title>
        <meta
          name="description"
          content="Frequently asked questions about eQOURSE's Content Services and AI data services. Learn about K-12 content development, data annotation, AI training data, LMS integration, multilingual localization, and more."
        />
        <meta
          name="keywords"
          content="eQOURSE FAQ, Content Services FAQ, AI data services FAQ, e-learning questions, data annotation questions, K12 content FAQ, LMS integration FAQ, AI training data FAQ"
        />
      </Helmet>
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "About Us", item: "https://www.eqourse.com/aboutus" },
          { name: "FAQs", item: "https://www.eqourse.com/faq" }
        ]}
      />

      <ServiceHero
        preHeadline="Got Questions?"
        headline="Frequently Asked"
        headlineAccent="Questions"
        subtext="Find answers to common questions about our Content Services, AI data services, content development process, data annotation quality, scaling options, and more. Whether you're an education company, Content Services platform, or AI team, we aim to provide comprehensive support tailored to your needs."
        ctaText="View FAQs"
        ctaLink="#faq-accordion"
        imageSrc="/assets/about/FAQ.png"
        imageAlt="eQOURSE customer support and frequently asked questions"
        rotatingBadges={[
          { icon: HelpCircle, title: "Support", subtitle: "24/7 assistance", color: "hsl(190 85% 68%)" },
          { icon: MessageCircle, title: "Answers", subtitle: "Comprehensive guides", color: "hsl(170 82% 55%)" },
          { icon: Info, title: "Knowledge", subtitle: "Clear information", color: "hsl(165 75% 71%)" }
        ]}
        bottomBadge={{ iconText: "FAQ", title: "Help Center", subtitle: "We are here for you" }}
      />
      
      <div id="faq-accordion">
        <FAQsAccordion />
      </div>
    </PageLayout>
  );
};

export default FAQs;
