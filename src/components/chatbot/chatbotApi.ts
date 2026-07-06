/**
 * Chatbot API Client
 *
 * Handles communication with the backend /api/chat proxy endpoint.
 * Maintains conversation history for session memory.
 *
 * NOTE: The system prompt / knowledge base lives on the BACKEND
 * (eqourse-backend/src/utils/chatbotKnowledge.js) so it cannot be tampered
 * with from the browser. The frontend only sends the message, recent history,
 * and the pathname the visitor is currently browsing.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: number;
  /** Follow-up question chips parsed from the model reply (bot messages only) */
  suggestions?: string[];
}

// ─── API Base URL ────────────────────────────────────────────────────────────

function getApiBaseUrl(): string {
  // In development, always use relative path to route through Vite's proxy
  // This ensures ngrok and other tunnels work correctly for remote testing.
  if (import.meta.env.DEV) {
    return "";
  }

  // In production, use VITE_API_BASE_URL if set
  const envUrl = import.meta.env.VITE_API_BASE_URL as string;
  if (envUrl && envUrl.trim() !== "") return envUrl.trim();
  return "";
}

// ─── Session Management ──────────────────────────────────────────────────────

const SESSION_KEY = "eqourse_chat_history";

export function loadSession(): ChatMessage[] {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveSession(messages: ChatMessage[]): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
  } catch {
    // sessionStorage full or unavailable — silently ignore
  }
}

export function clearSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

// ─── Unique ID Generator ────────────────────────────────────────────────────

let _counter = 0;
export function generateId(): string {
  return `msg_${Date.now()}_${++_counter}`;
}

// ─── Send Message ────────────────────────────────────────────────────────────

/** Only the most recent turns are sent — the backend enforces the same cap. */
const HISTORY_MAX_TURNS = 20;

/**
 * Send a message to the chatbot and get a response.
 *
 * @param userMessage The user's text message
 * @param history Previous conversation messages (for context)
 * @param pageContext Pathname the visitor is currently on (e.g. "/free-pilot")
 * @returns The AI's reply text
 */
export async function sendChatMessage(
  userMessage: string,
  history: ChatMessage[],
  pageContext?: string
): Promise<string> {
  const apiBase = getApiBaseUrl();

  // Build history for the API (only send role + text, most recent turns only)
  const apiHistory = history.slice(-HISTORY_MAX_TURNS).map((m) => ({
    role: m.role,
    text: m.text,
  }));

  try {
    const res = await fetch(`${apiBase}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        message: userMessage,
        history: apiHistory,
        pageContext,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return (
        (body as { reply?: string }).reply ||
        "I'm having trouble connecting right now. Please try again in a moment, or contact us at info@eqourse.com."
      );
    }

    const data = await res.json();
    return (
      data.reply ||
      "I apologize, but I couldn't generate a response. Please try rephrasing your question."
    );
  } catch {
    return "I'm unable to connect right now. You can reach us directly at info@eqourse.com or call +91-92144-45870.";
  }
}
