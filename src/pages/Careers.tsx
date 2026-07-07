import { useState } from "react";
import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import CareersWhyWork from "@/components/careers/CareersWhyWork";
import { Laptop, GraduationCap, TrendingUp } from "lucide-react";

import JobListings from "@/components/careers/JobListings";
import JobApplicationForm from "@/components/careers/JobApplicationForm";
import type { JobOpening } from "@/admin/lib/types";

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  return (
    <PageLayout breadcrumbs={[{ label: "About Us", href: "/aboutus" }, { label: "Careers" }]}>
      <Helmet>
        <title>Careers at eQOURSE │ Content Services & AI Data Services Jobs │ India & Singapore</title>
        <meta
          name="description"
          content="Join eQOURSE - careers in Content Services development, instructional design, AI data annotation, NLP, computer vision, and more. Work with 500+ specialists across India and Singapore. Apply now."
        />
        <meta
          name="keywords"
          content="eQOURSE careers, Content Services jobs, AI data annotation jobs, content development careers, instructional design jobs, data labeling jobs India, NLP annotator jobs, education technology careers"
        />
        <link rel="canonical" href="https://www.eqourse.com/career" />
        <meta property="og:title" content="Careers at eQOURSE │ Content Services & AI Data Services Jobs" />
        <meta property="og:description" content="Join eQOURSE - careers in Content Services, instructional design, AI data annotation, NLP, and more. 500+ specialists across India & Singapore." />
        <meta property="og:url" content="https://www.eqourse.com/career" />
      </Helmet>
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "About Us", item: "https://www.eqourse.com/aboutus" },
          { name: "Careers", item: "https://www.eqourse.com/career" }
        ]}
      />

      <ServiceHero
        preHeadline="Join Our Team"
        headline="Build the Future of"
        headlineAccent="Education & AI"
        subtext="Shape the future of education and AI with eQOURSE. Be part of a dynamic team of 500+ specialists dedicated to innovative Content Services and production-grade AI data services. We're always looking for talented content creators, instructional designers, data annotators, NLP specialists, project managers, and operations professionals. Grow your career with us across our India and Singapore offices."
        ctaText="View Openings"
        ctaLink="#apply"
        imageSrc="/assets/about/Carrer.webp"
        imageAlt="Careers at eQOURSE - Professionals collaborating on education and AI solutions"
        rotatingBadges={[
          { icon: Laptop, title: "Remote Options", subtitle: "Flexible working", color: "hsl(190 85% 68%)" },
          { icon: GraduationCap, title: "Learning", subtitle: "Continuous growth", color: "hsl(165 75% 71%)" },
          { icon: TrendingUp, title: "Growth", subtitle: "Career progression", color: "hsl(170 82% 55%)" }
        ]}
        bottomBadge={{ iconText: "HR", title: "Join Us", subtitle: "Global team, local impact" }}
      />
      
      <CareersWhyWork />
      
      {/* Job Board Section */}
      <section id="apply" className="bg-slate-50 border-t border-slate-200">
        <JobListings onApplyClick={(job) => setSelectedJob(job)} />
      </section>

      {/* Application Form Modal */}
      {selectedJob && (
        <JobApplicationForm 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}
    </PageLayout>
  );
};

export default Careers;
