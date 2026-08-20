import { Helmet } from "react-helmet-async";
import { BarChart3, Scale, ShieldCheck, UsersRound } from "lucide-react";
import SEOHead from "../../shared/SEOHead";
import ServiceCTA from "../../shared/ServiceCTA";
import ServiceHero from "../../shared/ServiceHero";
import { humanEvaluationFaqs } from "./HumanEvaluationContent";
import { EngagementEvidenceAndFAQ, HumanEvaluationMotionStyles, LiveExperimentAndStatistics, PanelAndTradeoff, PreferenceAndSignals, ResponsibilityBoundary } from "./HumanEvaluationCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/model-testing/human-evaluation-ab-testing";
const title = "Human Evaluation & AI A/B Testing Services | eQOURSE";
const description = "Blind, counterbalanced human preference evaluation for AI model comparison, plus quality scoring during live experiments across 30+ languages with representative panels and measured agreement.";

const schema = { "@context": "https://schema.org", "@graph": [
  { "@type": "Service", "@id": `${canonical}#service`, name: "Human Evaluation & A/B Testing Services", serviceType: "Human preference evaluation and AI model comparison", description: "Blind, order-randomised human preference evaluation for AI model comparison across 30+ languages, plus human quality and safety-floor scoring of sampled production traffic during live A/B experiments, with rater panels recruited to the client's user profile.", provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/" }, areaServed: ["IN","SG","US","GB","AE","AU","EU"], isPartOf: { "@id": "https://www.eqourse.com/ai-data-services/model-testing#service" }, hasOfferCatalog: { "@type": "OfferCatalog", name: "Human evaluation services", itemListElement: ["Blind side-by-side model comparison","Pairwise preference evaluation","Live experiment quality scoring","Safety floor and guardrail metric monitoring","Offline and online divergence investigation","Representative rater panel design"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
  { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },{ "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },{ "@type": "ListItem", position: 3, name: "AI Model Testing", item: "https://www.eqourse.com/ai-data-services/model-testing" },{ "@type": "ListItem", position: 4, name: "Human Evaluation & A/B Testing", item: canonical }] },
  { "@type": "FAQPage", mainEntity: humanEvaluationFaqs.map(([q,a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
] };

export default function HumanEvaluationPage() {
  return <>
    <SEOHead title={title} description={description} canonical={canonical} image="https://www.eqourse.com/assets/ai-data/model-testing/human-evaluation/og-human-evaluation.jpg" />
    <Helmet><meta name="robots" content="index, follow, max-image-preview:large"/><link rel="preload" as="image" href="/assets/ai-data/model-testing/human-evaluation/human-evaluation-hero.avif" type="image/avif" fetchPriority="high"/><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
    <HumanEvaluationMotionStyles/>
    <ServiceHero tone="light" preHeadline="Blind Comparison · Defensible Decisions" headline="Human Evaluation" headlineAccent="& A/B Testing" compactHeadline subtext="Blind, order-randomised human comparison that tells you which model to ship—and quality scoring of real production traffic while your experiment runs. Representative panels across 30+ languages, with agreement measured before findings." ctaText="Scope a Model Comparison" ctaLink="/contact-us" secondaryCtaText="Supporting a Live Experiment" secondaryCtaLink="#live-experiments" imageSrc="/assets/ai-data/model-testing/human-evaluation/human-evaluation-hero.webp" imageAvifSrc="/assets/ai-data/model-testing/human-evaluation/human-evaluation-hero.avif" imageAlt="Trained evaluator comparing two model outputs side by side in a blind preference study" imageWidth={1600} imageHeight={900} trustStats={[{value:"Blind",label:"By default"},{value:"Matched",label:"User panels"},{value:"30+",label:"Languages"},{value:"α / κ",label:"Agreement"}]} rotatingBadges={[{icon:Scale,title:"Counterbalanced",subtitle:"Order randomised · ties allowed",color:"hsl(170 82% 38%)"},{icon:UsersRound,title:"Representative panels",subtitle:"Language · cohort · domain",color:"hsl(196 70% 38%)"},{icon:BarChart3,title:"Decision evidence",subtitle:"Strength · reasons · slices",color:"hsl(28 90% 48%)"}]} bottomBadge={{iconText:"A/B",title:"Human judgment, not guesswork",subtitle:"Blind · calibrated · explainable"}}/>
    <ResponsibilityBoundary/><PreferenceAndSignals/><LiveExperimentAndStatistics/><PanelAndTradeoff/><EngagementEvidenceAndFAQ/>
    <ServiceCTA headline="Find Out Which Model Your Users Actually Prefer" subtext="Tell us what you are comparing, what the decision feeds, and how the candidates differ on cost and latency. We will return a study design, panel profile and an honest view of what the sample can support." primaryText="Scope a Model Comparison" primaryLink="/contact-us" secondaryText="Talk to Our Evaluation Team" secondaryLink="/contact-us"/>
  </>;
}
