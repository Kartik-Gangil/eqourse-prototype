/**
 * eQOURSE ChatWidget — Full AI-Powered Chatbot UI
 *
 * Features:
 * - Floating chat icon on every page (bottom-right)
 * - AI-powered responses via Gemini (through backend proxy; system prompt lives server-side)
 * - Session memory — remembers previous questions
 * - Contact Us and Free Pilot form submission directly from chat (with cancel/edit at any step)
 * - Page-context awareness — the bot knows which page the visitor is browsing
 * - Follow-up suggestion chips parsed from the model reply
 * - Internal eqourse.com links navigate in-app (no full page reload)
 * - Quick action buttons for common tasks
 * - Markdown rendering for rich bot responses
 * - Mobile and desktop optimized
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MessageCircle, X, Send, RotateCcw, Minus, Sun, Moon } from "lucide-react";
import {
  type ChatMessage,
  sendChatMessage,
  loadSession,
  saveSession,
  clearSession,
  generateId,
} from "./chatbotApi";
import {
  type FormState,
  type FormType,
  createFormState,
  getCurrentField,
  processFormInput,
  submitForm,
} from "./chatbotForms";
import "./ChatWidget.css";

// ─── Simple Markdown Parser ──────────────────────────────────────────────────
// Converts basic markdown (bold, links, bullets) to HTML — no external deps

const SITE_ORIGIN_PATTERN = /^https?:\/\/(www\.)?eqourse\.com/i;

/**
 * Render a link. eqourse.com URLs become in-app links (marked with
 * data-internal so the click handler can route them through React Router);
 * external URLs open in a new tab.
 */
