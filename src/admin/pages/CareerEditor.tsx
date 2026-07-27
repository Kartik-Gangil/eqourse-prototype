import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { adminApi, slugify } from "../lib/api";
import type { JobOpening, JobDepartment, EmploymentType, JobStatus } from "../lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";

const DEPARTMENTS: { value: JobDepartment; label: string }[] = [
  { value: "ai-data", label: "AI Data Services" },
  { value: "content-services", label: "Content Services" },
  { value: "operations", label: "Operations & Admin" },
  { value: "marketing", label: "Marketing & BD" },
  { value: "technology", label: "Technology & Engineering" },
  { value: "hr", label: "Human Resources" },
  { value: "other", label: "Other" },
];

export default function AdminCareerEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<JobOpening>>({
    title: "",
    department: "ai-data",
    location: "",
    employmentType: "full-time",
    experienceRange: "",
    description: "",
    responsibilities: [],
    requirements: [],
    niceToHave: [],
    salaryRange: "",
    salaryCurrency: "INR",
    status: "active",
    customQuestions: [],
  });

  useEffect(() => {
    if (isNew) return;
    const fetchJob = async () => {
      try {
        const job = await adminApi.getJobOpening(id!);
        setFormData({
          title: job.title,
          department: job.department,
          location: job.location,
          employmentType: job.employmentType,
          experienceRange: job.experienceRange,
          description: job.description,
          responsibilities: job.responsibilities || [],
          requirements: job.requirements || [],
          niceToHave: job.niceToHave || [],
          salaryRange: job.salaryRange,
          salaryCurrency: job.salaryCurrency || "INR",
          status: job.status,
          customQuestions: job.customQuestions || [],
          closingDate: job.closingDate ? new Date(job.closingDate).toISOString().split("T")[0] : "",
        });
      } catch (err) {
        toast.error("Failed to load job opening");
        navigate("/admin/careers");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, isNew, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleArrayChange = (field: "responsibilities" | "requirements" | "niceToHave", index: number, value: string) => {
    setFormData((prev) => {
      const newArray = [...(prev[field] || [])];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field: "responsibilities" | "requirements" | "niceToHave") => {
    setFormData((prev) => ({ ...prev, [field]: [...(prev[field] || []), ""] }));
  };

  const removeArrayItem = (field: "responsibilities" | "requirements" | "niceToHave", index: number) => {
    setFormData((prev) => {
      const newArray = [...(prev[field] || [])];
      newArray.splice(index, 1);
      if (newArray.length === 0) newArray.push("");
      return { ...prev, [field]: newArray };
    });
  };

  const handleCustomQuestionChange = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const q = [...(prev.customQuestions || [])];
      q[index] = { ...q[index], [field]: value };
      return { ...prev, customQuestions: q };
    });
  };

  const handleCustomQuestionOptionChange = (qIndex: number, optIndex: number, value: string) => {
    setFormData((prev) => {
      const q = [...(prev.customQuestions || [])];
      const opts = [...(q[qIndex].options || [])];
      opts[optIndex] = value;
      q[qIndex] = { ...q[qIndex], options: opts };
      return { ...prev, customQuestions: q };
    });
  };

  const addCustomQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      customQuestions: [
        ...(prev.customQuestions || []),
        { label: "", type: "text", required: false, options: [] },
      ],
    }));
  };

  const removeCustomQuestion = (index: number) => {
    setFormData((prev) => {
      const q = [...(prev.customQuestions || [])];
      q.splice(index, 1);
      return { ...prev, customQuestions: q };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.department || !formData.location || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    setSaving(true);
    try {
      // Clean up arrays (remove empty strings)
      const cleanData = {
        ...formData,
        responsibilities: formData.responsibilities?.filter((s) => s.trim() !== ""),
        requirements: formData.requirements?.filter((s) => s.trim() !== ""),
        niceToHave: formData.niceToHave?.filter((s) => s.trim() !== ""),
      };

      if (isNew) {
        await adminApi.createJobOpening(cleanData);
        toast.success("Job opening created!");
      } else {
        await adminApi.updateJobOpening(id!, cleanData);
        toast.success("Job opening updated!");
      }
      navigate("/admin/careers");
    } catch (err: any) {
      toast.error(err.message || "Failed to save job opening");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/careers" className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <h1 className="text-2xl font-bold">{isNew ? "Create Job Opening" : "Edit Job Opening"}</h1>
        </div>
        <div className="flex items-center gap-3">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm font-medium"
          >
            <option value="active">🟢 Active</option>
            <option value="paused">🟡 Paused</option>
            <option value="closed">⚪ Closed</option>
          </select>
          <Button onClick={handleSubmit} disabled={saving} className="bg-primary text-white">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-8">
        
        {/* Basic Info */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-border pb-2">Basic Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="e.g. Senior NLP Annotator"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary/40 outline-none"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="e.g. Pune, India or Remote"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Employment Type</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary/40 outline-none"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Range</label>
              <input
                type="text"
                name="experienceRange"
                value={formData.experienceRange}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary/40 outline-none"
                placeholder="e.g. 2-4 years"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Salary Range (Optional)</label>
              <div className="flex gap-2">
                <select
                  name="salaryCurrency"
                  value={formData.salaryCurrency || "INR"}
                  onChange={handleChange}
                  className="w-28 px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary/40 outline-none text-sm font-medium shrink-0"
                >
                  <option value="INR">₹ INR</option>
                  <option value="USD">$ USD</option>
                  <option value="EUR">€ EUR</option>
                  <option value="GBP">£ GBP</option>
                  <option value="SGD">S$ SGD</option>
                </select>
                <input
                  type="text"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary/40 outline-none"
                  placeholder="e.g. 5-8 LPA"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-border pb-2">Description *</h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary/40 outline-none resize-y"
            placeholder="Brief overview of the role..."
          />
        </section>

        {/* Lists (Responsibilities, Requirements, Nice to Have) */}
        {(["responsibilities", "requirements", "niceToHave"] as const).map((field) => {
          const FIELD_LABELS: Record<string, string> = {
            responsibilities: "Responsibilities",
            requirements: "Requirements",
            niceToHave: "Nice To Have",
          };
          const items = (formData[field] || []).filter((s) => s.trim() !== "");
          return (
            <section key={field} className="space-y-4">
              <h2 className="text-lg font-semibold border-b border-border pb-2">
                {FIELD_LABELS[field]}
              </h2>
              <div className="space-y-3">
                {/* Bulk paste textarea */}
                <textarea
                  rows={4}
                  value={(formData[field] || []).join("\n")}
                  onChange={(e) => {
                    const lines = e.target.value.split("\n");
                    setFormData((prev) => ({ ...prev, [field]: lines }));
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pasted = e.clipboardData.getData("text");
                    const newLines = pasted.split(/\r?\n/).filter((l) => l.trim() !== "");
                    const textarea = e.target as HTMLTextAreaElement;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const current = (formData[field] || []).join("\n");
                    const before = current.substring(0, start);
                    const after = current.substring(end);
                    const merged = (before + newLines.join("\n") + after).split("\n").filter((l) => l.trim() !== "");
                    setFormData((prev) => ({ ...prev, [field]: merged }));
                  }}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary/40 outline-none resize-y text-sm font-mono"
                  placeholder={`Paste or type items here. Each new line becomes a separate bullet point.\n\nExample:\nStrong communication skills\nProficiency in Microsoft Office\nTeam player with attention to detail`}
                />
                <p className="text-xs text-muted-foreground -mt-1">
                  💡 Tip: Paste from Word/Email — each line auto-converts to a bullet point.
                </p>

                {/* Live preview of parsed items */}
                {items.length > 0 && (
                  <div className="bg-secondary/30 rounded-lg p-3 space-y-1.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preview ({items.length} items)</span>
                    </div>
                    {items.map((val, idx) => (
                      <div key={idx} className="flex items-start gap-2 group">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                        <span className="flex-1 text-sm text-foreground">{val}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const allLines = [...(formData[field] || [])];
                            // Find the actual index in the raw array (including empty lines)
                            let realIdx = -1;
                            let count = 0;
                            for (let i = 0; i < allLines.length; i++) {
                              if (allLines[i].trim() !== "") {
                                if (count === idx) { realIdx = i; break; }
                                count++;
                              }
                            }
                            if (realIdx >= 0) {
                              allLines.splice(realIdx, 1);
                              setFormData((prev) => ({ ...prev, [field]: allLines }));
                            }
                          }}
                          className="p-1 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })}

        {/* Custom Form Builder */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-lg font-semibold">Custom Questions (Form Builder)</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addCustomQuestion}
              className="text-primary border-primary/20 hover:bg-primary/10"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Question
            </Button>
          </div>
          
          <div className="space-y-6">
            {formData.customQuestions?.map((q, qIndex) => (
              <div key={qIndex} className="p-4 bg-secondary/30 border border-border rounded-lg space-y-4 relative group">
                <button
                  type="button"
                  onClick={() => removeCustomQuestion(qIndex)}
                  className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="grid md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Question Label *</label>
                    <input
                      type="text"
                      value={q.label}
                      onChange={(e) => handleCustomQuestionChange(qIndex, "label", e.target.value)}
                      required
                      placeholder="e.g. Do you have a Pen Tab?"
                      className="w-full px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary/40 outline-none"
                    />
                  </div>
                  
                  <div className="md:col-span-4 space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Answer Type</label>
                    <select
                      value={q.type}
                      onChange={(e) => handleCustomQuestionChange(qIndex, "type", e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-primary/40 outline-none"
                    >
                      <option value="text">Short Text</option>
                      <option value="textarea">Paragraph</option>
                      <option value="select">Dropdown (Single)</option>
                      <option value="radio">Radio Buttons (Single)</option>
                      <option value="checkbox">Checkboxes (Multiple)</option>
                      <option value="url">URL Link (e.g. Video Link)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2 flex flex-col justify-end">
                    <label className="flex items-center gap-2 cursor-pointer h-10 px-3 bg-background border border-border rounded-md hover:bg-secondary/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={q.required}
                        onChange={(e) => handleCustomQuestionChange(qIndex, "required", e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium">Required</span>
                    </label>
                  </div>
                </div>

                {/* Options Builder for Select/Radio/Checkbox */}
                {["select", "radio", "checkbox"].includes(q.type) && (
                  <div className="pl-4 border-l-2 border-primary/20 space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Options</label>
                    {(q.options || []).map((opt, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleCustomQuestionOptionChange(qIndex, optIndex, e.target.value)}
                          placeholder={`Option ${optIndex + 1}`}
                          className="flex-1 px-3 py-1.5 rounded-md border border-border bg-background text-sm focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const opts = [...(q.options || [])];
                            opts.splice(optIndex, 1);
                            handleCustomQuestionChange(qIndex, "options", opts);
                          }}
                          className="p-1.5 text-muted-foreground hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const opts = [...(q.options || [])];
                        opts.push("");
                        handleCustomQuestionChange(qIndex, "options", opts);
                      }}
                      className="text-xs text-primary hover:text-primary hover:bg-primary/10 mt-1"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Option
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {formData.customQuestions?.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4 bg-secondary/20 rounded-lg border border-dashed border-border">
                No custom questions added yet. Click "Add Question" to build dynamic forms.
              </p>
            )}
          </div>
        </section>

      </form>
    </div>
  );
}
