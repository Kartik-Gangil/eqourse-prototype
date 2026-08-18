import { Helmet } from "react-helmet-async";
import { Fingerprint, Radar, ShieldCheck } from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceHero from "../../shared/ServiceHero";
import ServiceCTA from "../../shared/ServiceCTA";
import { piiFaqs, piiOffers } from "./PiiRedactionContent";
import {
  EngagementRelatedWhy,
  FailureModesAndVerification,
  IndicComplianceSecurity,
  ModalityAndMethods,
  PiiDefinitionAndIdentifiers,
  PiiFAQ,
  PiiMotionStyles,
  PiiProcessAndDeliverables,
  PiiTrustStrip,
  QuasiIdentifierRisk,
} from "./PiiRedactionCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/cleaning-validation/pii-detection-redaction";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "PII Detection & Redaction Services",
      serviceType: "PII Detection, Redaction, Masking and Pseudonymisation",
      url: canonical,
      description: "Multimodal personal-data discovery and redaction across text, images, video, audio, documents and structured datasets, with quasi-identifier analysis, verified recall and explicit residual-risk reporting.",
      provider: {
        "@type": "Organization",
        name: "eQOURSE",
        url: "https://www.eqourse.com/",
        address: [
          { "@type": "PostalAddress", addressCountry: "IN" },
          { "@type": "PostalAddress", addressCountry: "SG" },
        ],
      },
      areaServed: "Worldwide",
      availableLanguage: ["en", "hi", "bn", "ta", "te", "mr", "gu", "kn", "ml", "pa", "or", "as", "ur"],
      isPartOf: {
        "@type": "Service",
        "@id": "https://www.eqourse.com/ai-data-services/cleaning-validation#service",
        name: "Data Cleaning & Validation Services",
        url: "https://www.eqourse.com/ai-data-services/cleaning-validation",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "PII Detection and Redaction Services",
        itemListElement: piiOffers.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
        { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
        { "@type": "ListItem", position: 3, name: "Data Cleaning & Validation", item: "https://www.eqourse.com/ai-data-services/cleaning-validation" },
        { "@type": "ListItem", position: 4, name: "PII Detection & Redaction", item: canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: piiFaqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

const PiiRedactionPage = () => (
  <AIDataServicesLayout
    breadcrumbs={[
      { label: "AI Data Services", href: "/ai-data-services" },
      { label: "Data Cleaning & Validation", href: "/ai-data-services/cleaning-validation" },
      { label: "PII Detection & Redaction" },
    ]}
  >
    <SEOHead
      title="PII Detection & Redaction Services | eQOURSE"
      description="PII detection and redaction across text, images, video, audio and documents—including quasi-identifiers, metadata and verified recall."
      canonical={canonical}
      keywords="PII detection services, PII redaction services, data anonymization services, data masking services, pseudonymization services, personal data removal, sensitive data redaction, GDPR data redaction, DPDP data redaction, training data privacy"
      ogImage="https://www.eqourse.com/assets/ai-data/cleaning-validation/pii-detection-redaction/pii-detection-redaction-og.jpg"
    />
    <Helmet>
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link
        rel="preload"
        as="image"
        href="/assets/ai-data/cleaning-validation/pii-detection-redaction/pii-detection-redaction-services-hero.avif"
        type="image/avif"
        fetchPriority="high"
      />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
    <PiiMotionStyles />
    <ServiceHero
      tone="light"
      preHeadline="Verified Personal Data Protection"
      headline="PII Detection & Redaction"
      headlineAccent="Services"
      subtext="Find and protect personal data across text, documents, images, video, audio and structured datasets—including quasi-identifiers and embedded metadata—with independent verification and an explicit statement of residual risk."
      ctaText="Get a Free PII Risk Assessment"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to a Privacy Data Specialist"
      secondaryCtaLink="/contact-us"
      imageSrc="/assets/ai-data/cleaning-validation/pii-detection-redaction/pii-detection-redaction-services-hero.avif"
      imageAlt="Privacy data specialist reviewing an abstract redaction workspace containing no real personal information"
      imageWidth={1200}
      imageHeight={800}
      trustStats={[
        { value: "Measured", label: "Recall verified" },
        { value: "Beyond names", label: "Quasi-identifiers + metadata" },
        { value: "30+", label: "Global languages + Indian depth" },
      ]}
      rotatingBadges={[
        { icon: Fingerprint, title: "Direct + indirect PII", subtitle: "Fields · narrative · combinations", color: "hsl(170 82% 38%)" },
        { icon: Radar, title: "Hidden layers checked", subtitle: "Metadata · embedded text · history", color: "hsl(28 90% 48%)" },
        { icon: ShieldCheck, title: "Output independently verified", subtitle: "Recall · residual risk · audit trail", color: "hsl(190 76% 40%)" },
      ]}
      bottomBadge={{ iconText: "QA", title: "Residual risk stated", subtitle: "Verified · documented · honest" }}
    />
    <PiiTrustStrip />
    <PiiDefinitionAndIdentifiers />
    <QuasiIdentifierRisk />
    <ModalityAndMethods />
    <FailureModesAndVerification />
    <PiiProcessAndDeliverables />
    <IndicComplianceSecurity />
    <EngagementRelatedWhy />
    <PiiFAQ />
    <ServiceCTA
      headline="Know What Personal Data Is Actually in Your Dataset"
      subtext="Share a representative sample and the intended use. We'll identify the personal-data categories present, the hidden layers that need review and the verification approach required—before full processing is scoped."
      ctaText="Get a Free PII Risk Assessment"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to a Privacy Data Specialist"
      secondaryCtaLink="/contact-us"
      note="Confidential discovery · no claim of perfect removal"
    />
  </AIDataServicesLayout>
);

export default PiiRedactionPage;
