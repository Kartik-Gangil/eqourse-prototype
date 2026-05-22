import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import PageHeader from "../components/PageHeader";
import { SAMPLE_HIERARCHY } from "../lib/sampleHierarchy";

const accentMap: Record<string, string> = {
  emerald: "from-emerald-500 to-emerald-600",
  blue: "from-blue-500 to-blue-600",
  violet: "from-violet-500 to-violet-600",
};

const borderMap: Record<string, string> = {
  emerald: "hover:border-emerald-400",
  blue: "hover:border-blue-400",
  violet: "hover:border-violet-400",
};

export default function SampleCategories() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-5xl">
      <PageHeader
        title="Samples"
        description="Manage sample files across 3 main categories. Click a category to browse its sub-categories and upload files."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
        {SAMPLE_HIERARCHY.map((cat) => {
          const Icon = cat.icon;
          const totalTabs = cat.subCategories.reduce((sum, s) => sum + s.tabs.length, 0);
          return (
            <Card
              key={cat.id}
              className={`relative overflow-hidden cursor-pointer group transition-all hover:shadow-lg hover:-translate-y-1 ${borderMap[cat.accent] ?? ""}`}
              onClick={() => navigate(`/admin/samples/${cat.id}`)}
            >
              {/* Top accent bar */}
              <div className={`h-1.5 bg-gradient-to-r ${accentMap[cat.accent] ?? "from-gray-400 to-gray-500"}`} />

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accentMap[cat.accent] ?? "from-gray-400 to-gray-500"} flex items-center justify-center shadow-sm`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors mt-1" />
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold">{cat.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="flex gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                  <span><strong className="text-foreground">{cat.subCategories.length}</strong> sub-categories</span>
                  <span><strong className="text-foreground">{totalTabs}</strong> tabs</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
