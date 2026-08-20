import { Helmet } from "react-helmet-async";
import { BarChart3, Radar, ScanSearch } from "lucide-react";
import AIDataServicesLayout from "../shared/AIDataServicesLayout";
import SEOHead from "../shared/SEOHead";
import ServiceHero from "../shared/ServiceHero";
import ServiceCTA from "../shared/ServiceCTA";
import { modelTestingFaqs } from "./ModelTestingContent";
import {
  BenchmarkAndEvaluator,
  ModelTestingMotionStyles,
  PipelineProofWhy,
  SecurityCommercial,
  SegmentReporting,
  TestSetAndModels,
  TestingByModelType,
  TestingDefinition,
  TestingFAQ,
  TestingMethods,
  TestingProcess,
  TestingTrustStrip,
} from "./ModelTestingCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/model-testing";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "AI Model Testing & Evaluation Services",
      serviceType: "AI Model Testing and Evaluation",
      url: canonical,
      description: "Independent AI model testing and evaluation across LLMs, speech, NLP, computer vision, video and multimodal systems, including bias and fairness audits, red teaming, A/B testing, segment reporting and production-readiness assessment.",
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
      availableLanguage: ["en", "hi", "bn", "ta", "te", "mr", "gu", "kn", "ml", "pa", "or", "as", "ur", "es", "fr", "de", "pt", "ar", "zh", "ja", "ko", "id", "ms", "th", "vi"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Model Testing Service Lines",
        itemListElement: [
          "AI Bias & Fairness Audit",
          "AI Red Teaming & Safety Testing",
          "LLM Evaluation",
          "ASR & Speech Model Testing",
          "Computer Vision Model Testing",
          "Human Evaluation & A/B Testing",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
        { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
        { "@type": "ListItem", position: 3, name: "AI Model Testing", item: canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: modelTestingFaqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

const ModelTestingPage = () => (
  <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "AI Model Testing" }]}>
    <SEOHead
      title="AI Model Testing & Evaluation Services | eQOURSE"
      description="Test LLM, speech, vision and multimodal AI for safety, bias, accuracy and real-world performance with expert human evaluation and segment reporting."
      canonical={canonical}
      keywords="AI model testing services, AI model evaluation, LLM evaluation, AI red teaming, AI bias audit, ASR testing, computer vision model testing, human evaluation"
      ogImage="https://www.eqourse.com/assets/ai-data/model-testing/model-testing-og.webp"
    />
    <Helmet>
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="preload" as="image" href="/assets/ai-data/model-testing/ai-model-testing-services-hero.avif" type="image/avif" fetchPriority="high" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
    <ModelTestingMotionStyles />

    <ServiceHero
      tone="light"
      preHeadline="Release-Readiness Evidence"
      headline="AI Model Testing &"
      headlineAccent="Evaluation Services"
      subtext="Test AI models the way they will actually be used—with real people, realistic inputs and the conditions benchmarks miss. Evaluate LLMs, speech, vision and multimodal systems for safety, bias, robustness and segment-level performance."
      ctaText="Get a Free Model Assessment"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to an Evaluation Specialist"
      secondaryCtaLink="/contact-us"
      imageSrc="/assets/ai-data/model-testing/ai-model-testing-services-hero.webp"
      imageAvifSrc="/assets/ai-data/model-testing/ai-model-testing-services-hero.avif"
      imageAlt="AI quality specialist reviewing model outputs, error distributions and validation metrics"
      imageWidth={1200}
      imageHeight={800}
      compactHeadline
      trustStats={[{ value: "500+", label: "Specialists" }, { value: "30+", label: "Global languages" }, { value: "Segment", label: "Reporting" }]}
      rotatingBadges={[
        { icon: Radar, title: "Release gate", subtitle: "Pass · review · fix", color: "hsl(170 82% 38%)" },
        { icon: ScanSearch, title: "Failure discovery", subtitle: "Edge · safety · bias", color: "hsl(28 90% 48%)" },
        { icon: BarChart3, title: "Segment evidence", subtitle: "Language · user · condition", color: "hsl(190 76% 40%)" },
      ]}
      bottomBadge={{ iconText: "QA", title: "Beyond one average", subtitle: "Severity · confidence · regression" }}
    />

    <TestingTrustStrip />
    <TestingDefinition />
    <TestingMethods />
    <TestingByModelType />
    <BenchmarkAndEvaluator />
    <TestingProcess />
    <SegmentReporting />
    <TestSetAndModels />
    <SecurityCommercial />
    <PipelineProofWhy />
    <TestingFAQ />
    <ServiceCTA
      headline="Find the Failure Before Your Users Do"
      subtext="Share the model, decision criteria and target users. We will design a representative evaluation plan and return evidence you can use to decide what ships."
      ctaText="Get a Free Model Assessment"
      ctaLink="/free-pilot"
      secondaryCtaText="Talk to an Evaluation Specialist"
      secondaryCtaLink="/contact-us"
      note="Start with your model and one critical user journey"
    />
  </AIDataServicesLayout>
);

export default ModelTestingPage;
