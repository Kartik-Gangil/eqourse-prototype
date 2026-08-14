import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { Accessibility, FileText, Globe, Monitor } from "lucide-react";

const SubtitlingPage = () => <SubServicePageTemplate
  seoTitle="Subtitling Services for Educational Videos | eQOURSE" seoDescription="Accurate and well-timed subtitles for educational video content in multiple languages. SRT, VTT, and burned-in subtitles." seoCanonical="https://www.eqourse.com/subtitling-services" seoKeywords="subtitling services, SRT subtitles, VTT subtitles, closed captioning, multilingual subtitles"
  parentLabel="Localization Services" parentHref="/localization-services" currentLabel="Subtitling Services" bannerImage="/assets/banners/content-services/localization/subtitling.webp" bannerImageAlt="Subtitling services banner showing SRT and VTT subtitle files, burned-in captions and accessibility-compliant closed captioning across multiple languages by eQOURSE"
  preHeadline="Professional Subtitling Services for Educational Videos" headline="Subtitling" headlineAccent="Services" subtext="Accurate, well-timed subtitles for educational video content in Hindi, English and 30+ regional and international languages." ctaText="Get Subtitling Quote"
  introLabel="Accessibility" introTitle="Subtitles That" introGradient="Include Everyone" introDescription="Our subtitling services enhance accessibility and comprehension for diverse learner populations." introParagraphs={["From standard SRT files to burned-in subtitles and closed captioning, we deliver precise, well-timed subtitle solutions."]}
  servicesLabel="Subtitle Formats" servicesTitle="Subtitling" servicesGradient="Solutions" services={[{icon:FileText,title:"SRT & VTT Subtitle Files",description:"Standard subtitle formats for major video platforms."},{icon:Monitor,title:"Burned-In Subtitles",description:"Hardcoded subtitles embedded directly into video files."},{icon:Globe,title:"Multilingual Subtitles",description:"Multiple language tracks for the same video."},{icon:Accessibility,title:"Closed Captioning",description:"Accessibility-compliant captions with speaker identification."}]}
  ctaHeadline="Make Content Accessible" ctaSubtext="Professional subtitling in 30+ languages to enhance accessibility and comprehension." ctaButtonText="Get Subtitling Quote"
  relatedPages={[{title:"Translation",href:"/translation-services"},{title:"Voice Over",href:"/voice-over-services"},{title:"Speech Transcription for AI",href:"/ai-data-services/annotation-labeling/audio-speech-annotation"}]}
/>;
export default SubtitlingPage;
