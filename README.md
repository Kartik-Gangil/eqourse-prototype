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
- **Backend API** — REST endpoints consumed by the frontend for contact forms, free-pilot leads, admin auth, and the sample content library.

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
cp .env.example .env   # create .env manually if .env.example doesn't exist

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

**Login Response:**
```json
{
  "success": true,
  "token": "<jwt>",
  "admin": { "_id": "...", "email": "..." }
}
```

---

### Contact & Free Pilot

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/contact` | ❌ | Submit a contact us query |
| `GET` | `/contact` | ✅ Admin | List all contact queries |
| `PATCH` | `/contact/:id` | ✅ Admin | Update query status / notes |
| `POST` | `/pilot` | ❌ | Submit a free pilot inquiry |
| `GET` | `/pilot` | ✅ Admin | List all pilot inquiries |
| `PATCH` | `/pilot/:id` | ✅ Admin | Update pilot inquiry status |

**Contact Request Body:**
```json
{
  "full_name": "John Doe",
  "email": "john@company.com",
  "phone": "9876543210",
  "phone_code": "+91",
  "company": "ABC Corp",
  "designation": "Manager",
  "interest": "K-12 Content",
  "message": "I'm interested in..."
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

**Query Parameters for `GET /samples/items`:**
| Param | Example | Description |
|---|---|---|
| `category` | `kindergarten-to-k5-samples` | Filter by category slug |

**Valid Category Slugs (must match frontend page routes):**

| Type | Slug |
|---|---|
| Text | `kindergarten-to-k5-samples` |
| Text | `k6-to-k12-samples` |
| Text | `iit-jee-neet-samples` |
| Text | `upsc-state-psc-samples` |
| Text | `stem-content-samples` |
| Text | `curriculum-samples` |
| Text | `translation-and-localization-text-samples` |
| Text | `test-prep-and-assessments` |
| Video | `articulate-storyline-video-samples` |
| Video | `pen-tab-and-ppt-samples` |
| Video | `ai-avatar-video-samples` |
| Video | `flash-to-html-samples` |
| Video | `2d-3d-video-samples` |
| Video | `promotional-video` |
| Video | `immersive-simulation-ar-vr-video` |

**Create Sample Item Body:**
```json
{
  "category": "kindergarten-to-k5-samples",
  "tabs": [
    {
      "tab_name": "Course Book",
      "order": 1,
      "text": "Description shown under the tab",
      "boolean_points": ["Point 1", "Point 2"],
      "samples": [
        {
          "name": "Mathematics Course Book – Grade 1",
          "url": "https://example.com/sample.pdf",
          "desc": "Short description",
          "format": "PDF"
        }
      ]
    }
  ]
}
```

---

## Database Models

### SampleItem
One document per category, with nested tabs and samples:
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

### Admin
```
Admin
  ├── email     String (unique)
  ├── password  String (bcrypt hashed)
  └── role      String (default: "admin")
```

### ContactQuery / Pilot
Standard lead-capture models with `status` field (`new` → `in_progress` → `contacted` → `closed`).

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

## Postman Collection

A ready-to-import Postman collection is included at:
```
eqourse-backend/eQOURSE_API.postman_collection.json
```

Import it into Postman and set the `base_url` variable to `http://localhost:5001/api`.

---

*Built with ❤️ by the eQOURSE team.*
