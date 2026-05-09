import { lazy } from "react";

/* ─── Category 1: Custom E-Learning Content ─── */
export const K12HigherEducationPage = lazy(() => import("@/components/edtech-solutions/custom-elearning/K12HigherEducationPage"));
export const K12CurriculumPage = lazy(() => import("@/components/edtech-solutions/custom-elearning/K12CurriculumPage"));
export const AssessmentDevelopmentPage = lazy(() => import("@/components/edtech-solutions/custom-elearning/AssessmentDevelopmentPage"));
export const EducationalContentPage = lazy(() => import("@/components/edtech-solutions/custom-elearning/EducationalContentPage"));
export const WorkbookPage = lazy(() => import("@/components/edtech-solutions/custom-elearning/WorkbookPage"));
export const TeacherLessonPlanPage = lazy(() => import("@/components/edtech-solutions/custom-elearning/TeacherLessonPlanPage"));
export const STEMCurriculumPage = lazy(() => import("@/components/edtech-solutions/custom-elearning/STEMCurriculumPage"));
export const EbookCreationPage = lazy(() => import("@/components/edtech-solutions/custom-elearning/EbookCreationPage"));
export const Videos2D3DPage = lazy(() => import("@/components/edtech-solutions/custom-elearning/Videos2D3DPage"));
export const QuizQuestionBankPage = lazy(() => import("@/components/edtech-solutions/custom-elearning/QuizQuestionBankPage"));

/* ─── Category 2: Exam Preparation Content ─── */
export const AptisPage = lazy(() => import("@/components/edtech-solutions/exam-prep/AptisPage"));
export const ToeicPage = lazy(() => import("@/components/edtech-solutions/exam-prep/ToeicPage"));
export const SatPage = lazy(() => import("@/components/edtech-solutions/exam-prep/SatPage"));
export const ActPage = lazy(() => import("@/components/edtech-solutions/exam-prep/ActPage"));
export const ApExamPage = lazy(() => import("@/components/edtech-solutions/exam-prep/ApExamPage"));
export const IeltsPage = lazy(() => import("@/components/edtech-solutions/exam-prep/IeltsPage"));
export const CefrPage = lazy(() => import("@/components/edtech-solutions/exam-prep/CefrPage"));
export const PtePage = lazy(() => import("@/components/edtech-solutions/exam-prep/PtePage"));
export const ToeflPage = lazy(() => import("@/components/edtech-solutions/exam-prep/ToeflPage"));

/* ─── Category 3: Learning Solutions ─── */
export const IltPage = lazy(() => import("@/components/edtech-solutions/learning-solutions/IltPage"));
export const CorporateElearningPage = lazy(() => import("@/components/edtech-solutions/learning-solutions/CorporateElearningPage"));
export const TrainingModulesPage = lazy(() => import("@/components/edtech-solutions/learning-solutions/TrainingModulesPage"));
export const GamifiedLearningPage = lazy(() => import("@/components/edtech-solutions/learning-solutions/GamifiedLearningPage"));
export const AdaptiveLearningPage = lazy(() => import("@/components/edtech-solutions/learning-solutions/AdaptiveLearningPage"));
export const BlendedLearningPage = lazy(() => import("@/components/edtech-solutions/learning-solutions/BlendedLearningPage"));
export const ArVrPage = lazy(() => import("@/components/edtech-solutions/learning-solutions/ArVrPage"));
export const InstructionalDesignPage = lazy(() => import("@/components/edtech-solutions/learning-solutions/InstructionalDesignPage"));
export const AiPoweredPage = lazy(() => import("@/components/edtech-solutions/learning-solutions/AiPoweredPage"));

/* ─── Category 4: E-Learning Video Solutions ─── */
export const PptVideosPage = lazy(() => import("@/components/edtech-solutions/video-solutions/PptVideosPage"));
export const ArticulatePage = lazy(() => import("@/components/edtech-solutions/video-solutions/ArticulatePage"));
export const AnimatedVideosPage = lazy(() => import("@/components/edtech-solutions/video-solutions/AnimatedVideosPage"));

/* ─── Category 5: Localization Services ─── */
export const TranslationPage = lazy(() => import("@/components/edtech-solutions/localization/TranslationPage"));
export const VoiceOverPage = lazy(() => import("@/components/edtech-solutions/localization/VoiceOverPage"));
export const SubtitlingPage = lazy(() => import("@/components/edtech-solutions/localization/SubtitlingPage"));

