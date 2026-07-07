const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '../src/components/content-services/talent-assessment');

const updates = [
  {
    file: 'CandidateEvaluationPage.tsx',
    img: '/assets/content-services/talent-assessment/candidate-evaluation-content-and-assessment-support.webp',
    alt: 'Candidate evaluation content and screening assessment support interfaces'
  },
  {
    file: 'CompetencyFrameworksPage.tsx',
    img: '/assets/content-services/talent-assessment/competency-frameworks-for-workforce-assessment.webp',
    alt: 'Competency frameworks and behavioral indicators for workforce assessment'
  },
  {
    file: 'DigitalAssessmentPage.tsx',
    img: '/assets/content-services/talent-assessment/digital-assessment-infrastructure-support.webp',
    alt: 'Digital assessment infrastructure and test delivery platform support'
  },
  {
    file: 'LearningReadinessPage.tsx',
    img: '/assets/content-services/talent-assessment/learning-readiness-assessment-solutions.webp',
    alt: 'Learning readiness assessment solutions and prerequisite skill evaluation'
  },
  {
    file: 'OrganizationalDiagnosticsPage.tsx',
    img: '/assets/content-services/talent-assessment/organisational-diagnostics-for-workforce-capability.webp',
    alt: 'Organizational diagnostics and workforce capability assessment matrices'
  },
  {
    file: 'PsychometricAssessmentsPage.tsx',
    img: '/assets/content-services/talent-assessment/psychometric-assessments-for-workforce-evaluation.webp',
    alt: 'Psychometric assessments and testing workflows for workforce evaluation'
  },
  {
    file: 'SkillAssessmentsPage.tsx',
    img: '/assets/content-services/talent-assessment/skill-based-assessments-for-workforce-capability-evaluation.webp',
    alt: 'Skill-based assessments and technical capability evaluation formats'
  }
];

updates.forEach(({ file, img, alt }) => {
  const filepath = path.join(DIR, file);
  if (!fs.existsSync(filepath)) {
    console.error(`Missing: ${filepath}`);
    return;
  }
  
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Check if it already has bannerImage
  if (content.includes('bannerImage=')) {
    console.log(`Already updated ${file}`);
    return;
  }
  
  // Find ctaText=" as the anchor point
  const regex = /(\s+ctaText="[^"]+")/g;
  content = content.replace(regex, `\n    bannerImage="${img}"\n    bannerImageAlt="${alt}"$1`);
  
  fs.writeFileSync(filepath, content);
  console.log(`✅ Updated ${file}`);
});
