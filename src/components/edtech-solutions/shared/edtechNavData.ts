import {
  BookOpen, Pencil, MonitorPlay, Globe, Laptop, Users,
  GraduationCap, ClipboardCheck, FileText, BookMarked, CalendarDays, FlaskConical, TabletSmartphone, Film, HelpCircle,
  Target, PenTool, Headphones, Calculator, BookOpenCheck,
  Presentation, Building2, Layout, Gamepad2, Brain, Network, Glasses, CircuitBoard, Lightbulb,
  Clapperboard, Video, MousePointerClick,
  Languages, Mic, Captions,
  HardDrive, Server,
  UserCheck, type LucideIcon
} from "lucide-react";

export interface SubServiceLink {
  label: string;
  href: string;
  icon?: LucideIcon;
  /** Short bullet-point highlights shown in the mega-menu preview panel */
  serviceHighlights?: string[];
}

export interface EdTechCategory {
  label: string;
  href: string;
  icon: LucideIcon;
  image?: string;
  description?: string;
  subServices: SubServiceLink[];
}

export const edtechCategories: EdTechCategory[] = [
  {
    label: "Custom E-Learning Content",
    href: "/edtech-solutions/custom-e-learning-content",
    icon: BookOpen,
    image: "/assets/dropdown/custom_e_learning.png",
    description: "Tailor-made e-learning modules, K12 curriculum, and engaging digital workbooks.",
    subServices: [
      {
        label: "K12 & Higher Education", href: "/edtech-solutions/custom-e-learning-content/k12-and-higher-education", icon: GraduationCap,
        serviceHighlights: ["Curriculum Development", "Assessment Development", "Study Material Development", "Competitive Exam Preparation", "Interactive Workbooks", "Teacher Lesson Plans", "2D & 3D Educational Videos"],
      },
      {
        label: "K12 Curriculum Development", href: "/edtech-solutions/custom-e-learning-content/k12-curriculum-development", icon: Layout,
        serviceHighlights: ["Subject-Centered Curriculum Design", "Learner-Centered Curriculum Design", "Problem-Oriented Curriculum Design"],
      },
      {
        label: "Assessment Development", href: "/edtech-solutions/custom-e-learning-content/assessment-development", icon: ClipboardCheck,
        serviceHighlights: ["Formative Assessments", "Game-Based Assessments", "Adaptive Testing", "Quiz & Question Bank Development", "Assessment for Competitive Exams", "Subject-Integrated Assessments"],
      },
      {
        label: "Educational Content Development", href: "/edtech-solutions/custom-e-learning-content/educational-content-development", icon: FileText,
        serviceHighlights: ["Textbook Content Development", "Solution Manuals", "Question Banks", "Curriculum Development", "Lesson Plan Creation", "Study Guides & Notes"],
      },
      {
        label: "Workbook Development", href: "/edtech-solutions/custom-e-learning-content/workbook-development", icon: BookMarked,
        serviceHighlights: ["Chapter-Wise Workbooks", "Full-Syllabus Workbooks", "Topic-Based Workbooks", "Interactive Workbooks", "Assessment-Integrated Workbooks"],
      },
      {
        label: "Teacher Lesson Plan", href: "/edtech-solutions/custom-e-learning-content/teacher-lesson-plan", icon: CalendarDays,
        serviceHighlights: ["Daily Lesson Plans", "Weekly/Monthly Lesson Plans", "Subject-Specific Lesson Plans", "Differentiated Lesson Plans", "Technology-Enhanced Lesson Plans"],
      },
      {
        label: "STEM Curriculum Services", href: "/edtech-solutions/custom-e-learning-content/stem-curriculum-services", icon: FlaskConical,
        serviceHighlights: ["Integrated STEM Programs", "Project-Based STEM Learning", "STEM Lab Activities", "Coding & Robotics Curriculum", "STEM Assessment Tools"],
      },
      {
        label: "E-Book Creation", href: "/edtech-solutions/custom-e-learning-content/ebook-creation", icon: TabletSmartphone,
        serviceHighlights: ["Interactive Digital Textbooks", "EPUB & PDF E-Books", "Multimedia-Rich E-Books", "Curriculum-Aligned E-Books", "Accessible E-Books"],
      },
      {
        label: "2D & 3D Videos", href: "/edtech-solutions/custom-e-learning-content/2d-3d-videos", icon: Film,
        serviceHighlights: ["2D Animated Explainer Videos", "3D Animated Educational Videos", "Whiteboard Animation Videos", "Motion Graphics"],
      },
      {
        label: "Quiz & Question Bank", href: "/edtech-solutions/custom-e-learning-content/quiz-question-bank", icon: HelpCircle,
        serviceHighlights: ["MCQ Question Banks", "Short & Long Answer Questions", "Case-Based Questions", "Adaptive Question Pools", "Exam-Pattern Question Banks"],
      },
    ],
  },
  {
    label: "Exam Preparation Content",
    href: "/edtech-solutions/exam-preparation-content",
    icon: Pencil,
    image: "/assets/dropdown/exam_prep.png",
    description: "Comprehensive adaptive test prep materials for global standardized tests.",
    subServices: [
      {
        label: "APTIS Prep", href: "/edtech-solutions/exam-preparation-content/aptis", icon: Target,
        serviceHighlights: ["Listening Practice", "Reading Practice", "Speaking Tasks", "Writing Tasks", "Grammar & Vocabulary"],
      },
      {
        label: "TOEIC Prep", href: "/edtech-solutions/exam-preparation-content/toeic", icon: Headphones,
        serviceHighlights: ["TOEIC Listening Practice", "TOEIC Reading Practice", "TOEIC Speaking Tasks", "TOEIC Writing Tasks"],
      },
      {
        label: "SAT Prep", href: "/edtech-solutions/exam-preparation-content/sat", icon: Calculator,
        serviceHighlights: ["SAT Math Practice", "SAT Reading Practice", "SAT Writing & Language", "Full-Length SAT Practice Tests"],
      },
      {
        label: "ACT Prep", href: "/edtech-solutions/exam-preparation-content/act", icon: PenTool,
        serviceHighlights: ["ACT English", "ACT Mathematics", "ACT Reading", "ACT Science"],
      },
      {
        label: "AP Exam Prep", href: "/edtech-solutions/exam-preparation-content/ap-exam", icon: BookOpenCheck,
        serviceHighlights: ["AP STEM Subjects", "AP Humanities", "AP Social Sciences", "AP FRQ Practice"],
      },
      {
        label: "IELTS Prep", href: "/edtech-solutions/exam-preparation-content/ielts", icon: Globe,
        serviceHighlights: ["IELTS Listening", "IELTS Reading", "IELTS Writing (Task 1 & 2)", "IELTS Speaking (Parts 1–3)"],
      },
      {
        label: "CEFR Placement", href: "/edtech-solutions/exam-preparation-content/cefr", icon: Target,
        serviceHighlights: ["CEFR Placement Tests (A1–C2)", "Level-Specific Content", "Adaptive CEFR Testing"],
      },
      {
        label: "PTE Prep", href: "/edtech-solutions/exam-preparation-content/pte", icon: Mic,
        serviceHighlights: ["PTE Speaking & Writing", "PTE Reading", "PTE Listening"],
      },
      {
        label: "TOEFL Prep", href: "/edtech-solutions/exam-preparation-content/toefl", icon: FileText,
        serviceHighlights: ["TOEFL Reading", "TOEFL Listening", "TOEFL Speaking", "TOEFL Writing"],
      },
    ],
  },
  {
    label: "Learning Solutions",
    href: "/edtech-solutions/learning-solutions",
    icon: MonitorPlay,
    image: "/assets/dropdown/learning_solutions.png",
    description: "Immersive AR/VR and AI-powered gamified learning environments.",
    subServices: [
      {
        label: "Instructor Led Training", href: "/edtech-solutions/learning-solutions/ilt", icon: Presentation,
        serviceHighlights: ["Facilitator Guides", "Participant Workbooks", "Presentation Decks", "Activity & Exercise Sheets"],
      },
      {
        label: "Corporate E-learning", href: "/edtech-solutions/learning-solutions/corporate-elearning", icon: Building2,
        serviceHighlights: ["Onboarding Modules", "Compliance Training", "Skills Development", "Product Training"],
      },
      {
        label: "Training Modules", href: "/edtech-solutions/learning-solutions/training-modules", icon: Layout,
        serviceHighlights: ["Microlearning Modules", "Scenario-Based Modules", "Assessment-Driven Modules"],
      },
      {
        label: "Gamified Learning", href: "/edtech-solutions/learning-solutions/gamified-learning", icon: Gamepad2,
        serviceHighlights: ["Points & Rewards Systems", "Leaderboards & Badges", "Interactive Challenges", "Story-Based Gamification"],
      },
      {
        label: "Adaptive Learning", href: "/edtech-solutions/learning-solutions/adaptive-learning", icon: Brain,
        serviceHighlights: ["Personalized Learning Paths", "Diagnostic Assessments", "Adaptive Content Delivery"],
      },
      {
        label: "Blended Learning", href: "/edtech-solutions/learning-solutions/blended-learning", icon: Network,
        serviceHighlights: ["Flipped Classroom Content", "Hybrid Course Design", "Collaborative Digital Tools"],
      },
      {
        label: "AR/VR Simulations", href: "/edtech-solutions/learning-solutions/ar-vr", icon: Glasses,
        serviceHighlights: ["Virtual Lab Simulations", "AR Overlay Learning", "360° Immersive Environments", "Interactive 3D Models"],
      },
      {
        label: "Instructional Design", href: "/edtech-solutions/learning-solutions/instructional-design", icon: CircuitBoard,
        serviceHighlights: ["ADDIE Model Implementation", "Learning Needs Analysis", "Storyboarding & Scripting", "Learning Outcome Mapping"],
      },
      {
        label: "AI-Powered Learning", href: "/edtech-solutions/learning-solutions/ai-powered-learning", icon: Lightbulb,
        serviceHighlights: ["AI-Powered Personalization", "Intelligent Tutoring Systems", "Automated Content Generation", "Learning Analytics"],
      },
    ],
  },
  {
    label: "E-Learning Video Solutions",
    href: "/edtech-solutions/elearning-video-solutions",
    icon: Clapperboard,
    image: "/assets/dropdown/elearning_video.png",
    description: "High-quality animated videos, kinetic typography, and PPT-to-video services.",
    subServices: [
      {
        label: "PPT Video Services", href: "/edtech-solutions/elearning-video-solutions/ppt-videos", icon: MonitorPlay,
        serviceHighlights: ["PPT to Video Conversion", "Voice-Over Integration", "Animation & Transitions", "Pen-Tab Video Lessons"],
      },
      {
        label: "Articulate Storyline", href: "/edtech-solutions/elearning-video-solutions/articulate-storyline", icon: MousePointerClick,
        serviceHighlights: ["Branching Scenarios", "Interactive Simulations", "Drag & Drop Activities", "SCORM/xAPI Packaging"],
      },
      {
        label: "Animated Video Services", href: "/edtech-solutions/elearning-video-solutions/animated-videos", icon: Video,
        serviceHighlights: ["Character Animation", "Explainer Videos", "Whiteboard Animations", "Motion Graphics"],
      },
    ],
  },
  {
    label: "Localization Services",
    href: "/edtech-solutions/localization-services",
    icon: Globe,
    image: "/assets/dropdown/localization.png",
    description: "Accurate translation, professional voiceovers, and subtitling for global reach.",
    subServices: [
      {
        label: "Translation Services", href: "/edtech-solutions/localization-services/translation", icon: Languages,
        serviceHighlights: ["Curriculum Translation", "Assessment Translation", "E-Learning Module Translation", "Document Translation"],
      },
      {
        label: "Voice Over Services", href: "/edtech-solutions/localization-services/voice-over", icon: Mic,
        serviceHighlights: ["Male & Female Voice Artists", "Studio-Quality Recording", "Script Timing & Sync", "Multiple Accent Options"],
      },
      {
        label: "Subtitling Services", href: "/edtech-solutions/localization-services/subtitling", icon: Captions,
        serviceHighlights: ["SRT & VTT Subtitle Files", "Burned-In Subtitles", "Multilingual Subtitles", "Closed Captioning"],
      },
    ],
  },
  {
    label: "Technology Solutions",
    href: "/edtech-solutions/technology-solutions",
    icon: Laptop,
    image: "/assets/dropdown/technology_solutions.png",
    description: "Robust Learning Management Systems (LMS) and cloud-based architecture.",
    subServices: [
      {
        label: "LMS Course Builds", href: "/edtech-solutions/technology-solutions/lms-course-builds", icon: HardDrive,
        serviceHighlights: ["SCORM Course Packaging", "xAPI/Tin Can Integration", "Multi-LMS Testing", "Course Structure Design"],
      },
      {
        label: "White Label LMS", href: "/edtech-solutions/technology-solutions/white-label-lms", icon: Server,
        serviceHighlights: ["Custom Branding", "User Management", "Content Integration", "Analytics & Reporting"],
      },
    ],
  },
  {
    label: "Subject Matter Experts",
    href: "/edtech-solutions/subject-matter-experts",
    icon: Users,
    image: "/assets/dropdown/sme_recruitment.png",
    description: "Top-tier global subject matter experts for tutoring, recruiting, and mentoring.",
    subServices: [
      {
        label: "SME Recruitment", href: "/edtech-solutions/subject-matter-experts/recruitment", icon: UserCheck,
        serviceHighlights: ["Subject-Specific Recruitment", "Screening & Vetting", "Bulk Recruitment", "Freelancer & Full-Time Options"],
      },
      {
        label: "SME Training & Certification", href: "/edtech-solutions/subject-matter-experts/training", icon: BookOpenCheck,
        serviceHighlights: ["Content Standards Training", "Pedagogy Workshops", "Platform Tool Training", "Certification Programs"],
      },
      {
        label: "Live Online Tutors", href: "/edtech-solutions/subject-matter-experts/live-online-tutors", icon: MonitorPlay,
        serviceHighlights: ["One-on-One Tutoring", "Group Tutoring Sessions", "Doubt Resolution", "Multi-Subject Support"],
      },
    ],
  },
];
