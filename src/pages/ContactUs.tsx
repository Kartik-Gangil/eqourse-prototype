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
          content="contact eQOURSE, Content Services contact, AI data services inquiry, e-learning consultation, data annotation quote, curriculum development contact, eQOURSE India office, eQOURSE Singapore office, free consultation"
        />
        <meta property="og:title" content="Contact Us │ Content Services & AI Data Services │ eQOURSE" />
        <meta property="og:description" content="Ready to start? Contact eQOURSE for Content Services or AI data services. Offices in Kota (India) and Singapore. Free consultation. 200+ clients worldwide." />
        <link rel="canonical" href="https://www.eqourse.com/contact-us" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "eQOURSE",
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
              "@type": "LocalBusiness",
              "name": "eQOURSE PTE LTD",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "760 Bedok Reservoir Road, #04-13, Waterfront Waves",
                "addressLocality": "Singapore",
                "postalCode": "479245",
                "addressCountry": "SG"
              },
              "telephone": "+91-92144-45870",
              "email": "info@eqourse.com",
              "url": "https://www.eqourse.com",
              "openingHours": "Mo-Fr 09:00-18:00",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 1.3367,
                "longitude": 103.9290
              }
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
