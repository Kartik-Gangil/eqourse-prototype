import { useState } from "react";
import type { JobOpening } from "../../admin/lib/types";
import { Button } from "@/components/ui/button";
import { X, Upload, Link as LinkIcon, Loader2, CheckCircle2 } from "lucide-react";

interface JobApplicationFormProps {
  job: JobOpening;
  onClose: () => void;
}

export default function JobApplicationForm({ job, onClose }: JobApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receiptId, setReceiptId] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    currentRole: "",
    qualification: "",
    portfolioLink: "",
    resumeDriveLink: "",
    coverLetter: "",
    skills: "",
  });
  const [customAnswers, setCustomAnswers] = useState<Record<number, any>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeMode, setResumeMode] = useState<"file" | "link">("file");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setResumeFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.qualification) {
      setError("Please fill all required fields.");
      return;
    }
    if (resumeMode === "file" && !resumeFile) {
      setError("Please upload your resume or provide a drive link.");
      return;
    }
    if (resumeMode === "link" && !formData.resumeDriveLink) {
      setError("Please provide a valid Google Drive link to your resume.");
      return;
    }

    setLoading(true);
    setError(null);

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });
    if (resumeMode === "file" && resumeFile) {
      fd.append("resume", resumeFile);
    } else if (resumeMode === "link") {
      fd.append("resumeDriveLink", formData.resumeDriveLink);
    }

    const formattedCustomAnswers = (job.customQuestions || []).map((q, idx) => ({
      questionLabel: q.label,
      answerValue: customAnswers[idx] || (q.type === "checkbox" ? [] : "")
    }));
    fd.append("customAnswers", JSON.stringify(formattedCustomAnswers));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/careers/${job.id}/apply`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      
      if (data.success) {
        setSuccess(true);
        setReceiptId(data.data.receiptId);
      } else {
        setError(data.message || "Failed to submit application.");
      }
    } catch (err) {
      setError("A network error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl my-auto relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Apply for {job.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{job.departmentLabel} • {job.location}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="overflow-y-auto p-6">
          {success ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Thank you for applying to eQOURSE. We've sent a confirmation email to <strong>{formData.email}</strong>.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 inline-block mt-4">
                <p className="text-sm text-slate-500 mb-1">Your Receipt ID</p>
                <p className="font-mono font-bold text-lg text-slate-900">{receiptId}</p>
              </div>
              <div className="pt-6">
                <Button onClick={onClose} className="bg-[#6BCB77] hover:bg-[#5bb865]">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form id="apply-form" onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Highest Qualification *</label>
                  <input
                    type="text"
                    name="qualification"
                    required
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all"
                    placeholder="e.g. B.Tech in Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Total Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all"
                    placeholder="e.g. 3 Years"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Current Role</label>
                  <input
                    type="text"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all"
                    placeholder="e.g. Software Engineer at XYZ"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Key Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all"
                  placeholder="e.g. Python, React, Machine Learning"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Portfolio / LinkedIn URL</label>
                <input
                  type="url"
                  name="portfolioLink"
                  value={formData.portfolioLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              {/* Resume Section */}
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">Resume *</label>
                  <div className="flex bg-white rounded-lg p-1 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setResumeMode("file")}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${resumeMode === "file" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setResumeMode("link")}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${resumeMode === "link" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      Drive Link
                    </button>
                  </div>
                </div>

                {resumeMode === "file" ? (
                  <div className="relative group cursor-pointer border-2 border-dashed border-slate-300 rounded-lg hover:border-[#6BCB77] hover:bg-[#6BCB77]/5 transition-colors p-6 text-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-[#6BCB77]" />
                    <p className="text-sm font-medium text-slate-700">
                      {resumeFile ? resumeFile.name : "Click or drag file to upload"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PDF or DOCX (Max 5MB)</p>
                  </div>
                ) : (
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="url"
                      name="resumeDriveLink"
                      value={formData.resumeDriveLink}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all"
                      placeholder="https://drive.google.com/file/d/..."
                    />
                    <p className="text-xs text-slate-500 mt-2">Make sure the link is set to "Anyone with the link can view".</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Cover Letter (Optional)</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all resize-y"
                  placeholder="Tell us why you're a great fit for this role..."
                />
              </div>

              {/* Dynamic Custom Questions */}
              {job.customQuestions && job.customQuestions.length > 0 && (
                <div className="pt-6 border-t border-slate-100 space-y-5">
                  <h3 className="text-lg font-bold text-slate-900">Additional Information</h3>
                  
                  {job.customQuestions.map((q, idx) => {
                    const value = customAnswers[idx] || (q.type === 'checkbox' ? [] : "");
                    
                    const handleCustomChange = (val: any) => {
                      setCustomAnswers(prev => ({ ...prev, [idx]: val }));
                    };

                    return (
                      <div key={idx} className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">
                          {q.label} {q.required && "*"}
                        </label>
                        
                        {q.type === 'text' && (
                          <input
                            type="text"
                            required={q.required}
                            value={value}
                            onChange={(e) => handleCustomChange(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all"
                          />
                        )}

                        {q.type === 'textarea' && (
                          <textarea
                            required={q.required}
                            value={value}
                            onChange={(e) => handleCustomChange(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all resize-y"
                          />
                        )}

                        {q.type === 'url' && (
                          <input
                            type="url"
                            required={q.required}
                            value={value}
                            onChange={(e) => handleCustomChange(e.target.value)}
                            placeholder="https://"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all"
                          />
                        )}

                        {q.type === 'select' && (
                          <select
                            required={q.required}
                            value={value}
                            onChange={(e) => handleCustomChange(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#6BCB77]/40 focus:border-[#6BCB77] outline-none transition-all"
                          >
                            <option value="">Select an option...</option>
                            {q.options?.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        )}

                        {q.type === 'radio' && (
                          <div className="space-y-2">
                            {q.options?.map(opt => (
                              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`custom_${idx}`}
                                  required={q.required && !value}
                                  checked={value === opt}
                                  onChange={() => handleCustomChange(opt)}
                                  className="text-[#6BCB77] focus:ring-[#6BCB77]"
                                />
                                <span className="text-sm text-slate-700">{opt}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {q.type === 'checkbox' && (
                          <div className="space-y-2">
                            {q.options?.map(opt => {
                              const checked = Array.isArray(value) && value.includes(opt);
                              return (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => {
                                      const arr = Array.isArray(value) ? [...value] : [];
                                      if (e.target.checked) arr.push(opt);
                                      else {
                                        const i = arr.indexOf(opt);
                                        if (i > -1) arr.splice(i, 1);
                                      }
                                      handleCustomChange(arr);
                                    }}
                                    className="text-[#6BCB77] rounded focus:ring-[#6BCB77]"
                                  />
                                  <span className="text-sm text-slate-700">{opt}</span>
                                </label>
                              );
                            })}
                            {/* Hidden input to enforce required on checkboxes (at least one) */}
                            {q.required && (!value || value.length === 0) && (
                              <input type="checkbox" required className="opacity-0 absolute -z-10" />
                            )}
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}

            </form>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 bg-slate-50/50 rounded-b-2xl">
            <Button variant="ghost" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" form="apply-form" disabled={loading} className="bg-[#6BCB77] hover:bg-[#5bb865] text-white min-w-[120px]">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Application"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
