import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import PrivacyPolicyContent from "@/components/privacy/PrivacyPolicyContent";
import { Shield, Lock, FileText } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "Privacy Policy" }]}>
      <Helmet>
        <title>Privacy Policy │ eQOURSE - Content Service &amp; AI Data Services</title>
        <meta
          name="description"
          content="Read eQOURSE's privacy policy. Learn how we collect, use, store, and protect your personal data across our Content Services and AI data services. ISO 27001 certified. GDPR-ready. Offices in India & Singapore."
        />
        <meta
          name="keywords"
          content="eQOURSE privacy policy, data protection, GDPR, ISO 27001, Content Services privacy, AI data privacy, personal data, data security, cookie policy, data retention"
        />
        <meta property="og:title" content="Privacy Policy │ eQOURSE - Content Service & AI Data Services" />
        <meta
          property="og:description"
          content="Read eQOURSE's privacy policy. Learn how we collect, use, store, and protect your personal data. ISO 27001 certified. GDPR-ready."
        />
        <link rel="canonical" href="https://www.eqourse.com/privacy_policy" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Privacy Policy",
              "url": "https://www.eqourse.com/privacy_policy",
              "description": "eQOURSE Privacy Policy - how we handle your data across Content Services and AI data services.",
              "publisher": {
                "@type": "Organization",
                "name": "eQOURSE",
                "url": "https://www.eqourse.com"
              }
            }
          `}
        </script>
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "Privacy Policy", item: "https://www.eqourse.com/privacy_policy" },
        ]}
      />

      <ServiceHero
        preHeadline="Your Privacy Matters"
        headline="Privacy"
        headlineAccent="Policy"
        subtext="Learn how eQOURSE collects, uses, stores, and protects your personal data across our Content Service and AI Data Services. ISO 27001:2022 certified. GDPR-ready."
        ctaText="Read Policy"
        ctaLink="#introduction"
        imageSrc="/assets/legal/Privacy policy.webp"
        imageAlt="Privacy Policy and data protection guidelines for eQOURSE content and AI services"
        rotatingBadges={[
          { icon: Shield, title: "Data Protection", subtitle: "GDPR ready", color: "hsl(165 75% 71%)" },
          { icon: Lock, title: "Security", subtitle: "ISO 27001 certified", color: "hsl(170 82% 55%)" },
          { icon: FileText, title: "Transparency", subtitle: "Clear policies", color: "hsl(190 85% 68%)" }
        ]}
        bottomBadge={{ iconText: "SEC", title: "Compliance", subtitle: "Your data is safe" }}
      />

      <PrivacyPolicyContent />
    </PageLayout>
  );
};

export default PrivacyPolicy;
