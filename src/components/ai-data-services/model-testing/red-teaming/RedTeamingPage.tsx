import { Helmet } from "react-helmet-async";
import { Crosshair, Radar, ShieldAlert } from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceCTA from "../../shared/ServiceCTA";
import ServiceHero from "../../shared/ServiceHero";
import { redTeamFaqs } from "./RedTeamingContent";
import { AgenticAndComparison, AttackSurfaceSection, BoundariesAndEngagement, DeliverablesAndFailureModes, EngagementMethod, FrameworksSection, MultilingualSection, RedTeamDefinition, RedTeamingMotionStyles, SeverityAndWellbeing, WhyRelatedFaq } from "./RedTeamingCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/model-testing/ai-red-teaming";
const description = "Human-led AI red teaming across 30+ languages. Adversarial testing for LLM and agentic systems against OWASP LLM and Agentic Top 10, with reproducible findings, severity ratings and native-speaker attack sets.";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "AI Red Teaming & Adversarial Testing Services",
      serviceType: "AI red teaming and adversarial safety testing",
      description: "Human-led AI red teaming and adversarial testing for LLM, multimodal and agentic systems across 30+ languages, mapped to the OWASP Top 10 for LLM Applications, the OWASP Top 10 for Agentic Applications and the NIST AI Risk Management Framework.",
      provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/" },
      areaServed: ["IN", "SG", "US", "GB", "AE", "AU", "EU"],
      isPartOf: { "@id": "https://www.eqourse.com/ai-data-services/model-testing#service" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Red teaming engagement types",
        itemListElement: ["Pre-launch adversarial assurance", "Agentic system red teaming", "Multilingual jailbreak and guardrail testing", "Prompt injection and RAG attack testing", "Post-remediation retest"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
        { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
        { "@type": "ListItem", position: 3, name: "AI Model Testing", item: "https://www.eqourse.com/ai-data-services/model-testing" },
        { "@type": "ListItem", position: 4, name: "AI Red Teaming", item: canonical },
      ],
    },
    { "@type": "FAQPage", mainEntity: redTeamFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

const RedTeamingPage = () => (
  <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "AI Model Testing", href: "/ai-data-services/model-testing" }, { label: "AI Red Teaming" }]}>
    <SEOHead title="AI Red Teaming & Adversarial Testing Services | eQOURSE" description={description} canonical={canonical} keywords="AI red teaming, AI red teaming services, LLM red teaming, adversarial testing for AI, agentic AI security testing, prompt injection testing, multilingual jailbreak testing" ogImage="https://www.eqourse.com/assets/ai-data/model-testing/red-teaming/og-ai-red-teaming.jpg"/>
    <Helmet><meta name="robots" content="index, follow, max-image-preview:large"/><link rel="preload" as="image" href="/assets/ai-data/model-testing/red-teaming/ai-red-teaming-hero.avif" type="image/avif" fetchPriority="high"/><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
    <RedTeamingMotionStyles/>
    <ServiceHero
      tone="light"
      preHeadline="Human-Led Adversarial Assurance"
      headline="AI Red Teaming &"
      headlineAccent="Adversarial Testing"
      subtext="Trained human red teamers attack your model the way real users and adversaries will—in the languages they actually use. We find failures automated scanners were never given a template for and document every reproducible path."
      ctaText="Scope a Red Team Engagement"
      ctaLink="/contact-us"
      secondaryCtaText="See What the Report Contains"
      secondaryCtaLink="#report-contents"
      imageSrc="/assets/ai-data/model-testing/red-teaming/ai-red-teaming-hero.webp"
      imageAvifSrc="/assets/ai-data/model-testing/red-teaming/ai-red-teaming-hero.avif"
      imageAlt="Red team analysts reviewing adversarial session logs during an AI red teaming engagement"
      imageWidth={1600}
      imageHeight={900}
      trustStats={[{ value: "30+", label: "Languages" }, { value: "OWASP", label: "LLM & Agentic" }, { value: "n/N", label: "Reproduction confidence" }, { value: "ISO", label: "9001 & 27001" }]}
      rotatingBadges={[{ icon: Crosshair, title: "Attack path confirmed", subtitle: "Input · output · impact", color: "hsl(28 90% 48%)" }, { icon: Radar, title: "System-level scope", subtitle: "RAG · tools · memory", color: "hsl(170 82% 38%)" }, { icon: ShieldAlert, title: "Critical escalation", subtitle: "Within 24 hours", color: "hsl(190 76% 40%)" }]}
      bottomBadge={{ iconText: "RT", title: "Human, multi-turn, native", subtitle: "Reproducible · severity-rated" }}
      compactHeadline
    />
    <RedTeamDefinition/><FrameworksSection/><AttackSurfaceSection/><MultilingualSection/><AgenticAndComparison/><EngagementMethod/><SeverityAndWellbeing/><DeliverablesAndFailureModes/><BoundariesAndEngagement/><WhyRelatedFaq/>
    <ServiceCTA headline="Find Out How Your System Fails Before Someone Else Does" subtext="Tell us what the system does, whether it calls tools and which languages it serves. We will return with a scope, threat model and an honest view of where we expect it to break." ctaText="Scope a Red Team Engagement" ctaLink="/contact-us" secondaryCtaText="Talk to Our Evaluation Team" secondaryCtaLink="/contact-us" note="Publication requires legal and policy sign-off on engagement boundaries, authorisation and wellbeing commitments"/>
  </AIDataServicesLayout>
);

export default RedTeamingPage;
