import { Helmet } from "react-helmet-async";
import { BarChart3, Scale, Sparkles } from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceCTA from "../../shared/ServiceCTA";
import ServiceHero from "../../shared/ServiceHero";
import { evaluationFaqs } from "./LLMEvaluationContent";
import { BenchmarksAndMultilingual, CapabilitySection, EngagementAndDeliverables, EvaluationDefinition, EvaluationMethods, FailureModesAndBoundaries, JudgeCalibration, LLMEvaluationMotionStyles, RagAndAgentEvaluation, WhyRelatedFaq } from "./LLMEvaluationCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/model-testing/llm-evaluation";
const description = "Human LLM evaluation across 30+ languages — hallucination, RAG groundedness, instruction following, multi-turn and agent trajectory testing, plus LLM-as-a-judge calibration against measured human agreement.";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service", "@id": `${canonical}#service`, name: "LLM Evaluation Services", serviceType: "Large language model evaluation and LLM-as-a-judge calibration", description,
      provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/" },
      areaServed: ["IN", "SG", "US", "GB", "AE", "AU", "EU"], isPartOf: { "@id": "https://www.eqourse.com/ai-data-services/model-testing#service" },
      hasOfferCatalog: { "@type": "OfferCatalog", name: "LLM evaluation services", itemListElement: ["Hallucination and factual accuracy evaluation", "RAG groundedness and citation accuracy evaluation", "Instruction following and multi-turn coherence evaluation", "Agent trajectory and tool-use evaluation", "Sentiment and intent accuracy testing", "LLM-as-a-judge calibration and drift monitoring", "Golden evaluation set construction"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) },
    },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
      { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
      { "@type": "ListItem", position: 3, name: "AI Model Testing", item: "https://www.eqourse.com/ai-data-services/model-testing" },
      { "@type": "ListItem", position: 4, name: "LLM Evaluation", item: canonical },
    ] },
    { "@type": "FAQPage", mainEntity: evaluationFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

const LLMEvaluationPage = () => (
  <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "AI Model Testing", href: "/ai-data-services/model-testing" }, { label: "LLM Evaluation" }]}>
    <SEOHead title="LLM Evaluation Services — Human & Judge Calibration | eQOURSE" description={description} canonical={canonical} keywords="LLM evaluation, LLM evaluation services, hallucination testing, RAG evaluation, LLM-as-a-judge calibration, human evaluation of LLMs, AI agent evaluation, LLM evaluation Indian languages" ogImage="https://www.eqourse.com/assets/ai-data/model-testing/llm-evaluation/og-llm-evaluation.jpg"/>
    <Helmet><meta name="robots" content="index, follow, max-image-preview:large"/><link rel="preload" as="image" href="/assets/ai-data/model-testing/llm-evaluation/llm-evaluation-hero.avif" type="image/avif" fetchPriority="high"/><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
    <LLMEvaluationMotionStyles/>
    <ServiceHero tone="light" preHeadline="Human-Calibrated Evaluation" headline="LLM Evaluation" headlineAccent="Services" subtext="Structured human evaluation of large language models and agents—hallucination, grounding, instruction following, multi-turn behaviour and domain correctness—across 30+ languages. We also tell you whether to trust your automated judge." ctaText="Scope an Evaluation" ctaLink="/contact-us" secondaryCtaText="Calibrate Your LLM Judge" secondaryCtaLink="#judge-calibration" imageSrc="/assets/ai-data/model-testing/llm-evaluation/llm-evaluation-hero.webp" imageAvifSrc="/assets/ai-data/model-testing/llm-evaluation/llm-evaluation-hero.avif" imageAlt="Evaluation team reviewing model outputs against a scoring rubric during an LLM evaluation" imageWidth={1600} imageHeight={900} trustStats={[{ value: "500+", label: "Evaluators" }, { value: "30+", label: "Languages" }, { value: "α / κ", label: "Agreement measured" }, { value: "Human", label: "Judge calibration" }]} rotatingBadges={[{ icon: Scale, title: "Agreement measured", subtitle: "Alpha · kappa · divergence", color: "hsl(170 82% 38%)" }, { icon: BarChart3, title: "Per-slice evidence", subtitle: "Task · language · difficulty", color: "hsl(28 90% 48%)" }, { icon: Sparkles, title: "Golden set delivered", subtitle: "Versioned · reusable · yours", color: "hsl(190 76% 40%)" }]} bottomBadge={{ iconText: "EVAL", title: "Human reference layer", subtitle: "Rubrics · SMEs · adjudication" }}/>
    <EvaluationDefinition/><CapabilitySection/><EvaluationMethods/><JudgeCalibration/><RagAndAgentEvaluation/><BenchmarksAndMultilingual/><EngagementAndDeliverables/><FailureModesAndBoundaries/><WhyRelatedFaq/>
    <ServiceCTA headline="Find Out What Your Evaluation Numbers Are Actually Measuring" subtext="Tell us what the system does, which languages it serves and whether you already run an automated judge. We will recommend the highest-value starting point." ctaText="Scope an Evaluation" ctaLink="/contact-us" secondaryCtaText="Calibrate Your LLM Judge" secondaryCtaLink="/contact-us" note="Golden sets, rubrics and calibrated judge assets are delivered to you"/>
  </AIDataServicesLayout>
);

export default LLMEvaluationPage;