/* ─── Category 6: Technology Solutions ─── */
export const LmsCoursePage = lazy(() => import("@/components/edtech-solutions/tech-solutions/LmsCoursePage"));
export const WhiteLabelLmsPage = lazy(() => import("@/components/edtech-solutions/tech-solutions/WhiteLabelLmsPage"));

/* ─── Category 7: Subject Matter Experts ─── */
export const RecruitmentPage = lazy(() => import("@/components/edtech-solutions/sme/RecruitmentPage"));
export const TrainingPage = lazy(() => import("@/components/edtech-solutions/sme/TrainingPage"));
export const LiveTutorsPage = lazy(() => import("@/components/edtech-solutions/sme/LiveTutorsPage"));

/* ─── Route definitions for the router ─── */
export const edtechSubServiceRoutes = [
  // Category 1
  { path: "/content-service/custom-e-learning-content/k12-and-higher-education", Component: K12HigherEducationPage },
  { path: "/content-service/custom-e-learning-content/k12-curriculum-development", Component: K12CurriculumPage },
  { path: "/content-service/custom-e-learning-content/assessment-development", Component: AssessmentDevelopmentPage },
  { path: "/content-service/custom-e-learning-content/educational-content-development", Component: EducationalContentPage },
  { path: "/content-service/custom-e-learning-content/workbook-development", Component: WorkbookPage },
  { path: "/content-service/custom-e-learning-content/teacher-lesson-plan", Component: TeacherLessonPlanPage },
  { path: "/content-service/custom-e-learning-content/stem-curriculum-services", Component: STEMCurriculumPage },
  { path: "/content-service/custom-e-learning-content/ebook-creation", Component: EbookCreationPage },
  { path: "/content-service/custom-e-learning-content/2d-3d-videos", Component: Videos2D3DPage },
  { path: "/content-service/custom-e-learning-content/quiz-question-bank", Component: QuizQuestionBankPage },
  // Category 2
  { path: "/content-service/exam-preparation-content/aptis", Component: AptisPage },
  { path: "/content-service/exam-preparation-content/toeic", Component: ToeicPage },
  { path: "/content-service/exam-preparation-content/sat", Component: SatPage },
  { path: "/content-service/exam-preparation-content/act", Component: ActPage },
  { path: "/content-service/exam-preparation-content/ap-exam", Component: ApExamPage },
  { path: "/content-service/exam-preparation-content/ielts", Component: IeltsPage },
  { path: "/content-service/exam-preparation-content/cefr", Component: CefrPage },
  { path: "/content-service/exam-preparation-content/pte", Component: PtePage },
  { path: "/content-service/exam-preparation-content/toefl", Component: ToeflPage },
  // Category 3
  { path: "/content-service/learning-solutions/ilt", Component: IltPage },
  { path: "/content-service/learning-solutions/corporate-elearning", Component: CorporateElearningPage },
  { path: "/content-service/learning-solutions/training-modules", Component: TrainingModulesPage },
  { path: "/content-service/learning-solutions/gamified-learning", Component: GamifiedLearningPage },
  { path: "/content-service/learning-solutions/adaptive-learning", Component: AdaptiveLearningPage },
  { path: "/content-service/learning-solutions/blended-learning", Component: BlendedLearningPage },
  { path: "/content-service/learning-solutions/ar-vr", Component: ArVrPage },
  { path: "/content-service/learning-solutions/instructional-design", Component: InstructionalDesignPage },
  { path: "/content-service/learning-solutions/ai-powered-learning", Component: AiPoweredPage },
  // Category 4
  { path: "/content-service/elearning-video-solutions/ppt-videos", Component: PptVideosPage },
  { path: "/content-service/elearning-video-solutions/articulate-storyline", Component: ArticulatePage },
  { path: "/content-service/elearning-video-solutions/animated-videos", Component: AnimatedVideosPage },
  // Category 5
  { path: "/content-service/localization-services/translation", Component: TranslationPage },
  { path: "/content-service/localization-services/voice-over", Component: VoiceOverPage },
  { path: "/content-service/localization-services/subtitling", Component: SubtitlingPage },
  // Category 6
  { path: "/content-service/technology-solutions/lms-course-builds", Component: LmsCoursePage },
  { path: "/content-service/technology-solutions/white-label-lms", Component: WhiteLabelLmsPage },
  // Category 7
  { path: "/content-service/subject-matter-experts/recruitment", Component: RecruitmentPage },
  { path: "/content-service/subject-matter-experts/training", Component: TrainingPage },
  { path: "/content-service/subject-matter-experts/live-online-tutors", Component: LiveTutorsPage },
];
