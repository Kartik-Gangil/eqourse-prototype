import { Helmet } from "react-helmet-async";
import { BarChart3, Camera, ScanLine } from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceCTA from "../../shared/ServiceCTA";
import ServiceHero from "../../shared/ServiceHero";
import { computerVisionFaqs } from "./ComputerVisionContent";
import {
  BeyondMap,
  ComputerVisionMotionStyles,
  EngagementAndEvidence,
  FaceAndOCR,
  FailuresBoundariesRelated,
  TestingScope,
  TestSetAndShift,
  VLMAndGroundTruth,
} from "./ComputerVisionCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/model-testing/computer-vision-model-testing";
const description = "Computer vision model testing with real-world test sets — object detection, segmentation, OCR, tracking and VLM evaluation, with slice-level failure analysis across conditions, devices and cohorts.";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Computer Vision Model Testing Services",
      serviceType: "Computer vision model evaluation and failure analysis",
      description,
      url: canonical,
      provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/" },
      areaServed: ["IN", "SG", "US", "GB", "AE", "AU", "EU"],
      isPartOf: { "@id": "https://www.eqourse.com/ai-data-services/model-testing#service" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Computer vision testing services",
        itemListElement: [
          "Object detection and segmentation evaluation",
          "Slice-level failure analysis",
          "Real-world test-set construction",
          "OCR and document model testing",
          "Tracking and video model evaluation",
          "Vision-language model evaluation",
          "Deployment-site performance audit",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
        { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
        { "@type": "ListItem", position: 3, name: "AI Model Testing", item: "https://www.eqourse.com/ai-data-services/model-testing" },
        { "@type": "ListItem", position: 4, name: "Computer Vision Model Testing", item: canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: computerVisionFaqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

const ComputerVisionPage = () => (
  <AIDataServicesLayout breadcrumbs={[
    { label: "AI Data Services", href: "/ai-data-services" },
    { label: "AI Model Testing", href: "/ai-data-services/model-testing" },
    { label: "Computer Vision Model Testing" },
  ]}>
    <SEOHead
      title="Computer Vision Model Testing Services | eQOURSE"
      description={description}
      canonical={canonical}
      keywords="computer vision model testing, computer vision model evaluation, object detection evaluation, vision model validation, CV model benchmarking, slice-based computer vision evaluation, OCR accuracy testing, VLM evaluation, computer vision testing India"
      ogImage="https://www.eqourse.com/assets/ai-data/model-testing/computer-vision/og-cv-model-testing.jpg"
    />
    <Helmet>
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="preload" as="image" href="/assets/ai-data/model-testing/computer-vision/computer-vision-testing-hero.avif" type="image/avif" fetchPriority="high" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
    <ComputerVisionMotionStyles />
    <ServiceHero
      tone="light"
      preHeadline="Deployment-Led Vision Evaluation"
      headline="Computer Vision"
      headlineAccent="Model Testing"
      compactHeadline
      subtext="Vision model evaluation built on imagery from the world your model will actually run in—not a curated benchmark set. We build the test data, annotate it to reference quality, and report where accuracy collapses instead of what it averages to."
      ctaText="Scope a Vision Test Programme"
      ctaLink="/contact-us"
      secondaryCtaText="See Why mAP Isn't Enough"
      secondaryCtaLink="#beyond-map"
      imageSrc="/assets/ai-data/model-testing/computer-vision/computer-vision-testing-hero.webp"
      imageAvifSrc="/assets/ai-data/model-testing/computer-vision/computer-vision-testing-hero.avif"
      imageAlt="Vision team reviewing model predictions across a stratified test set during computer vision model testing"
      imageWidth={1600}
      imageHeight={900}
      trustStats={[
        { value: "Field-led", label: "Test sets" },
        { value: "By slice", label: "Reporting" },
        { value: "Audited", label: "Ground truth" },
        { value: "ISO", label: "9001 & 27001" },
      ]}
      rotatingBadges={[
        { icon: Camera, title: "Deployment imagery", subtitle: "Device · light · geography", color: "hsl(170 82% 38%)" },
        { icon: BarChart3, title: "Failure distribution", subtitle: "Class · condition · cohort", color: "hsl(28 90% 48%)" },
        { icon: ScanLine, title: "Reference evidence", subtitle: "Measured · adjudicated", color: "hsl(190 76% 40%)" },
      ]}
      bottomBadge={{ iconText: "CV", title: "Ship decisions, not averages", subtitle: "Real conditions · actual threshold" }}
    />
    <TestingScope />
    <BeyondMap />
    <TestSetAndShift />
    <FaceAndOCR />
    <VLMAndGroundTruth />
    <EngagementAndEvidence />
    <FailuresBoundariesRelated />
    <ServiceCTA
      headline="Find Out Which Slice Your Model Can't Handle"
      subtext="Tell us what the model does, where it is deployed and what a miss costs. We will return with a slice definition, a test-set design and an honest view of whether your current evaluation imagery supports the claim you need to make."
      ctaText="Scope a Vision Test Programme"
      ctaLink="/contact-us"
      secondaryCtaText="Talk to Our Evaluation Team"
      secondaryCtaLink="/contact-us"
      note="Versioned test set, reference annotations and slice-level failure evidence delivered to you"
    />
  </AIDataServicesLayout>
);

export default ComputerVisionPage;
