import { Helmet } from "react-helmet-async";
import { BarChart3, Headphones, Languages } from "lucide-react";
import AIDataServicesLayout from "../../shared/AIDataServicesLayout";
import SEOHead from "../../shared/SEOHead";
import ServiceCTA from "../../shared/ServiceCTA";
import ServiceHero from "../../shared/ServiceHero";
import { asrSpeechFaqs } from "./ASRSpeechContent";
import { AcousticAndAgents, ASRSpeechMotionStyles, BeyondWer, EngagementAndEvidence, FailuresBoundariesRelated, GroundTruth, RegionalTesting, TestingSurfaces } from "./ASRSpeechCoreSections";

const canonical = "https://www.eqourse.com/ai-data-services/model-testing/asr-speech-model-testing";
const description = "Speech recognition testing across 30+ languages and regional accents. Measure WER, CER, semantic and entity errors, diarization and noisy-condition performance with native-speaker test sets.";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", "@id": `${canonical}#service`, name: "ASR & Speech Model Testing", serviceType: "Speech recognition model testing and evaluation", description, url: canonical, provider: { "@type": "Organization", name: "eQOURSE", url: "https://www.eqourse.com/" }, areaServed: ["IN", "SG", "US", "GB", "AE", "AU", "EU"], isPartOf: { "@id": "https://www.eqourse.com/ai-data-services/model-testing#service" }, hasOfferCatalog: { "@type": "OfferCatalog", name: "ASR testing services", itemListElement: ["WER and CER benchmarking", "Semantic and missed-entity measurement", "Accent and dialect testing", "Telephone and noisy-condition testing", "Diarization and speaker-attribution testing", "Voice-agent and ASR hallucination testing", "Reference transcript and reusable test-set construction"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.eqourse.com/" },
      { "@type": "ListItem", position: 2, name: "AI Data Services", item: "https://www.eqourse.com/ai-data-services" },
      { "@type": "ListItem", position: 3, name: "AI Model Testing", item: "https://www.eqourse.com/ai-data-services/model-testing" },
      { "@type": "ListItem", position: 4, name: "ASR & Speech Model Testing", item: canonical },
    ] },
    { "@type": "FAQPage", mainEntity: asrSpeechFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

const ASRSpeechPage = () => (
  <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" }, { label: "AI Model Testing", href: "/ai-data-services/model-testing" }, { label: "ASR & Speech Model Testing" }]}>
    <SEOHead title="ASR & Speech Model Testing Services | eQOURSE" description={description} canonical={canonical} keywords="ASR testing, speech recognition model testing, WER benchmarking, accent bias testing, dialect testing for voice AI, speech model evaluation, semantic error rate ASR, Indic ASR benchmarking, ASR testing noisy conditions" ogImage="https://www.eqourse.com/assets/ai-data/model-testing/asr-speech/og-asr-speech-testing.jpg"/>
    <Helmet><meta name="robots" content="index, follow, max-image-preview:large"/><link rel="preload" as="image" href="/assets/ai-data/model-testing/asr-speech/asr-speech-testing-hero.avif" type="image/avif" fetchPriority="high"/><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
    <ASRSpeechMotionStyles/>
    <ServiceHero tone="light" preHeadline="Speech Recognition Evaluation" headline="ASR & Speech" headlineAccent="Model Testing" compactHeadline subtext="Speech recognition testing that measures what your product actually depends on—not just how many words changed. WER and CER, plus semantic and entity error rates, diarization, and noise-condition performance, across 30+ languages and the regional accents where the numbers fall apart." ctaText="Scope an ASR Test Programme" ctaLink="/contact-us" secondaryCtaText="See Why WER Isn't Enough" secondaryCtaLink="#beyond-wer" imageSrc="/assets/ai-data/model-testing/asr-speech/asr-speech-testing-hero.webp" imageAvifSrc="/assets/ai-data/model-testing/asr-speech/asr-speech-testing-hero.avif" imageAlt="Analyst reviewing speech recognition output against source audio during ASR model testing" imageWidth={1600} imageHeight={900} trustStats={[{ value: "30+", label: "Languages" }, { value: "12+", label: "Indian languages" }, { value: "Regional", label: "Accent panels" }, { value: "ISO", label: "9001 & 27001" }]} rotatingBadges={[{ icon: Languages, title: "Regional coverage", subtitle: "Accent · dialect · code-mix", color: "hsl(170 82% 38%)" }, { icon: Headphones, title: "Production audio", subtitle: "Telephone · noise · overlap", color: "hsl(28 90% 48%)" }, { icon: BarChart3, title: "Beyond WER", subtitle: "Semantic · entity · DER", color: "hsl(190 76% 40%)" }]} bottomBadge={{ iconText: "ASR", title: "Per-stratum evidence", subtitle: "Language · region · condition" }}/>
    <TestingSurfaces/><BeyondWer/><RegionalTesting/><AcousticAndAgents/><GroundTruth/><EngagementAndEvidence/><FailuresBoundariesRelated/>
    <ServiceCTA headline="Find Out What Your Accuracy Number Is Hiding" subtext="Tell us which languages and regions you serve, what the transcript feeds, and how the audio reaches you. We will return with a test design and an honest view of where the numbers may fall apart." ctaText="Scope an ASR Test Programme" ctaLink="/contact-us" secondaryCtaText="Talk to Our Evaluation Team" secondaryCtaLink="/contact-us" note="Versioned test set, reference transcripts and typed failure backlog delivered to you"/>
  </AIDataServicesLayout>
);

export default ASRSpeechPage;
