import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import TestimonialsGrid from "@/components/testimonials/TestimonialsGrid";
import { Star, ThumbsUp, Heart } from "lucide-react";

const ClientTestimonials = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "About Us", href: "/aboutus" }, { label: "Client Testimonials" }]}>
      <Helmet>
        <title>Client Testimonials │ Content Services & AI Data Services Reviews │ eQOURSE</title>
        <meta
          name="description"
          content="Read what 200+ clients say about eQOURSE. Testimonials from education companies, Content Services platforms, AI teams, and enterprise clients on our e-learning content, data annotation, and model testing services."
        />
        <meta
          name="keywords"
          content="eQOURSE testimonials, client reviews, Content Services testimonials, AI data services reviews, e-learning client feedback, data annotation reviews, education content testimonials"
        />
      </Helmet>
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "About Us", item: "https://www.eqourse.com/aboutus" },
          { name: "Client Testimonials", item: "https://www.eqourse.com/clients-testimonials" }
        ]}
      />

      <ServiceHero
        preHeadline="eQOURSE Testimonials"
        headline="What Our Clients Are"
        headlineAccent="Saying"
        subtext="At eQOURSE, we are proud to have worked with 200+ clients across Content Services and AI sectors, delivering scalable e-learning solutions and production-grade AI training data. From K-12 content and SAT preparation to multilingual data annotation and real-world model testing — our clients consistently share positive feedback about their experience with us."
        ctaText="View Reviews"
        ctaLink="#reviews"
        imageSrc="/assets/about/Testiominal.png"
        imageAlt="Satisfied eQOURSE global clients and partners"
        rotatingBadges={[
          { icon: Star, title: "Top Rated", subtitle: "4.9/5 satisfaction", color: "hsl(43 96% 58%)" },
          { icon: ThumbsUp, title: "Reliability", subtitle: "Trusted partner", color: "hsl(170 82% 55%)" },
          { icon: Heart, title: "Success", subtitle: "Happy clients", color: "hsl(340 82% 52%)" }
        ]}
        bottomBadge={{ iconText: "5★", title: "Proven Track Record", subtitle: "Consistently delivering quality" }}
      />
      
      <TestimonialsGrid />
    </PageLayout>
  );
};

export default ClientTestimonials;
