import { Helmet } from "react-helmet-async";
import { BarChart3, Scale, ShieldCheck } from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceHero from "../../shared/ServiceHero";
import ServiceCTA from "../../shared/ServiceCTA";
import { biasFairnessFaqs } from "./BiasFairnessContent";
import { AuditDefinition, BeyondWesternTooling, BiasFairnessMotionStyles, BoundariesEngagementWhy, DeliverablesAndFailureModes, MetricsSection, ModelTypesAndMethod, RegulationSection, RelatedAndFaq, StatisticalHonesty, ThreeBiases } from "./BiasFairnessCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/model-testing/bias-fairness-audit";
const description = "Independent AI bias audits across 30+ languages. Intersectional fairness testing, impact ratio analysis and demographically stratified human evaluation for LLM, ASR, vision and scoring models. ISO 27001 certified.";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "AI Bias & Fairness Audit Services",
      serviceType: "AI bias audit and algorithmic fairness testing",
      description: "Independent AI bias and fairness audits across 30+ languages, covering outcome disparity, quality-of-service disparity and representational harm, with intersectional analysis and demographically stratified human evaluation panels.",
      provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/" },
      areaServed: ["IN", "SG", "US", "GB", "AE", "AU", "EU"],
      isPartOf: { "@id": "https://www.eqourse.com/ai-data-services/model-testing#service" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Bias and fairness audit scopes",
        itemListElement: ["Baseline fairness audit", "Intersectional fairness analysis", "Multilingual and Indic-language bias testing", "Counterfactual and name-conditioned probe testing", "Re-audit and monitoring cadence"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
        { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
        { "@type": "ListItem", position: 3, name: "AI Model Testing", item: "https://www.eqourse.com/ai-data-services/model-testing" },
        { "@type": "ListItem", position: 4, name: "Bias & Fairness Audit", item: canonical },
      ],
    },
    { "@type": "FAQPage", mainEntity: biasFairnessFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

const BiasFairnessPage = () => (
  <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "AI Model Testing", href: "/ai-data-services/model-testing" }, { label: "Bias & Fairness Audit" }]}>
    <SEOHead title="AI Bias Audit & Fairness Testing Services | eQOURSE" description={description} canonical={canonical} keywords="AI bias audit, AI bias audit services, algorithmic fairness audit, AI fairness testing, LLM bias evaluation, intersectional fairness testing" ogImage="https://www.eqourse.com/assets/ai-data/model-testing/bias-fairness/og-bias-fairness-audit.jpg"/>
    <Helmet><meta name="robots" content="index, follow, max-image-preview:large"/><link rel="preload" as="image" href="/assets/ai-data/model-testing/bias-fairness/ai-bias-fairness-audit-hero.avif" type="image/avif" fetchPriority="high"/><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
    <BiasFairnessMotionStyles/>
    <ServiceHero
      tone="light"
      preHeadline="Independent Group-Level Evidence"
      headline="AI Bias & Fairness"
      headlineAccent="Audit Services"
      subtext="Evidence-based fairness testing for AI systems that influence decisions about people. We build the test sets, run demographically structured panels and report disparities across 30+ languages and the dimensions that matter in your market."
      ctaText="Request a Fairness Audit Scope"
      ctaLink="/contact-us"
      secondaryCtaText="See What the Report Contains"
      secondaryCtaLink="#report-contents"
      imageSrc="/assets/ai-data/model-testing/bias-fairness/ai-bias-fairness-audit-hero.webp"
      imageAvifSrc="/assets/ai-data/model-testing/bias-fairness/ai-bias-fairness-audit-hero.avif"
      imageAlt="Evaluation team reviewing group-level outcome distributions during an AI bias and fairness audit"
      imageWidth={1600}
      imageHeight={900}
      trustStats={[{ value: "500+", label: "Evaluators" }, { value: "30+", label: "Languages" }, { value: "12+", label: "Indian languages" }, { value: "ISO", label: "9001 & 27001" }]}
      rotatingBadges={[{ icon: Scale, title: "Metric fixed first", subtitle: "Decision · groups · threshold", color: "hsl(170 82% 38%)" }, { icon: BarChart3, title: "Intersectional evidence", subtitle: "Rates · cells · confidence", color: "hsl(28 90% 48%)" }, { icon: ShieldCheck, title: "Defensible method", subtitle: "Repeatable · documented", color: "hsl(190 76% 40%)" }]}
      bottomBadge={{ iconText: "Δ", title: "Beyond the average", subtitle: "Magnitude · consequence · confidence" }}
      compactHeadline
    />
    <AuditDefinition/><RegulationSection/><ThreeBiases/><MetricsSection/><ModelTypesAndMethod/><BeyondWesternTooling/><StatisticalHonesty/><DeliverablesAndFailureModes/><BoundariesEngagementWhy/><RelatedAndFaq/>
    <ServiceCTA headline="Find Out What Your Model Actually Does Across Groups" subtext="Share the model type, decision context and markets it serves. We will propose a scope, a primary metric and an honest view of whether the available data can support the claim." ctaText="Request a Fairness Audit Scope" ctaLink="/contact-us" secondaryCtaText="Talk to Our Evaluation Team" secondaryCtaLink="/contact-us" note="Legal review is recommended before relying on regulatory interpretations"/>
  </AIDataServicesLayout>
);

export default BiasFairnessPage;