function renderLink(label: string, url: string): string {
  if (SITE_ORIGIN_PATTERN.test(url)) {
    const path = url.replace(SITE_ORIGIN_PATTERN, "") || "/";
    return `<a href="${path}" data-internal="true">${label}</a>`;
  }
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function parseMarkdown(text: string): string {
  let html = text
    // Escape HTML first
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Bold: **text**
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Italic: *text*
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (_m, label, url) =>
      renderLink(label, url)
    )
    // Bare URLs
    .replace(/(^|[^"'])(https?:\/\/[^\s<]+)/g, (_m, pre, url) =>
      pre + renderLink(url, url)
    )
    // Line breaks
    .replace(/\n/g, "<br />");

  // Bullet points: lines starting with • or -
  html = html.replace(
    /(?:<br \/>)?(•|-)\s+(.+?)(?=<br \/>|$)/g,
    "<li>$2</li>"
  );
  if (html.includes("<li>")) {
    html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
    // Clean up any stray <br /> inside lists
    html = html.replace(/<ul><br \/>/g, "<ul>");
  }

  return html;
}

// ─── Reply post-processing ───────────────────────────────────────────────────

/**
 * The model ends normal replies with a "SUGGESTIONS: q1 | q2 | q3" line.
 * Strip it from the visible text and return the parsed follow-up chips.
 */
function extractSuggestions(raw: string): { text: string; suggestions: string[] } {
  const match = raw.match(/(?:^|\n)\s*SUGGESTIONS:\s*(.+?)\s*$/i);
  if (!match || match.index === undefined) {
    return { text: raw.trim(), suggestions: [] };
  }
  const suggestions = match[1]
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
  return { text: raw.slice(0, match.index).trim(), suggestions };
}

/**
 * Detect a form trigger. The model is instructed to reply with EXACTLY
 * "TRIGGER_FORM:contact" / "TRIGGER_FORM:pilot" and nothing else, so only a
 * reply that STARTS with the trigger counts — a trigger string merely quoted
 * mid-sentence (e.g. user asked the bot to echo it) must not fire a form.
 */
function parseFormTrigger(raw: string): FormType {
  const cleaned = raw.trim().replace(/^`+|`+$/g, "").trim();
  if (/^TRIGGER_FORM:contact\b/.test(cleaned)) return "contact";
  if (/^TRIGGER_FORM:pilot\b/.test(cleaned)) return "pilot";
  return null;
}

/** Words that exit a form flow at any step. */
const CANCEL_WORDS = ["cancel", "stop", "exit", "quit", "nevermind", "never mind"];

// ─── Welcome Message ─────────────────────────────────────────────────────────

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "model",
  text: "Hi! 👋 I'm the **eQOURSE Assistant**. I can help you learn about our Content Services, AI Data Services, or get you started with a **free pilot project**.\n\nWhat can I help you with today?",
  timestamp: Date.now(),
};

// ─── Component ───────────────────────────────────────────────────────────────

const ChatWidget = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Fun, professional quotes while thinking
  const thinkingQuotes = [
    "Analyzing your request...",
    "Gathering the best information...",
    "Just a sec, thinking buddy...",
    "Crafting the perfect response...",
    "Connecting the dots...",
    "Finding the exact details for you..."
  ];
  const [thinkingQuote, setThinkingQuote] = useState(thinkingQuotes[0]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setThinkingQuote(thinkingQuotes[Math.floor(Math.random() * thinkingQuotes.length)]);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Form state
  const [formState, setFormState] = useState<FormState | null>(null);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Load session on mount ──
  useEffect(() => {
    const saved = loadSession();
    if (saved.length > 0) {
      setMessages(saved);
      setHasInteracted(true);
    }
  }, []);

  // ── Show tooltip after 3 seconds if user hasn't interacted ──
  useEffect(() => {
    if (hasInteracted) return;
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 10000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [hasInteracted]);

  // ── Save session whenever messages change ──
  useEffect(() => {
    if (messages.length > 0 && messages[0].id !== "welcome") {
      saveSession(messages);
    } else if (messages.length > 1) {
      saveSession(messages);
    }
  }, [messages]);

  // ── Scroll to bottom when new messages appear ──
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // ── Focus input when chat opens ──
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen, isMinimized]);

  // ── Open/Close handlers ──
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasInteracted(true);
    setShowTooltip(false);

    if (messages.length === 0) {
      setMessages([WELCOME_MESSAGE]);
    }
  }, [messages.length]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const handleMinimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const handleNewChat = useCallback(() => {
    clearSession();
    setMessages([{ ...WELCOME_MESSAGE, id: generateId(), timestamp: Date.now() }]);
    setFormState(null);
    setAwaitingConfirmation(false);
    setInputValue("");
  }, []);

  // ── Add a bot message ──
  const addBotMessage = useCallback((text: string, suggestions?: string[]) => {
    const msg: ChatMessage = {
      id: generateId(),
      role: "model",
      text,
      timestamp: Date.now(),
      ...(suggestions && suggestions.length > 0 ? { suggestions } : {}),
    };
    setMessages((prev) => [...prev, msg]);
  }, []);

  // ── Start a form flow ──
  const startForm = useCallback(
    (type: FormType) => {
      if (!type) return;
      const state = createFormState(type);
      setFormState(state);
      setAwaitingConfirmation(false);

      const formName = type === "contact" ? "Contact Us" : "Free Pilot";
      const firstField = getCurrentField(state);

      addBotMessage(
        `Great! Let me help you submit a **${formName}** request. I'll ask you a few questions — you can type **"cancel"** at any time to exit.\n\n${firstField?.question || ""}`
      );
    },
    [addBotMessage]
  );

  // ── Handle form input ──
  const handleFormInput = useCallback(
    async (input: string) => {
      if (!formState) return;

      const lower = input.toLowerCase().trim();

      // Global escape hatch — works at any step of the flow
      if (CANCEL_WORDS.includes(lower)) {
        setFormState(null);
        setAwaitingConfirmation(false);
        addBotMessage(
          "No problem — I've cancelled that request. Feel free to ask me anything else, or we can restart it whenever you're ready. 🙂"
        );
        return;
      }

      // Handle confirmation step
      if (awaitingConfirmation) {
        if (["yes", "y", "confirm", "submit", "ok", "okay", "sure"].includes(lower)) {
          setIsLoading(true);
          addBotMessage("Submitting your request... ⏳");

          const result = await submitForm(formState);

          setIsLoading(false);
          setFormState(null);
          setAwaitingConfirmation(false);

          if (result.ok) {
            addBotMessage(
              formState.formType === "contact"
                ? "✅ Your inquiry has been submitted successfully! Our team will get back to you within 24 hours. Is there anything else I can help with?"
                : "✅ Your Free Pilot request has been submitted! Our team will review it and get back to you within 2 business days. Is there anything else I can help with?"
            );
          } else {
            const errorMessage = "error" in result ? result.error : "Unknown error";
            addBotMessage(
              `❌ Sorry, there was an issue submitting your request: ${errorMessage}\n\nYou can try again or contact us directly at **info@eqourse.com** or call **+91-92144-45870**.`
            );
          }
          return;
        }

        if (lower === "edit" || lower === "restart") {
          const type = formState.formType;
          const fresh = createFormState(type);
          setFormState(fresh);
          setAwaitingConfirmation(false);
          addBotMessage(
            `Sure — let's re-enter your details.\n\n${getCurrentField(fresh)?.question || ""}`
          );
          return;
        }

        if (lower === "no") {
          setFormState(null);
          setAwaitingConfirmation(false);
          addBotMessage(
            "No problem! Your request has been cancelled. Would you like to start over or ask me something else?"
          );
          return;
        }

        // Anything else at the confirmation step — re-prompt instead of
        // silently dropping the input (previous behavior).
        addBotMessage(
          'Please type **"yes"** to submit, **"edit"** to re-enter your details, or **"cancel"** to discard the request.'
        );
        return;
      }

      // Process form input
      const result = processFormInput(formState, input);

      if (result.error) {
        addBotMessage(`⚠️ ${result.error} Please try again.`);
        return;
      }

      setFormState(result.updatedState);

      if (result.summary) {
        // All fields collected — show summary and ask for confirmation
        setAwaitingConfirmation(true);
        addBotMessage(result.summary);
      } else if (result.nextQuestion) {
        addBotMessage(result.nextQuestion);
      }
    },
    [formState, awaitingConfirmation, addBotMessage]
  );

  // ── Send any user text (typed input or suggestion chip) ──
  const submitUserText = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || isLoading) return;

      // Add user message
      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        text,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // If we're in a form flow, handle form input
      if (formState) {
        handleFormInput(text);
        return;
      }

      // Keyword shortcut for unmistakable form intent. Informational
      // questions ("how does the free pilot work?") must NOT trigger a form —
      // they go to the AI, which answers and offers to start the form.
      const lower = text.toLowerCase();
      const isInformational =
        /^(what|how|why|when|where|who|which|does|do|is|are|tell me|explain)\b/.test(lower) ||
        lower.endsWith("?");
      if (!isInformational) {
        const wantsAction = /\b(want|like|need|please|start|request|book|sign|begin|apply|submit|send|fill)\b/.test(lower);
        if (wantsAction && /\b(contact|reach out|get in touch|inquiry|talk to)\b/.test(lower)) {
          startForm("contact");
          return;
        }
        if (wantsAction && /\b(pilot|free trial)\b/.test(lower)) {
          startForm("pilot");
          return;
        }
      }

      // Regular AI chat
      setIsLoading(true);
      try {
        // Send with conversation history + current page for context
        const reply = await sendChatMessage(text, messages, location.pathname);

        // Check if AI decided to trigger a form flow
        const trigger = parseFormTrigger(reply);
        if (trigger) {
          startForm(trigger);
          return;
        }

        const { text: replyText, suggestions } = extractSuggestions(reply);
        addBotMessage(replyText || reply.trim(), suggestions);
      } catch {
        addBotMessage(
          "I'm having trouble right now. Please try again, or contact us at **info@eqourse.com**."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, formState, handleFormInput, startForm, addBotMessage, location.pathname]
  );

  // ── Send message from the input box ──
  const handleSend = useCallback(() => {
    const text = inputValue;
    setInputValue("");
    submitUserText(text);
  }, [inputValue, submitUserText]);

  // ── Quick action handlers ──
  const handleQuickAction = useCallback(
    (action: string) => {
      switch (action) {
        case "contact":
          setMessages((prev) => [
            ...prev,
            { id: generateId(), role: "user", text: "I'd like to contact you", timestamp: Date.now() },
          ]);
          startForm("contact");
          break;
        case "pilot":
          setMessages((prev) => [
            ...prev,
            { id: generateId(), role: "user", text: "I'd like to request a free pilot", timestamp: Date.now() },
          ]);
          startForm("pilot");
          break;
        case "services":
          setMessages((prev) => [
            ...prev,
            { id: generateId(), role: "user", text: "Tell me about your services", timestamp: Date.now() },
          ]);
          setIsLoading(true);
          sendChatMessage("Give me an overview of all your services with links to each", [], location.pathname).then(
            (reply) => {
              const { text: replyText, suggestions } = extractSuggestions(reply);
              addBotMessage(replyText || reply.trim(), suggestions);
              setIsLoading(false);
            }
          );
          break;
        case "faq":
          setMessages((prev) => [
            ...prev,
            { id: generateId(), role: "user", text: "Show me FAQs", timestamp: Date.now() },
          ]);
          setIsLoading(true);
          sendChatMessage("What are the most common questions people ask? Give me the top 5 with brief answers.", [], location.pathname).then(
            (reply) => {
              const { text: replyText, suggestions } = extractSuggestions(reply);
              addBotMessage(replyText || reply.trim(), suggestions);
              setIsLoading(false);
            }
          );
          break;
      }
    },
    [startForm, addBotMessage, location.pathname]
  );

  // ── In-app navigation for internal links inside bot messages ──
  const handleMessagesClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (anchor && anchor.dataset.internal === "true") {
        e.preventDefault();
        navigate(anchor.getAttribute("href") || "/");
      }
    },
    [navigate]
  );

  // ── Render ──
  const showQuickActions = messages.length <= 1;
  const lastMessage = messages[messages.length - 1];
  const showSuggestions =
    !isLoading &&
    !formState &&
    lastMessage?.role === "model" &&
    (lastMessage.suggestions?.length ?? 0) > 0;

  return (
    <div className={`eqourse-chatbot-container ${isDark ? "dark" : ""}`}>
      {/* Floating Toggle Button */}
      <button
        className="eqourse-chatbot-toggle"
        data-open={isOpen ? "true" : "false"}
        onClick={isOpen ? handleClose : handleOpen}
        aria-label={isOpen ? "Close chat" : "Open eQOURSE Assistant"}
        title={isOpen ? "Close chat" : "Chat with us"}
      >
        {isOpen ? <X /> : <MessageCircle />}
        {!isOpen && !hasInteracted && <span className="chatbot-badge" />}
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div className={`eqourse-chatbot-tooltip ${showTooltip ? "visible" : ""}`}>
          💬 Ask us anything!
        </div>
      )}

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="eqourse-chatbot-window" role="dialog" aria-label="eQOURSE Chat Assistant">
          {/* Header */}
          <div className="eqourse-chatbot-header">
            <div className="eqourse-chatbot-avatar"><video src="/aiavtar-new.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="eqourse-chatbot-header-info">
              <div className="eqourse-chatbot-header-title">eQOURSE Assistant</div>
              <div className="eqourse-chatbot-header-status">Online</div>
            </div>
            <div className="eqourse-chatbot-header-actions">
              <button
                className="eqourse-chatbot-header-btn"
                onClick={() => setIsDark(!isDark)}
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <button
                className="eqourse-chatbot-header-btn"
                onClick={handleNewChat}
                aria-label="New chat"
                title="New chat"
              >
                <RotateCcw size={15} />
              </button>
              <button
                className="eqourse-chatbot-header-btn"
                onClick={handleMinimize}
                aria-label="Minimize"
                title="Minimize"
              >
                <Minus size={15} />
              </button>
              <button
                className="eqourse-chatbot-header-btn"
                onClick={handleClose}
                aria-label="Close chat"
                title="Close"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="eqourse-chatbot-messages" onClick={handleMessagesClick}>
            {messages.map((msg) => (
              <div key={msg.id} className={`eqourse-chat-msg ${msg.role === "user" ? "user" : "bot"}`}>
                <div className="eqourse-chat-msg-avatar">
                  {msg.role === "user" ? "You" : <video src="/aiavtar-new.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div
                  className="eqourse-chat-msg-bubble"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }}
                />
              </div>
            ))}

            {/* Quick Actions — shown after welcome */}
            {showQuickActions && (
              <div className="eqourse-chatbot-quick-actions">
                <button className="eqourse-chatbot-quick-btn" onClick={() => handleQuickAction("contact")}>
                  📞 Contact Us
                </button>
                <button className="eqourse-chatbot-quick-btn" onClick={() => handleQuickAction("pilot")}>
                  🚀 Free Pilot
                </button>
                <button className="eqourse-chatbot-quick-btn" onClick={() => handleQuickAction("services")}>
                  📋 Our Services
                </button>
                <button className="eqourse-chatbot-quick-btn" onClick={() => handleQuickAction("faq")}>
                  ❓ FAQs
                </button>
              </div>
            )}

            {/* Follow-up suggestion chips — parsed from the latest bot reply */}
            {showSuggestions && (
              <div className="eqourse-chatbot-suggestions">
                {lastMessage.suggestions!.map((s) => (
                  <button
                    key={s}
                    className="eqourse-chatbot-suggestion-btn"
                    onClick={() => submitUserText(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Thinking Indicator */}
            {isLoading && (
              <div className="eqourse-chatbot-thinking">
                <div className="eqourse-chat-msg-avatar">
                  <video src="/aiavtar-new.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="eqourse-chatbot-thinking-bubble">
                  {thinkingQuote}
                  <div className="eqourse-chatbot-thinking-dots">
                    <span className="eqourse-chatbot-typing-dot" />
                    <span className="eqourse-chatbot-typing-dot" />
                    <span className="eqourse-chatbot-typing-dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="eqourse-chatbot-input-area">
            <input
              ref={inputRef}
              className="eqourse-chatbot-input"
              type="text"
              placeholder={formState ? "Type your answer..." : "Type a message..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isLoading}
              aria-label="Chat message input"
            />
            <button
              className="eqourse-chatbot-send-btn"
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>

          {/* Footer */}
          <div className="eqourse-chatbot-footer">
            Powered by eQOURSE AI
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
