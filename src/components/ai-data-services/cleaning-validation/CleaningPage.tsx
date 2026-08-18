import { Helmet } from "react-helmet-async";
import { FileSearch2, GitCompareArrows, ScanSearch } from "lucide-react";
import AIDataServicesLayout from "../shared/AIDataServicesLayout";
import SEOHead from "../shared/SEOHead";
import ServiceHero from "../shared/ServiceHero";
import ServiceCTA from "../shared/ServiceCTA";
import {
  CleaningDefinition,
  CleaningFAQ,
  CleaningMotionStyles,
  CleaningProcess,
  CleaningServices,
  CleaningTrustStrip,
  DefectAtlas,
  DeliveryCommercial,
  HumanAutomation,
  LateErrorCost,
  LlmPrivacyDelivery,
  PipelineProofWhy,
  QualityReport,
} from "./CleaningCoreSections";
import { cleaningFaqs } from "./CleaningContent";

const canonical = "https://www.eqourse.com/ai-data-services/cleaning-validation";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Data Cleaning & Validation Services",
      serviceType: "AI Data Cleaning and Validation",
      url: canonical,
      description: "Data cleaning and validation services for AI training data including deduplication, noise removal, PII redaction, consistency normalization, metadata enrichment, dataset QA and label auditing, LLM training data curation and human data verification, with error rates reported by defect category and every change logged and reversible.",
      provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/", address: [{ "@type": "PostalAddress", addressCountry: "IN" }, { "@type": "PostalAddress", addressCountry: "SG" }] },
      areaServed: "Worldwide",
      availableLanguage: "en",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Data Cleaning and Validation Service Lines",
        itemListElement: [
          { name: "Data Cleaning & Preparation", url: `${canonical}/data-cleaning-preparation` },
          { name: "Dataset QA & Label Audit", url: `${canonical}/dataset-qa-label-audit` },
          { name: "LLM Training Data Curation", url: `${canonical}/llm-data-curation` },
          { name: "PII Detection & Redaction" },
          { name: "Metadata Enrichment" },
          { name: "Data Validation & Verification" },
        ].map((service) => ({ "@type": "Offer", ...(service.url ? { url: service.url } : {}), itemOffered: { "@type": "Service", name: service.name, ...(service.url ? { url: service.url } : {}) } })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
        { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
        { "@type": "ListItem", position: 3, name: "Data Cleaning & Validation", item: canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: cleaningFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    },
  ],
};

const CleaningPage = () => (
  <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "Data Cleaning & Validation" }]}>
    <SEOHead
      title="Data Cleaning & Validation Services for AI | eQOURSE"
      description="Deduplication, PII redaction, noise removal, label auditing and AI dataset validation. Error rates reported by category. Get a free dataset audit."
      canonical={canonical}
      keywords="data cleaning services, data validation services, AI training data quality, dataset audit, label validation, deduplication, train test leakage, PII redaction"
      ogImage="https://www.eqourse.com/assets/ai-data/cleaning-validation/cleaning-validation-og.webp"
    />
    <Helmet>
      <link rel="preload" as="image" href="/assets/ai-data/cleaning-validation/data-cleaning-validation-services-hero.webp" type="image/webp" fetchPriority="high" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
    <CleaningMotionStyles />

    <ServiceHero
      tone="light"
      preHeadline="Audit-First Data Quality"
      headline="Data Cleaning & Validation Services for"
      headlineAccent="AI Training Data"
      subtext="Deduplication, PII redaction, noise removal, label auditing and multi-tier validation—with error rates reported by defect category, not one blended number. GDPR-aligned processing under ISO 27001 certified controls."
      ctaText="Get a Free Dataset Audit"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to a Data Specialist"
      secondaryCtaLink="/contact-us"
      imageSrc="/assets/ai-data/cleaning-validation/data-cleaning-validation-services-hero.webp"
      imageAlt="Readable synthetic AI training records showing validated data, label errors, PII and split leakage in a dataset audit"
      imageWidth={1200}
      imageHeight={800}
      compactHeadline
      trustStats={[{ value: "500+", label: "Specialists" }, { value: "30+", label: "Global languages" }, { value: "ISO", label: "9001 & 27001 processes" }]}
      rotatingBadges={[
        { icon: ScanSearch, title: "Defect profiling", subtitle: "Source · split · severity", color: "hsl(170 82% 38%)" },
        { icon: GitCompareArrows, title: "Before / after", subtitle: "Measured · explained · logged", color: "hsl(28 90% 48%)" },
        { icon: FileSearch2, title: "Independent audit", subtitle: "Your data · Any vendor", color: "hsl(190 76% 40%)" },
      ]}
      bottomBadge={{ iconText: "QA", title: "Every change traceable", subtitle: "Logged · attributable · reversible" }}
    />
    <CleaningTrustStrip />
    <CleaningServices />
    <CleaningDefinition />
    <LateErrorCost />
    <DefectAtlas />
    <CleaningProcess />
    <QualityReport />
    <HumanAutomation />
    <LlmPrivacyDelivery />
    <DeliveryCommercial />
    <PipelineProofWhy />
    <CleaningFAQ />
    <ServiceCTA
      headline="Find Out What's Actually in Your Dataset"
      subtext="Share a representative sample. We will return an error rate by category, the defects we found and a straight answer on whether cleaning is worth doing."
      ctaText="Get a Free Dataset Audit"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to a Data Specialist"
      secondaryCtaLink="/contact-us"
      note="Start with your own sample"
    />
  </AIDataServicesLayout>
);

export default CleaningPage;
