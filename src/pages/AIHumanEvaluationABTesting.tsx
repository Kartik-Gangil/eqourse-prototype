import AIDataServicesLayout from "@/components/ai-data-services/shared/AIDataServicesLayout";
import HumanEvaluationPage from "@/components/ai-data-services/model-testing/human-evaluation/HumanEvaluationPage";

export default function AIHumanEvaluationABTesting() {
  return <AIDataServicesLayout breadcrumbs={[{ label: "AI Data Services", href: "/ai-data-services" },{ label: "AI Model Testing", href: "/ai-data-services/model-testing" },{ label: "Human Evaluation & A/B Testing" }]}><HumanEvaluationPage/></AIDataServicesLayout>;
}
