# eQOURSE – EdTech Platform Prototype

> A full-stack prototype for the **eQOURSE** EdTech content platform — featuring a React/Vite marketing website with an admin CMS, and a Node.js/Express REST API backend.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Repository Structure](#repository-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
  - [Auth](#auth)
  - [Blogs](#blogs)
  - [Contact & Free Pilot](#contact--free-pilot)
  - [Samples](#samples)
- [Database Models](#database-models)
- [Branch Strategy](#branch-strategy)
- [Scripts](#scripts)

---

## Project Overview

eQOURSE is an EdTech content development company. This repository is the prototype for the public-facing website and admin CMS. It includes:

- **Marketing website** — home, about, services, sample library (text / video / AI data), blog, contact, and free pilot inquiry forms.
- **Admin panel** — protected routes for managing blog posts and sample items in the MongoDB database.
- **Backend API** — REST endpoints consumed by the frontend for contact forms, free-pilot leads, admin auth, blogs, and the sample content library.

---

## Repository Structure

```
eqourse-prototype/
├── src/                        # React + Vite frontend (TypeScript)
│   ├── admin/                  # Admin CMS pages (Blog Editor, Sample Manager)
│   ├── components/             # Shared UI components
│   │   ├── samples/            # Sample library pages (text, video, AI data)
│   │   ├── contact/            # Contact & Free Pilot forms
│   │   └── ...
│   ├── pages/                  # Top-level route pages
│   └── hooks/                  # Custom React hooks
│
├── eqourse-backend/            # Node.js + Express REST API
│   ├── index.js                # App entry point
│   ├── api_integration_guide.md # Detailed integration reference
│   ├── eQOURSE_API.postman_collection.json # API collection for testing
│   ├── src/
│   │   ├── controller/         # Route handlers
│   │   ├── middleware/         # Auth middleware (JWT)
│   │   ├── model/              # Mongoose schemas
│   │   ├── router/             # Express routers
│   │   └── seeds/              # Database seed scripts
│   └── package.json
│
├── public/                     # Static assets
└── README.md
```

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| shadcn/ui + Radix UI | Component library |
| React Router v6 | Client-side routing |
| TanStack Query | Data fetching / caching |
| React Hook Form + Zod | Form handling & validation |
| Framer Motion | Animations |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT (jsonwebtoken) | Admin authentication |
| bcryptjs | Password hashing |
| dotenv | Environment config |
| nodemon | Dev auto-restart |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB running locally on `mongodb://localhost:27017` (or a cloud URI)
- npm ≥ 9

---

### Frontend Setup

```bash
# From the project root
npm install
npm run dev
# App runs at http://localhost:8080
```

---

### Backend Setup

```bash
cd eqourse-backend
npm install

# Copy and configure environment variables
# Create .env manually and configure MONGO_URI, JWT_SECRET, and PORT
npm run dev
# API runs at http://localhost:5001
```

---

## Environment Variables

Create `eqourse-backend/.env`:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/eqourse
JWT_SECRET=your_secure_secret_here
```

> ⚠️ `.env` is git-ignored. Never commit secrets to version control.

---

## API Reference

Base URL: `http://localhost:5001/api`

> All **admin-only** routes require a `Bearer` token in the `Authorization` header.

---

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | ❌ | Admin login — returns JWT |
| `GET` | `/auth/me` | ✅ Admin | Get current admin profile |

**Login Request Body:**
```json
{
  "email": "admin@eqourse.com",
  "password": "your_password"
}
```

---

### Blogs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/blogs` | ❌ | List published blogs with optional filters |
| `GET` | `/blogs/:slug` | ❌ | Get a single published blog by slug |
| `GET` | `/blogs/admin/all` | ✅ Admin | List all blogs (drafts + published) |
| `GET` | `/blogs/admin/:id` | ✅ Admin | Get single blog by ID |
| `POST` | `/blogs/admin` | ✅ Admin | Create a new blog post |
| `PATCH` | `/blogs/admin/:id` | ✅ Admin | Update a blog post |
| `PATCH` | `/blogs/admin/:id/status` | ✅ Admin | Update publishing status |
| `DELETE` | `/blogs/admin/:id` | ✅ Admin | Delete a blog post |

**Filtering Query Parameters for `GET /blogs`:**
* `tags`: filter by tag list (comma separated, e.g., `?tags=AI,EdTech`)
* `grade`: filter by grade (`?grade=10`)
* `board_course`: filter by board/course (`?board_course=CBSE`)
* `subject`: filter by subject (`?subject=Math`)
* `is_featured`: filter by featured state (`?is_featured=true`)
* `q`: search in title/excerpt/content (`?q=AI`)

---

### Contact & Free Pilot

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/contact` | ❌ | Submit a contact us enquiry |
| `GET` | `/contact` | ✅ Admin | List all contact inquiries |
| `GET` | `/contact/:id` | ✅ Admin | Get contact inquiry details |
| `PATCH` | `/contact/:id` | ✅ Admin | Update contact inquiry status / notes |
| `DELETE` | `/contact/:id` | ✅ Admin | Delete contact inquiry |
| `POST` | `/pilot` | ❌ | Submit a free pilot inquiry |
| `GET` | `/pilot` | ✅ Admin | List all pilot inquiries |
| `GET` | `/pilot/:id` | ✅ Admin | Get pilot inquiry details |
| `PATCH` | `/pilot/:id` | ✅ Admin | Update pilot inquiry status / notes |
| `DELETE` | `/pilot/:id` | ✅ Admin | Delete pilot inquiry |

**Contact Submit Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "phone": "9876543210",
  "phone_code": "+91",
  "company": "ABC Corp",
  "designation": "Manager",
  "subject": "K-12 Content Creation",
  "message": "I am interested in K-12 math solutions."
}
```

---

### Samples

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/samples/categories` | ❌ | List all category slugs from DB |
| `GET` | `/samples/items` | ❌ | List all sample docs (filter by `?category=`) |
| `GET` | `/samples/items/:id` | ❌ | Get a single category sample doc |
| `POST` | `/samples/items` | ✅ Admin | Create a new category sample doc |
| `PATCH` | `/samples/items/:id` | ✅ Admin | Update a sample doc |
| `DELETE` | `/samples/items/:id` | ✅ Admin | Delete a sample doc |

---

## Database Models

### Blog
```
Blog
  ├── title           String
  ├── slug            String (unique)
  ├── excerpt         String
  ├── body            String
  ├── bodyFormat      String ("html" | "markdown")
  ├── coverImageUrl   String
  ├── author
  │     ├── name      String
  │     └── avatarUrl String
  ├── tags            [String]
  ├── grade           String
  ├── board_course    String
  ├── subject         String
  ├── seo
  │     ├── title       String
  │     ├── description String
  │     └── ogImageUrl  String
  ├── status          String ("draft" | "published")
  ├── publishedAt     Date
  ├── readingMinutes  Number
  ├── view_count      Number
  └── is_featured     Boolean
```

### SampleItem
```
SampleItem
  ├── category      String  (e.g. "kindergarten-to-k5-samples")
  └── tabs[]
        ├── tab_name        String
        ├── order           Number
        ├── text            String
        ├── boolean_points  [String]
        └── samples[]
              ├── name    String
              ├── url     String
              ├── desc    String
              └── format  String
```

### ContactQuery
```
ContactQuery
  ├── name            String
  ├── email           String
  ├── phone           String
  ├── phone_code      String
  ├── company         String
  ├── designation     String
  ├── subject         String
  ├── message         String
  ├── source          String
  ├── attachment
  │     ├── url          String
  │     ├── originalName String
  │     ├── size         Number
  │     └── mimeType     String
  ├── status          String ("new" | "in_progress" | "contacted" | "closed")
  └── internal_notes  String
```

### PilotQuery
```
PilotQuery
  ├── name            String
  ├── email           String
  ├── phone           String
  ├── company         String
  ├── role            String
  ├── serviceInterest String ("ai-data" | "edtech" | "localization" | "other")
  ├── projectScope    String
  ├── timeline        String
  ├── languages       String
  ├── message         String
  ├── source          String
  ├── attachment
  │     ├── url          String
  │     ├── originalName String
  │     ├── size         Number
  │     └── mimeType     String
  ├── status          String ("new" | "in_progress" | "contacted" | "closed")
  └── internal_notes  String
```

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready frontend |
| `feature/eqourse-backend` | Backend API code (clean, no frontend bloat) |
| `devlopment` | Active development / staging |

---

## Scripts

### Frontend (root)
```bash
npm run dev        # Start dev server on :8080
npm run build      # Production build
npm run preview    # Preview production build
npm run test       # Run unit tests
npm run lint       # ESLint
```

### Backend (`eqourse-backend/`)
```bash
npm run dev        # Start with nodemon on :5001
npm start          # Same as dev
node src/seeds/seedK12KG5Samples.js   # Seed KG-5 sample data
```

---

## Postman Collection & Integration Guide

A ready-to-import Postman collection and a detailed Integration Guide are included in the backend directory:
```
eqourse-backend/eQOURSE_API.postman_collection.json
eqourse-backend/api_integration_guide.md
```

---

*Built with ❤️ by the eQOURSE team.*
