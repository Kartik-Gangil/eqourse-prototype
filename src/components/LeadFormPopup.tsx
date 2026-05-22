import { useState, useEffect } from "react";
import { X, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitContactForm } from "@/lib/publicApi";

const roles = [
  "SME",
  "Vendor",
  "CXO / Co-founder",
  "School / Institution",
  "AI Data Client",
];

const LeadFormPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
  });

  useEffect(() => {
    // Show popup after 15 seconds, once per session
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("leadFormDismissed");
      if (!dismissed) setIsOpen(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("leadFormDismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.role) return;

    setStatus("loading");

    const result = await submitContactForm({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      subject: formData.role,       // "role" maps to required "subject" in DB schema
      message: formData.message.trim() || undefined,
      source: "popup",              // tag so admin can filter popup leads
    });

    if (result.ok) {
      setStatus("success");
      setTimeout(handleClose, 2500);
    } else {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-elevated border border-border/50 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-primary p-6 text-center relative">
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
          >
            <X className="w-4 h-4 text-primary-foreground" />
          </button>
          <h3 className="font-heading text-xl font-bold text-primary-foreground">
            Let's Connect
          </h3>
          <p className="text-primary-foreground/80 text-sm mt-1">
            Tell us about your project
          </p>
        </div>

        {/* Body */}
        {status === "success" ? (
          /* ── Success state ── */
          <div className="p-12 text-center flex flex-col items-center gap-3">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
            <p className="font-semibold text-foreground text-lg">Thank you!</p>
            <p className="text-sm text-muted-foreground">
              We've received your message and will be in touch soon.
            </p>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
            <Input
              id="popup-name"
              required
              placeholder="Your Name *"
              className="bg-background border-border"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              id="popup-email"
              type="email"
              required
              placeholder="Email Address *"
              className="bg-background border-border"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              id="popup-phone"
              type="tel"
              placeholder="Phone Number"
              className="bg-background border-border"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <Select
              required
              value={formData.role}
              onValueChange={(val) => setFormData({ ...formData, role: val })}
            >
              <SelectTrigger id="popup-role" className="bg-background border-border">
                <SelectValue placeholder="Select your role *" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              id="popup-message"
              placeholder="Your message (optional)…"
              className="bg-background border-border min-h-[80px]"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />

            {status === "error" && (
              <p className="text-destructive text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Something went wrong. Please try again.
              </p>
            )}

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-primary border-0 text-primary-foreground shadow-soft hover:opacity-90 transition-all"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Submit <Send className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LeadFormPopup;
