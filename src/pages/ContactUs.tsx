import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import ContactHero from "@/components/contact/ContactHero";
import ContactPage from "@/components/contact/ContactPage";
import { pageSeo } from "@/seo/pageSeo";

/* Approved title + meta description for this route (see src/seo/pageSeo.ts). */
const PAGE_SEO = pageSeo["/contact-us"];

const ContactUs = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "Contact Us" }]}>
      <Helmet>
        <title>{PAGE_SEO.title}</title>
        <meta name="description" content={PAGE_SEO.description} />
        <meta
          name="keywords"
          content="contact eQOURSE, AI data services inquiry, learning content services, Singapore commercial headquarters, India delivery operations, data annotation quote, curriculum development contact, free consultation"
        />
        <meta property="og:title" content={PAGE_SEO.title} />
        <meta property="og:description" content={PAGE_SEO.description} />
        <link rel="canonical" href="https://www.eqourse.com/contact-us" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.eqourse.com/#india-entity",
              "name": "eQOURSE Operational Headquarters",
              "legalName": "EQOURSE ONLINE EDUCATIONERS LLP",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "C-29, Indra Vihar, Shiv Jyoti School Road",
                "addressLocality": "Kota",
                "addressRegion": "Rajasthan",
                "postalCode": "324005",
                "addressCountry": "IN"
              },
              "telephone": "+91-92144-45870",
              "email": "info@eqourse.com",
              "url": "https://www.eqourse.com",
              "openingHours": "Mo-Sa 09:00-19:00",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.1805,
                "longitude": 75.8648
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.eqourse.com/#singapore-entity",
              "name": "eQOURSE Commercial Headquarters",
              "legalName": "EQOURSE PTE. LTD.",
              "foundingDate": "2025-04-14",
              "description": "Commercial headquarters for eQOURSE international business engagements, client accounts, partnerships, contracting and master service agreements.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "760 Bedok Reservoir Road, #04-13, Waterfront Waves",
                "addressLocality": "Singapore",
                "postalCode": "479245",
                "addressCountry": "SG"
              },
              "email": "info@eqourse.com",
              "url": "https://www.eqourse.com/aboutus#corporate-structure"
            }
          `}
        </script>
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "Contact Us", item: "https://www.eqourse.com/contact-us" }
        ]}
      />

      <ContactHero />

      <div id="contact-form">
        <ContactPage />
      </div>
    </PageLayout>
  );
};

export default ContactUs;
