/**
 * eQOURSE ChatWidget — Full AI-Powered Chatbot UI
 *
 * Features:
 * - Floating chat icon on every page (bottom-right)
 * - AI-powered responses via Gemini (through backend proxy)
 * - Session memory — remembers previous questions
 * - Contact Us and Free Pilot form submission directly from chat
 * - Quick action buttons for common tasks
 * - Markdown rendering for rich bot responses
 * - Mobile and desktop optimized
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, RotateCcw, Minus } from "lucide-react";
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
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // Bare URLs
    .replace(
      /(^|[^"'])(https?:\/\/[^\s<]+)/g,
      '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>'
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

// ─── Welcome Message ─────────────────────────────────────────────────────────

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "model",
  text: "Hi! 👋 I'm the **eQOURSE Assistant**. I can help you learn about our Content Services, AI Data Services, or get you started with a **free pilot project**.\n\nWhat can I help you with today?",
  timestamp: Date.now(),
};

// ─── Component ───────────────────────────────────────────────────────────────

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

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
  const addBotMessage = useCallback((text: string) => {
    const msg: ChatMessage = {
      id: generateId(),
      role: "model",
      text,
      timestamp: Date.now(),
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
        `Great! Let me help you submit a **${formName}** request. I'll ask you a few questions.\n\n${firstField?.question || ""}`
      );
    },
    [addBotMessage]
  );

  // ── Handle form input ──
  const handleFormInput = useCallback(
    async (input: string) => {
      if (!formState) return;

      // Handle confirmation step
      if (awaitingConfirmation) {
        const lower = input.toLowerCase().trim();
        if (lower === "yes" || lower === "y" || lower === "confirm" || lower === "submit") {
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
        } else if (lower === "edit" || lower === "cancel" || lower === "no") {
          setFormState(null);
          setAwaitingConfirmation(false);
          addBotMessage(
            "No problem! Your request has been cancelled. Would you like to start over or ask me something else?"
          );
          return;
        }
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

  // ── Send message ──
  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // If we're in a form flow, handle form input
    if (formState) {
      handleFormInput(text);
      return;
    }

    // Check for form trigger intents
    const lower = text.toLowerCase();
    if (
      lower.includes("contact") &&
      (lower.includes("form") || lower.includes("submit") || lower.includes("reach") || lower.includes("inquiry") || lower.includes("send"))
    ) {
      startForm("contact");
      return;
    }
    if (
      (lower.includes("pilot") || lower.includes("free pilot") || lower.includes("free trial")) &&
      (lower.includes("request") || lower.includes("start") || lower.includes("book") || lower.includes("sign") || lower.includes("get") || lower.includes("want"))
    ) {
      startForm("pilot");
      return;
    }

    // Regular AI chat
    setIsLoading(true);
    try {
      // Send with conversation history for context
      const reply = await sendChatMessage(text, messages);
      
      // Check if AI decided to trigger a form flow
      if (reply.includes("TRIGGER_FORM:contact")) {
        startForm("contact");
        return;
      }
      if (reply.includes("TRIGGER_FORM:pilot")) {
        startForm("pilot");
        return;
      }
      
      addBotMessage(reply);
    } catch {
      addBotMessage(
        "I'm having trouble right now. Please try again, or contact us at **info@eqourse.com**."
      );
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages, formState, handleFormInput, startForm, addBotMessage]);

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
          sendChatMessage("Give me an overview of all your services with links to each", []).then(
            (reply) => {
              addBotMessage(reply);
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
          sendChatMessage("What are the most common questions people ask? Give me the top 5 with brief answers.", []).then(
            (reply) => {
              addBotMessage(reply);
              setIsLoading(false);
            }
          );
          break;
      }
    },
    [startForm, addBotMessage]
  );

  // ── Render ──
  const showQuickActions = messages.length <= 1;

  return (
    <>
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
            <div className="eqourse-chatbot-avatar">EQ</div>
            <div className="eqourse-chatbot-header-info">
              <div className="eqourse-chatbot-header-title">eQOURSE Assistant</div>
              <div className="eqourse-chatbot-header-status">Online</div>
            </div>
            <div className="eqourse-chatbot-header-actions">
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
          <div className="eqourse-chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`eqourse-chat-msg ${msg.role === "user" ? "user" : "bot"}`}>
                <div className="eqourse-chat-msg-avatar">
                  {msg.role === "user" ? "You" : "EQ"}
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

            {/* Typing Indicator */}
            {isLoading && (
              <div className="eqourse-chatbot-typing">
                <div className="eqourse-chat-msg-avatar" style={{ background: "linear-gradient(135deg, hsl(170 82% 40%), hsl(170 82% 32%))", color: "white", width: 30, height: 30, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                  EQ
                </div>
                <div className="eqourse-chatbot-typing-dots">
                  <span className="eqourse-chatbot-typing-dot" />
                  <span className="eqourse-chatbot-typing-dot" />
                  <span className="eqourse-chatbot-typing-dot" />
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
    </>
  );
};

export default ChatWidget;
