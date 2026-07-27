import type { JobOpening } from "../../admin/lib/types";
import { Button } from "@/components/ui/button";
import {
  X,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  Star,
  ChevronRight,
} from "lucide-react";

const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  SGD: "S$",
};

interface JobDetailModalProps {
  job: JobOpening;
  onClose: () => void;
  onApply: () => void;
}

export default function JobDetailModal({ job, onClose, onApply }: JobDetailModalProps) {
  const DEPT_COLORS: Record<string, string> = {
    "ai-data": "#7c3aed",
    "content-services": "#0d9488",
    operations: "#ea580c",
    marketing: "#2563eb",
    technology: "#059669",
    hr: "#d946ef",
    other: "#64748b",
  };

  const deptColor = DEPT_COLORS[job.department] || "#6BCB77";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative flex flex-col max-h-[92vh] overflow-hidden">

        {/* Header */}
        <div className="relative shrink-0 overflow-hidden">
          {/* Gradient banner */}
          <div
            className="h-28 sm:h-32"
            style={{ background: `linear-gradient(135deg, ${deptColor}, ${deptColor}dd, ${deptColor}99)` }}
          />
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Job title card */}
          <div className="relative -mt-12 mx-4 sm:mx-6 bg-white rounded-xl shadow-lg border border-slate-100 p-5 sm:p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white"
                style={{ backgroundColor: deptColor }}
              >
                {job.departmentLabel}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full capitalize">
                {job.employmentType.replace("-", " ")}
              </span>
              {job.experienceRange && (
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                  {job.experienceRange}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-tight">
              {job.title}
            </h2>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {job.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 capitalize" /> {job.employmentType.replace("-", " ")}
              </div>
              {job.salaryRange && (
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold">{CURRENCY_SYMBOLS[job.salaryCurrency] || "₹"}</span> {job.salaryRange}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-6 space-y-8">

          {/* Description */}
          {job.description && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5" style={{ color: deptColor }} />
                About This Role
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>
          )}

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: deptColor }} />
                Key Responsibilities
              </h3>
              <ul className="space-y-2.5">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-600">
                    <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: deptColor }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5" style={{ color: deptColor }} />
                Requirements
              </h3>
              <ul className="space-y-2.5">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-600">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ backgroundColor: deptColor }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Nice to Have */}
          {job.niceToHave && job.niceToHave.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                Nice to Have
              </h3>
              <ul className="space-y-2.5">
                {job.niceToHave.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Custom Questions Preview */}
          {job.customQuestions && job.customQuestions.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-sm text-slate-500 font-medium">
                📋 This application includes {job.customQuestions.length} additional question{job.customQuestions.length > 1 ? "s" : ""} that you'll be asked to answer.
              </p>
            </div>
          )}
        </div>

        {/* Footer — Apply CTA */}
        <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:justify-between">
            <p className="text-sm text-slate-500 text-center sm:text-left">
              Ready to join our team? Submit your application now.
            </p>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 sm:flex-none border-slate-200"
              >
                Close
              </Button>
              <Button
                onClick={onApply}
                className="flex-1 sm:flex-none text-white shadow-lg min-w-[160px]"
                style={{ backgroundColor: deptColor }}
              >
                Apply Now →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
