/**
 * Chatbot Form Collection Flows
 *
 * Handles conversational collection of Contact Us and Free Pilot form data.
 * Uses the exact same API functions as the regular forms — zero backend changes.
 */

import {
  submitContactForm,
  submitFreePilotForm,
  type ContactFormData,
  type FreePilotFormData,
} from "@/lib/publicApi";

// ─── Types ───────────────────────────────────────────────────────────────────

export type FormType = "contact" | "pilot" | null;

export interface FormField {
  key: string;
  label: string;
  question: string;
  required: boolean;
  type: "text" | "email" | "phone" | "select";
  options?: string[]; // for select type
  validate?: (value: string) => string | null; // returns error message or null
}

export interface FormState {
  formType: FormType;
  currentStep: number;
  data: Record<string, string>;
  isSubmitting: boolean;
  isComplete: boolean;
}

// ─── Validators ──────────────────────────────────────────────────────────────

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(value: string): string | null {
  if (!emailRegex.test(value)) return "Please enter a valid email address.";
  return null;
}

function validateRequired(value: string): string | null {
  if (!value.trim()) return "This field is required.";
  return null;
}

// ─── Form Definitions ───────────────────────────────────────────────────────

export const contactFields: FormField[] = [
  {
    key: "name",
    label: "Name",
    question: "What's your name?",
    required: true,
    type: "text",
    validate: validateRequired,
  },
  {
    key: "email",
    label: "Email",
    question: "What's your email address?",
    required: true,
    type: "email",
    validate: validateEmail,
  },
  {
    key: "phone",
    label: "Phone",
    question: "What's your phone number? *(optional — you can type \"skip\" to skip)*",
    required: false,
    type: "phone",
  },
  {
    key: "company",
    label: "Company",
    question: "Which company or organization are you from? *(optional — type \"skip\" to skip)*",
    required: false,
    type: "text",
  },
  {
    key: "subject",
    label: "Subject",
    question: "What's the subject of your inquiry? For example: *Content Services, AI Data Services, Partnership, General Inquiry*",
    required: true,
    type: "text",
    validate: validateRequired,
  },
  {
    key: "message",
    label: "Message",
    question: "Please share your message or any specific details about your requirements:",
    required: false,
    type: "text",
  },
];

export const pilotFields: FormField[] = [
  {
    key: "name",
    label: "Name",
    question: "What's your name?",
    required: true,
    type: "text",
    validate: validateRequired,
  },
  {
    key: "email",
    label: "Email",
    question: "What's your email address?",
    required: true,
    type: "email",
    validate: validateEmail,
  },
  {
    key: "company",
    label: "Company",
    question: "Which company or organization are you from?",
    required: true,
    type: "text",
    validate: validateRequired,
  },
  {
    key: "serviceInterest",
    label: "Service Interest",
    question: "Which service are you interested in? Please choose:\n\n• **Content Services** (K-12, e-learning, curriculum, assessments)\n• **AI Data Services** (data collection, annotation, model testing)\n• **Robotics & Physical AI Training Data**\n• **Both**",
    required: true,
    type: "select",
    options: ["Content Services", "AI Data Services", "Robotics & Physical AI Training Data", "Both"],
    validate: validateRequired,
  },
  {
    key: "projectScope",
    label: "Project Scope",
    question: "Could you briefly describe your project scope or requirements?",
    required: true,
    type: "text",
    validate: validateRequired,
  },
  {
    key: "timeline",
    label: "Timeline",
    question: "Do you have a timeline in mind? *(optional — type \"skip\" to skip)*",
    required: false,
    type: "text",
  },
  {
    key: "message",
    label: "Additional Details",
    question: "Any additional details you'd like to share? *(optional — type \"skip\" to skip)*",
    required: false,
    type: "text",
  },
];

// ─── Form State Management ──────────────────────────────────────────────────

export function createFormState(formType: FormType): FormState {
  return {
    formType,
    currentStep: 0,
    data: {},
    isSubmitting: false,
    isComplete: false,
  };
}

