import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { adminApi } from "../lib/api";
import type { JobOpening, JobApplication, ApplicationStatus } from "../lib/types";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Loader2,
  Search,
  Sparkles,
  ExternalLink,
  Download,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Clock,
  ThumbsUp,
  XCircle,
  MoreVertical,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; bg: string; text: string; icon: any }> = {
  applied: { label: "Applied", bg: "bg-blue-100", text: "text-blue-700", icon: Clock },
  shortlisted: { label: "Shortlisted", bg: "bg-emerald-100", text: "text-emerald-700", icon: ThumbsUp },
  rejected: { label: "Rejected", bg: "bg-slate-100", text: "text-slate-600", icon: XCircle },
  hired: { label: "Hired", bg: "bg-purple-100", text: "text-purple-700", icon: CheckCircle2 },
};

export default function AdminCareerApplicants() {
  const { id } = useParams();
  const [job, setJob] = useState<JobOpening | null>(null);
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [total, setTotal] = useState(0);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [smartQuery, setSmartQuery] = useState("");
  const [isSmartMode, setIsSmartMode] = useState(false);
  
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const fetchApplicants = async (isSearch = false) => {
    if (!id) return;
    if (!isSearch) setLoading(true);
    try {
      const [jobData, appsData] = await Promise.all([
        job ? Promise.resolve(job) : adminApi.getJobOpening(id),
        adminApi.listApplications(id, {
          status: statusFilter !== "all" ? statusFilter : undefined,
          q: search || undefined,
        })
      ]);
      if (!job) setJob(jobData);
      setApps(appsData.items);
      setTotal(appsData.total);
      if (appsData.statusCounts) setStatusCounts(appsData.statusCounts);
      setIsSmartMode(false);
    } catch (err) {
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [id, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => fetchApplicants(true), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSmartFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smartQuery.trim() || !id) return;
    
    setFiltering(true);
    try {
      const res = await adminApi.smartFilterApplications(id, smartQuery);
      setApps(res.items);
      setTotal(res.total);
      setIsSmartMode(true);
      toast.success(`Found ${res.total} matching candidates`);
    } catch (err: any) {
      toast.error(err.message || "Smart filter failed");
    } finally {
      setFiltering(false);
    }
  };

  const handleClearSmartFilter = () => {
    setSmartQuery("");
    fetchApplicants();
  };

  const handleStatusChange = async (appId: string, newStatus: ApplicationStatus) => {
    try {
      await adminApi.updateApplicationStatus(appId, newStatus);
      toast.success(`Application marked as ${newStatus}`);
      fetchApplicants(true);
    } catch {
      toast.error("Failed to update status");
    }
    setActiveMenu(null);
  };

  if (loading && !job) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link to="/admin/careers" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Jobs
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Applicants: {job?.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {job?.departmentLabel} • {job?.location}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right text-sm">
              <div className="font-semibold text-xl">{total}</div>
              <div className="text-muted-foreground">Total Applicants</div>
            </div>
            {total > 0 && (
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("eqourse_admin_token");
                    const res = await fetch(
                      `${import.meta.env.VITE_API_BASE_URL || ""}/api/admin/careers/${id}/applications/export`,
                      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
                    );
                    if (!res.ok) throw new Error("Export failed");
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    // Extract filename from Content-Disposition header or use default
                    const cd = res.headers.get("Content-Disposition");
                    a.download = cd?.match(/filename="?(.+?)"?$/)?.[1] || "applicants.csv";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                    toast.success("Records downloaded successfully!");
                  } catch {
                    toast.error("Failed to download records");
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download All Records
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters & Smart Search */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        <form onSubmit={handleSmartFilter} className="flex gap-2 relative">
          <div className="relative flex-1">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <input
              type="text"
              placeholder="Ask Gemini: 'Show me candidates with React experience' or 'Who has a Master's degree?'"
              value={smartQuery}
              onChange={(e) => setSmartQuery(e.target.value)}
              className="w-full pl-9 pr-24 py-2.5 rounded-lg border border-primary/30 bg-primary/5 text-sm focus:ring-2 focus:ring-primary/40 outline-none placeholder:text-primary/60"
            />
            {isSmartMode && (
              <button
                type="button"
                onClick={handleClearSmartFilter}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
          <Button type="submit" disabled={filtering || !smartQuery.trim()} className="bg-primary text-white whitespace-nowrap">
            {filtering ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            Smart Filter
          </Button>
        </form>

        {!isSmartMode && (
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/50">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search name, email, skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-primary/40 outline-none"
              />
            </div>
            
            <div className="flex bg-muted p-1 rounded-lg">
              {["all", "applied", "shortlisted", "rejected", "hired"].map((status) => {
                const count = status === "all" 
                  ? Object.values(statusCounts).reduce((a,b)=>a+b,0) 
                  : statusCounts[status] || 0;
                
                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                      statusFilter === status ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {status} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Applicant List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : apps.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <UsersIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-1">No applicants found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          apps.map((app) => {
            const sc = STATUS_CONFIG[app.status as ApplicationStatus] || STATUS_CONFIG['applied'];
            const StatusIcon = sc.icon || Clock;
            
            return (
              <div key={app.id} className="bg-card border border-border rounded-xl p-5 relative group">
                <div className="flex flex-col md:flex-row gap-5">
                  
                  {/* Left Col: Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold">{app.fullName}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${sc.bg} ${sc.text}`}>
                            <StatusIcon className="w-3 h-3" /> {sc.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <a href={`mailto:${app.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                            <Mail className="w-3.5 h-3.5" /> {app.email}
                          </a>
                          {app.phone && (
                            <span className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5" /> {app.phone}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> Applied {app.createdAt ? format(new Date(app.createdAt), "MMM d, yyyy") : "Unknown Date"}
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Menu */}
                      <div className="relative md:hidden">
                        <Button variant="ghost" size="sm" onClick={() => setActiveMenu(activeMenu === app.id ? null : app.id)}>
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                        {/* Menu items rendered same as desktop below */}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      {app.currentRole && (
                        <div className="flex items-start gap-2">
                          <Briefcase className="w-4 h-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <span className="text-muted-foreground text-xs block">Current Role</span>
                            <span className="font-medium">{app.currentRole} {app.experience ? `(${app.experience})` : ""}</span>
                          </div>
                        </div>
                      )}
                      {app.qualification && (
                        <div className="flex items-start gap-2">
                          <GraduationCap className="w-4 h-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <span className="text-muted-foreground text-xs block">Qualification</span>
                            <span className="font-medium">{app.qualification}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {app.skills && app.skills.length > 0 && (
                      <div>
                        <span className="text-muted-foreground text-xs block mb-1.5">Skills</span>
                        <div className="flex flex-wrap gap-1.5">
                          {app.skills.map((s, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {app.customAnswers && app.customAnswers.length > 0 && (
                      <div className="pt-3 border-t border-border/50">
                        <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider block mb-2">Custom Answers</span>
                        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
                          {app.customAnswers.map((ans, idx) => {
                            if (!ans) return null;
                            const isUrl = String(ans.answerValue || '').startsWith('http');
                            return (
                              <div key={idx}>
                                <span className="text-muted-foreground text-xs block mb-0.5">{ans.questionLabel}</span>
                                {isUrl ? (
                                  <a href={String(ans.answerValue)} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                                    <ExternalLink className="w-3 h-3" /> View Link
                                  </a>
                                ) : (
                                  <span className="text-sm font-medium">
                                    {Array.isArray(ans.answerValue) ? ans.answerValue.join(", ") : String(ans.answerValue)}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Col: Links & Actions */}
                  <div className="md:w-64 flex flex-col gap-3 md:border-l md:border-border md:pl-5">
                    <div className="space-y-2">
                      <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Documents</span>
                      
                      {app.resumeFile ? (
                        <a 
                          href={app.resumeFile.url?.startsWith("/") ? `${import.meta.env.VITE_API_BASE_URL || ""}${app.resumeFile.url}` : app.resumeFile.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-2 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors text-sm"
                        >
                          <span className="truncate font-medium">{app.resumeFile.originalName}</span>
                          <Download className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
                        </a>
                      ) : app.resumeDriveLink ? (
                        <a 
                          href={app.resumeDriveLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-2 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors text-sm"
                        >
                          <span className="truncate font-medium text-blue-600">Google Drive Resume</span>
                          <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
                        </a>
                      ) : (
                        <div className="text-sm text-muted-foreground italic">No resume provided</div>
                      )}

                      {app.portfolioLink && typeof app.portfolioLink === 'string' && (
                        <a 
                          href={app.portfolioLink.startsWith('http') ? app.portfolioLink : `https://${app.portfolioLink}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center text-sm text-primary hover:underline mt-2"
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Portfolio
                        </a>
                      )}
                    </div>
                    
                    <div className="mt-auto pt-4 relative hidden md:block">
                      <Button 
                        variant="outline" 
                        className="w-full justify-between"
                        onClick={() => setActiveMenu(activeMenu === app.id ? null : app.id)}
                      >
                        Change Status <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      
                      {activeMenu === app.id && (
                        <div className="absolute right-0 bottom-full mb-1 bg-card border border-border rounded-lg shadow-lg py-1 z-20 w-44">
                          <button
                            className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 text-emerald-600"
                            onClick={() => handleStatusChange(app.id, "shortlisted")}
                          >
                            <ThumbsUp className="w-4 h-4" /> Shortlist
                          </button>
                          <button
                            className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 text-purple-600"
                            onClick={() => handleStatusChange(app.id, "hired")}
                          >
                            <CheckCircle2 className="w-4 h-4" /> Hire
                          </button>
                          <div className="h-px bg-border my-1" />
                          <button
                            className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                            onClick={() => handleStatusChange(app.id, "rejected")}
                          >
                            <XCircle className="w-4 h-4" /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
