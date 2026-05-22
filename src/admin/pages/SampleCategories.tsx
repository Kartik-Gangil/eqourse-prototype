import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, FolderOpen, FileText, PlayCircle, Database } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PageHeader from "../components/PageHeader";
import { adminApi } from "../lib/api";
import type { SampleCategory } from "../lib/types";
import { toast } from "sonner";

/* ─── Slug → Main Category mapping ─── */
const TEXT_SLUGS = new Set([
  "kindergarten-to-k5-samples", "k6-to-k12-samples", "iit-jee-neet-samples",
  "upsc-state-psc-samples", "stem-content-samples", "curriculum-samples",
  "translation-and-localization-text-samples", "test-prep-and-assessments",
]);
const VIDEO_SLUGS = new Set([
  "articulate-storyline-video-samples", "pen-tab-and-ppt-samples",
  "ai-avatar-video-samples", "flash-to-html-samples", "2d-3d-video-samples",
  "promotional-video", "immersive-simulation-ar-vr-video",
]);
const AI_SLUGS = new Set([
  "nlp-annotation", "computer-vision", "audio-speech",
  "rlhf", "data-collection", "cleaned-datasets",
]);

type MainCategory = "text" | "video" | "ai-data" | "other";

const getMainCategory = (slug: string): MainCategory => {
  if (TEXT_SLUGS.has(slug)) return "text";
  if (VIDEO_SLUGS.has(slug)) return "video";
  if (AI_SLUGS.has(slug)) return "ai-data";
  return "other";
};

const SECTION_META: Record<MainCategory, { label: string; description: string; icon: typeof FileText; accent: string }> = {
  text: { label: "Text Content Samples", description: "8 sub-categories · K-12, competitive exams, STEM, and localization", icon: FileText, accent: "border-l-emerald-500" },
  video: { label: "Video Content Samples", description: "7 sub-categories · Articulate, animations, AR/VR, and more", icon: PlayCircle, accent: "border-l-blue-500" },
  "ai-data": { label: "AI Data Samples", description: "6 sub-categories · NLP, Computer Vision, Audio, RLHF, Collection, Cleaned", icon: Database, accent: "border-l-violet-500" },
  other: { label: "Other / Uncategorized", description: "Categories that don't match a known main category", icon: FolderOpen, accent: "border-l-amber-500" },
};

export default function SampleCategories() {
  const navigate = useNavigate();
  const [items, setItems] = useState<SampleCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<SampleCategory | null>(null);

  const refresh = async () => {
    setLoading(true);
    setItems(await adminApi.listSampleCategories());
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);

  const handleDelete = async (force = false) => {
    if (!confirmDelete) return;
    try {
      await adminApi.deleteSampleCategory(confirmDelete.id, { force });
      toast.success("Category deleted");
      setConfirmDelete(null);
      refresh();
    } catch (e) {
      if (e instanceof Error && e.message === "category_not_empty") {
        const ok = confirm(
          `This category contains ${confirmDelete.sampleCount} sample(s). Delete the category and all its samples?`
        );
        if (ok) handleDelete(true);
      } else {
        toast.error("Delete failed");
      }
    }
  };

  /* Group categories by main category */
  const grouped: Record<MainCategory, SampleCategory[]> = { text: [], video: [], "ai-data": [], other: [] };
  items.forEach((c) => {
    const g = getMainCategory(c.slug);
    grouped[g].push(c);
  });
  // Sort each group by order
  for (const g of Object.values(grouped)) g.sort((a, b) => a.order - b.order);

  const sectionOrder: MainCategory[] = ["text", "video", "ai-data", "other"];

  return (
    <div className="p-8">
      <PageHeader
        title="Sample Categories"
        description="Manage samples across 3 main groups: Text Content, Video Content, and AI Data. Each sub-category maps to a public page on the site."
        actions={
          <Button onClick={() => navigate("/admin/sample-categories/new")}>
            <Plus className="w-4 h-4 mr-2" /> New category
          </Button>
        }
      />

      {loading ? (
        <Card className="p-12 text-center text-muted-foreground">Loading…</Card>
      ) : items.length === 0 ? (
        <Card className="p-12 text-center text-muted-foreground">
          No sample categories yet. Click "New category" to create one.
        </Card>
      ) : (
        <div className="space-y-10">
          {sectionOrder.map((key) => {
            const group = grouped[key];
            if (group.length === 0) return null;
            const meta = SECTION_META[key];
            const SectionIcon = meta.icon;
            return (
              <div key={key}>
                {/* Section header */}
                <div className={`flex items-center gap-3 mb-4 border-l-4 ${meta.accent} pl-4`}>
                  <SectionIcon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <h2 className="text-lg font-semibold">{meta.label}</h2>
                    <p className="text-xs text-muted-foreground">{meta.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.map((c) => (
                    <Card key={c.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      {c.thumbnailUrl ? (
                        <div className="aspect-video bg-muted">
                          <img src={c.thumbnailUrl} alt={c.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="aspect-video bg-muted/50 flex items-center justify-center">
                          <SectionIcon className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="p-5 space-y-3">
                        <div>
                          <h3 className="font-semibold">{c.name}</h3>
                          <p className="text-xs text-muted-foreground">/{c.slug}</p>
                        </div>
                        {c.description && <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>}
                        <div className="text-xs text-muted-foreground">
                          {c.sampleCount ?? 0} {c.sampleCount === 1 ? "sample" : "samples"}
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate(`/admin/sample-categories/${c.id}/samples`)}>
                            <FolderOpen className="w-4 h-4 mr-1.5" /> Manage samples
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/sample-categories/${c.id}`)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(c)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>"{confirmDelete?.name}" will be removed from the public site.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(false)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