export function getFields(formType: FormType): FormField[] {
  if (formType === "contact") return contactFields;
  if (formType === "pilot") return pilotFields;
  return [];
}

export function getCurrentField(state: FormState): FormField | null {
  const fields = getFields(state.formType);
  if (state.currentStep >= fields.length) return null;
  return fields[state.currentStep];
}

/**
 * Process user input for the current form step.
 * Returns { error, nextQuestion, summary, done }
 */
export function processFormInput(
  state: FormState,
  input: string
): {
  error: string | null;
  nextQuestion: string | null;
  summary: string | null;
  done: boolean;
  updatedState: FormState;
} {
  const fields = getFields(state.formType);
  const field = fields[state.currentStep];

  if (!field) {
    return { error: null, nextQuestion: null, summary: null, done: true, updatedState: state };
  }

  const trimmed = input.trim();

  // Handle "skip" for optional fields
  if (!field.required && trimmed.toLowerCase() === "skip") {
    const newState = {
      ...state,
      currentStep: state.currentStep + 1,
    };

    // Check if we're done
    if (newState.currentStep >= fields.length) {
      return {
        error: null,
        nextQuestion: null,
        summary: buildSummary(newState),
        done: false,
        updatedState: newState,
      };
    }

    return {
      error: null,
      nextQuestion: fields[newState.currentStep].question,
      summary: null,
      done: false,
      updatedState: newState,
    };
  }

  // Validate
  if (field.validate) {
    const validationError = field.validate(trimmed);
    if (validationError) {
      return { error: validationError, nextQuestion: null, summary: null, done: false, updatedState: state };
    }
  }

  // Store the value
  const newData = { ...state.data, [field.key]: trimmed };
  const newState = {
    ...state,
    currentStep: state.currentStep + 1,
    data: newData,
  };

  // Check if we're done collecting
  if (newState.currentStep >= fields.length) {
    return {
      error: null,
      nextQuestion: null,
      summary: buildSummary(newState),
      done: false,
      updatedState: newState,
    };
  }

  return {
    error: null,
    nextQuestion: fields[newState.currentStep].question,
    summary: null,
    done: false,
    updatedState: newState,
  };
}

function buildSummary(state: FormState): string {
  const fields = getFields(state.formType);
  const formName = state.formType === "contact" ? "Contact Us" : "Free Pilot";
  let summary = `Great! Here's a summary of your **${formName}** request:\n\n`;

  for (const field of fields) {
    const value = state.data[field.key];
    if (value) {
      summary += `• **${field.label}**: ${value}\n`;
    }
  }

  summary += `\nDoes this look correct? Type **"yes"** to submit, **"edit"** to re-enter your details, or **"cancel"** to discard.`;
  return summary;
}

// ─── Form Submission ────────────────────────────────────────────────────────

export async function submitForm(
  state: FormState
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (state.formType === "contact") {
    const contactData: ContactFormData = {
      name: state.data.name || "",
      email: state.data.email || "",
      phone: state.data.phone || undefined,
      company: state.data.company || undefined,
      subject: state.data.subject || "General Inquiry",
      message: state.data.message || undefined,
      source: "chatbot",
    };
    return submitContactForm(contactData);
  }

  if (state.formType === "pilot") {
    const interestStr = (state.data.serviceInterest || "").toLowerCase();
    const serviceInterest = interestStr.includes("ai") || interestStr.includes("data") 
      ? "ai-data" 
      : interestStr.includes("content") 
        ? "content-services" 
        : "other";

    const pilotData: FreePilotFormData = {
      name: state.data.name || "",
      email: state.data.email || "",
      company: state.data.company || "",
      serviceInterest,
      projectScope: state.data.projectScope || "",
      timeline: state.data.timeline || undefined,
      message: state.data.message || undefined,
      source: "chatbot",
    };
    return submitFreePilotForm(pilotData);
  }

  return { ok: false, error: "Invalid form type" };
}
