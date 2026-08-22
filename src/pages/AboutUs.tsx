import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import AboutWhoWeAre from "@/components/about/AboutWhoWeAre";
import AboutCorporateStructure from "@/components/about/AboutCorporateStructure";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutFounder from "@/components/about/AboutFounder";
import AboutStats from "@/components/about/AboutStats";
import AboutNewsletter from "@/components/about/AboutNewsletter";
import { Globe, ShieldCheck, Users } from "lucide-react";
import { pageSeo } from "@/seo/pageSeo";

/* Approved title + meta description for this route (see src/seo/pageSeo.ts). */
const PAGE_SEO = pageSeo["/aboutus"];

const AboutUs = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "About Us" }]}>
      <Helmet>
        <title>{PAGE_SEO.title}</title>
        <meta name="description" content={PAGE_SEO.description} />
        <meta
          name="keywords"
          content="about eQOURSE, Content Services company India, AI data services company, e-learning solutions provider, data annotation company, education technology Singapore, ISO certified Content Services, curriculum development company, AI training data provider"
        />
        <meta property="og:title" content="About eQOURSE │ Content Service & AI Data Services │ India & Singapore" />
        <meta
          property="og:description"
          content="ISO 9001 & 27001 certified. 500+ specialists delivering Content Services and AI data services through India operations and a registered Singapore entity."
        />
        <link rel="canonical" href="https://www.eqourse.com/aboutus" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Brand",
                  "@id": "https://www.eqourse.com/#brand",
                  "name": "eQOURSE",
                  "url": "https://www.eqourse.com",
                  "logo": "https://www.eqourse.com/logo.png",
                  "sameAs": [
                    "https://www.linkedin.com/company/eqourse",
                    "https://www.facebook.com/eQOURSE-102057078229490",
                    "https://www.instagram.com/eqourse/",
                    "https://www.youtube.com/@eqourse",
                    "https://twitter.com/EQourse"
                  ]
                },
                {
                  "@type": "Organization",
                  "@id": "https://www.eqourse.com/#india-entity",
                  "name": "eQOURSE India Operations",
                  "legalName": "EQOURSE ONLINE EDUCATIONERS LLP",
                  "brand": { "@id": "https://www.eqourse.com/#brand" },
                  "description": "Primary operations and delivery entity for eQOURSE AI data and content services.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "C-29, Indra Vihar, Shiv Jyoti School Road",
                    "addressLocality": "Kota",
                    "addressRegion": "Rajasthan",
                    "postalCode": "324005",
                    "addressCountry": "IN"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://www.eqourse.com/#singapore-entity",
                  "name": "eQOURSE Singapore",
                  "legalName": "EQOURSE PTE. LTD.",
                  "brand": { "@id": "https://www.eqourse.com/#brand" },
                  "foundingDate": "2025-04-14",
                  "description": "Singapore-registered entity supporting international business development, client engagement, partnerships and contracting where applicable.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "760 Bedok Reservoir Road, #04-13, Waterfront Waves",
                    "addressLocality": "Singapore",
                    "postalCode": "479245",
                    "addressCountry": "SG"
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "About Us", item: "https://www.eqourse.com/aboutus" }
        ]}
      />

      <ServiceHero
        preHeadline="eQOURSE - Delivering Operational Excellence"
        headline="Who Are"
        headlineAccent="We?"
        subtext="Content Service and AI Data Services."
        ctaText="Explore Services"
        ctaLink="#who-we-are"
        videoSrc="https://www.youtube.com/embed/ar_kilRmBLs?rel=0&modestbranding=1"
        imageAlt="eQOURSE team working collaboratively on AI data and content services — Content Service and AI Data Company India Singapore"
        rotatingBadges={[
          { icon: Globe, title: "Global Reach", subtitle: "200+ clients worldwide", color: "hsl(190 85% 68%)" },
          { icon: ShieldCheck, title: "Certified", subtitle: "ISO 9001 & 27001", color: "hsl(165 75% 71%)" },
          { icon: Users, title: "Experts", subtitle: "500+ specialists", color: "hsl(170 82% 55%)" }
        ]}
        bottomBadge={{ iconText: "EQ", title: "Dual Capability", subtitle: "Content & AI Data Services" }}
      />
      
      <div id="who-we-are">
        <AboutWhoWeAre />
      </div>
      <AboutCorporateStructure />
      <AboutTimeline />
      <AboutFounder />
      <AboutStats />
      <AboutNewsletter />

    </PageLayout>
  );
};

export default AboutUs;
