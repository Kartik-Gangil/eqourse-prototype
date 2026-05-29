import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import ContactPage from "@/components/contact/ContactPage";

const ContactUs = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "Contact Us" }]}>
      <Helmet>
        <title>Contact Us │ Content Service & AI Data Services │ eQOURSE</title>
        <meta
          name="description"
          content="Get in touch with eQOURSE for Content Services and AI data services. Custom e-learning content, curriculum development, data annotation, model testing. Offices in India & Singapore. Call +91-92144-45870 or email info@eqourse.com. Free consultation available."
        />
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

      <ServiceHero
        preHeadline="CONTACT US"
        headline="Get in Touch — Let's Build"
        headlineAccent="Something Great"
        subtext="Whether you need custom e-learning content for your Content Services platform or production-grade AI training data for your ML models, our team is ready to help. Tell us about your project and we'll respond within 24 hours."
        ctaText="Send Message"
        ctaLink="#contact-form"
        imageSrc="/assets/contact/contact us.png"
        imageAlt="Contact eQOURSE for expert Content Services and AI Data Solutions"
      />

      <div id="contact-form">
        <ContactPage />
      </div>
    </PageLayout>
  );
};

export default ContactUs;
