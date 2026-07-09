# eQOURSE AI Chatbot — Integration Guide

## Overview

This document describes the AI-powered chatbot feature built on the `feat/chatbot` branch. The chatbot appears as a floating icon on every page of the website and provides:

- **AI-powered responses** using Google Gemini (via a secure backend proxy)
- **Full company knowledge** — every service, page, FAQ, and contact detail
- **Session memory** — remembers previous questions in the same browser session
- **Contact Us form submission** directly from the chat
- **Free Pilot request submission** directly from the chat
- **Quick action buttons** for common user intents
- **Mobile and desktop optimized** responsive design

---

## Branch

```
feat/chatbot
```

---

## Files Changed

### New Files (Frontend)
| File | Purpose |
|---|---|
| `src/components/chatbot/ChatWidget.tsx` | Main UI component — floating icon, chat window, messages, input |
| `src/components/chatbot/ChatWidget.css` | All chatbot-specific styles (scoped, no conflicts) |
| `src/components/chatbot/chatbotApi.ts` | API client — calls backend proxy, manages session storage |
| `src/components/chatbot/chatbotKnowledge.ts` | Complete knowledge base — all pages, services, company info |
| `src/components/chatbot/chatbotForms.ts` | Contact Us and Free Pilot conversational form collection |

### New Files (Backend)
| File | Purpose |
|---|---|
| `eqourse-backend/src/router/chatRouter.js` | Gemini API proxy — keeps API key server-side |

### Modified Files
| File | Change |
|---|---|
| `src/App.tsx` | Added `import ChatWidget` and `<ChatWidget />` (2 lines) |
| `eqourse-backend/index.js` | Added `chatRouter` import and `app.use("/api/chat", chatRouter)` (2 lines) |

---

## Environment Variables Required

### Backend (`eqourse-backend/.env`)
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

This is the only new environment variable. The API key is **never exposed to the browser** — all Gemini API calls go through the backend proxy at `POST /api/chat`.

### Frontend
No new frontend environment variables. The chatbot uses the existing `VITE_API_BASE_URL` to reach the backend.

---

## How It Works

### Architecture
```
Browser → POST /api/chat (backend proxy) → Gemini API
                                           ↓
Browser ← { reply: "..." } ←──────────────┘
```

1. User types a message in the chat widget
2. Frontend sends `{ message, history, systemPrompt }` to `POST /api/chat`
3. Backend proxy adds the Gemini API key and forwards to Google's API
4. Response flows back to the browser — API key never leaves the server

### Form Submissions
- Contact Us and Free Pilot forms use the **exact same** `POST /api/contact` and `POST /api/free-pilot` endpoints
- Queries submitted via chatbot include `source: "chatbot"` to distinguish from regular form submissions
- Zero changes to existing form handling logic

### Session Memory
- Chat history is stored in `sessionStorage` (persists within a tab, clears on tab close)
- Previous messages are sent with each API call so the AI maintains context
- "New Chat" button clears the session

---

## Testing Checklist

- [ ] Chat icon visible on homepage
- [ ] Chat icon visible on all subpages (content services, AI data, about, etc.)
- [ ] Chat opens/closes smoothly
- [ ] Welcome message appears on first open
- [ ] Quick action buttons work (Contact, Pilot, Services, FAQs)
- [ ] AI responds to questions about services with correct links
- [ ] Session memory — ask follow-up questions and verify context retention
- [ ] "New Chat" button clears history
- [ ] Contact Us form flow — complete and verify query in admin dashboard
- [ ] Free Pilot form flow — complete and verify query in admin dashboard
- [ ] Mobile view (375px) — full-width bottom sheet style
- [ ] Tablet view (768px) — smaller floating window
- [ ] Desktop view — standard floating window
- [ ] No impact on existing page load performance
- [ ] Existing Contact Us page still works independently
- [ ] Existing Free Pilot page still works independently

---

## Gemini Model

The chatbot uses `gemini-2.5-flash` — Google's latest fast model with excellent reasoning capabilities. This can be changed by modifying the `model` variable in `eqourse-backend/src/router/chatRouter.js` (line 44).

---

## Notes

- The chatbot does **not** load any external scripts — all logic is bundled with the React app
- Chat history is **not** stored on the server — it stays in the browser's sessionStorage only
- The knowledge base (`chatbotKnowledge.ts`) should be updated whenever new services or pages are added
- The floating icon has a subtle pulse animation that stops after the user first interacts
