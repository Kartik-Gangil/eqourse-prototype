# eQOURSE API Integration Guide

This guide details all available backend endpoints, payloads, query parameters, and responses for the four key modules (Samples, Blogs, Contact Queries, Free Pilot Queries) and Auth.

---

## 🔒 Authentication & Headers

All **Admin** endpoints require a Bearer token in the `Authorization` header:

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## 1. 📂 Samples Module

Used for showcasing course samples, learning solutions, and edtech material.

### Public Endpoints

#### 1.1 List Categories
* **Method:** `GET`
* **Route:** `/api/samples/categories`
* **Response:**
```json
{
  "success": true,
  "data": ["articulate-storyline-video-samples", "exam-prep-samples"]
}
```

#### 1.2 List Category Items
* **Method:** `GET`
* **Route:** `/api/samples/items`
* **Query Params:** `?category=articulate-storyline-video-samples` (optional filter)
* **Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d0fe4f5311236168a109ca",
      "category": "articulate-storyline-video-samples",
      "tabs": [
        {
          "tab_name": "Interactive Modules",
          "order": 1,
          "text": "Highly engaging courses.",
          "boolean_points": ["Fully Responsive", "SCORM Compliant"],
          "samples": [
            {
              "name": "Sample 1",
              "url": "https://example.com/s1.zip",
              "desc": "An interactive slide deck",
              "format": "SCORM 2004"
            }
          ]
        }
      ]
    }
  ]
}
```

#### 1.3 Get Single Category Item By ID
* **Method:** `GET`
* **Route:** `/api/samples/items/:id`

---

### Admin Endpoints (Protected)

#### 1.4 Create Category Item
* **Method:** `POST`
* **Route:** `/api/samples/items`
* **Payload:**
```json
{
  "category": "articulate-storyline-video-samples",
  "tabs": [
    {
      "tab_name": "Interactive Modules",
      "order": 1,
      "text": "Highly engaging courses.",
      "boolean_points": ["Fully Responsive"],
      "samples": [
        {
          "name": "Storyline Sample",
          "url": "https://example.com/module1.zip",
          "desc": "Interactive elearning",
          "format": "SCORM"
        }
      ]
    }
  ]
}
```

#### 1.5 Update Category Item
* **Method:** `PATCH`
* **Route:** `/api/samples/items/:id`
* **Payload:** (Partial updates allowed)

#### 1.6 Delete Category Item
* **Method:** `DELETE`
* **Route:** `/api/samples/items/:id`

---

## 2. ✍️ Blog Module

Provides full article management, pagination, search, taxonomy filters, and view-count tracking.

### Public Endpoints

#### 2.1 List Published Blogs
* **Method:** `GET`
* **Route:** `/api/blogs`
* **Query Params:** 
  * `?page=1`
  * `?limit=10`
  * `?tags=AI,EdTech` (comma separated)
  * `?grade=10`
  * `?board_course=CBSE`
  * `?subject=Math`
  * `?is_featured=true`
  * `?q=searchterm`
* **Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "60d0fe4f5311236168a109cb",
        "title": "Unlocking AI in EdTech",
        "slug": "unlocking-ai-in-edtech",
        "excerpt": "How artificial intelligence is changing personalized learning.",
        "body": "<p>Full HTML content...</p>",
        "bodyFormat": "html",
        "coverImageUrl": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        "author": {
          "name": "John Doe",
          "avatarUrl": "https://example.com/john.png"
        },
        "tags": ["AI", "EdTech"],
        "grade": "10",
        "board_course": "CBSE",
        "subject": "Computer Science",
        "seo": {
          "title": "AI in EdTech | eQOURSE",
          "description": "Read our latest post about AI in EdTech",
          "ogImageUrl": ""
        },
        "status": "published",
        "publishedAt": "2026-05-19T07:45:00.000Z",
        "readingMinutes": 5,
        "viewCount": 105,
        "isFeatured": true,
        "createdAt": "2026-05-19T07:40:00.000Z",
        "updatedAt": "2026-05-19T07:45:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  }
}
```

#### 2.2 Get Blog Detail by Slug (Increments view count)
* **Method:** `GET`
* **Route:** `/api/blogs/:slug`

---

### Admin Endpoints (Protected)

#### 2.3 List All Blogs (Any status)
* **Method:** `GET`
* **Route:** `/api/blogs/admin/all`
* **Query Params:** `?status=draft` or `?status=published` (optional)

#### 2.4 Get Blog Detail by ID
* **Method:** `GET`
* **Route:** `/api/blogs/admin/:id`

#### 2.5 Create Blog Post
* **Method:** `POST`
* **Route:** `/api/blogs/admin`
* **Payload:**
```json
{
  "title": "Unlocking AI in EdTech",
  "slug": "unlocking-ai-in-edtech",
  "excerpt": "How AI is changing custom content curation.",
  "body": "Markdown or HTML body content...",
  "bodyFormat": "html",
  "coverImageUrl": "https://images.unsplash.com/photo-...",
  "author": {
    "name": "Jane Doe",
    "avatarUrl": ""
  },
  "tags": ["AI"],
  "grade": "9",
  "board_course": "",
  "subject": "",
  "seo": {
    "title": "AI Content | eQOURSE",
    "description": "Learn about AI custom learning solutions."
  },
  "status": "draft",
  "is_featured": false
}
```

#### 2.6 Update Blog Post
* **Method:** `PATCH`
* **Route:** `/api/blogs/admin/:id`

#### 2.7 Update Blog Publish Status
* **Method:** `PATCH`
* **Route:** `/api/blogs/admin/:id/status`
* **Payload:** `{ "status": "published" }` or `{ "status": "draft" }`

#### 2.8 Delete Blog Post
* **Method:** `DELETE`
* **Route:** `/api/blogs/admin/:id`

---

## 3. 📧 Contact Enquiry Module

Receives public inquiries and allows administrators to review, filter, update status, and add internal notes.

### Public Endpoints

#### 3.1 Submit Contact Form
* **Method:** `POST`
* **Route:** `/api/contact`
* **Payload:**
```json
{
  "name": "Sarah Connor",
  "email": "sarah@cyberdyne.com",
  "phone": "9876543210",
  "phone_code": "+91",
  "company": "Cyberdyne Systems",
  "designation": "Director of Operations",
  "subject": "Custom EdTech Modules Enquiry",
  "message": "We need 15 customized modules for high-school physics.",
  "source": "Google Search"
}
```

---

### Admin Endpoints (Protected)

#### 3.2 List All Inquiries
* **Method:** `GET`
* **Route:** `/api/contact`
* **Query Params:**
  * `?status=new` (new, in_progress, contacted, closed)
  * `?q=searchterm`
  * `?page=1`
  * `?pageSize=25`
  * `?from=YYYY-MM-DD`
  * `?to=YYYY-MM-DD`
* **Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "60d0fe4f5311236168a109cd",
        "name": "Sarah Connor",
        "email": "sarah@cyberdyne.com",
        "phone": "9876543210",
        "phone_code": "+91",
        "company": "Cyberdyne Systems",
        "designation": "Director of Operations",
        "subject": "Custom EdTech Modules Enquiry",
        "message": "We need 15 customized modules for high-school physics.",
        "source": "Google Search",
        "status": "new",
        "internalNotes": "",
        "createdAt": "2026-05-19T07:40:00.000Z",
        "updatedAt": "2026-05-19T07:40:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 25
  }
}
```

#### 3.3 Get Inquiry Details
* **Method:** `GET`
* **Route:** `/api/contact/:id`

#### 3.4 Update Inquiry (Add Internal Notes or Change Status)
* **Method:** `PATCH`
* **Route:** `/api/contact/:id`
* **Payload:** (Provide either or both fields)
```json
{
  "status": "in_progress",
  "internalNotes": "Assigned to physics curriculum specialist."
}
```

#### 3.5 Delete Inquiry
* **Method:** `DELETE`
* **Route:** `/api/contact/:id`

---

## 4. ✈️ Free Pilot Enquiry Module

Handles requests for pilot trials and allows detailed administrative tracking.

### Public Endpoints

#### 4.1 Request Free Pilot
* **Method:** `POST`
* **Route:** `/api/pilot`
* **Payload:**
```json
{
  "name": "Bruce Wayne",
  "email": "bruce@waynecorp.com",
  "phone": "5550199",
  "company": "Wayne Enterprises",
  "role": "CEO",
  "serviceInterest": "ai-data",
  "projectScope": "Data annotation and cleansing pilot of 50,000 images.",
  "timeline": "3 weeks",
  "languages": "English",
  "message": "Let me know when we can kick off.",
  "source": "LinkedIn ad"
}
```

---

### Admin Endpoints (Protected)

#### 4.2 List Free Pilot Inquiries
* **Method:** `GET`
* **Route:** `/api/pilot`
* **Query Params:**
  * `?status=new` (new, in_progress, contacted, closed)
  * `?serviceInterest=ai-data` (ai-data, edtech, localization, other)
  * `?q=searchterm`
  * `?page=1`
  * `?pageSize=25`
* **Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "60d0fe4f5311236168a109ce",
        "name": "Bruce Wayne",
        "email": "bruce@waynecorp.com",
        "company": "Wayne Enterprises",
        "role": "CEO",
        "serviceInterest": "ai-data",
        "projectScope": "Data annotation and cleansing pilot of 50,000 images.",
        "timeline": "3 weeks",
        "languages": "English",
        "status": "new",
        "internalNotes": "",
        "createdAt": "2026-05-19T07:45:00.000Z",
        "updatedAt": "2026-05-19T07:45:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 25
  }
}
```

#### 4.3 Get Pilot Inquiry Details
* **Method:** `GET`
* **Route:** `/api/pilot/:id`

#### 4.4 Update Pilot Inquiry (Change Status/Notes)
* **Method:** `PATCH`
* **Route:** `/api/pilot/:id`
* **Payload:**
```json
{
  "status": "contacted",
  "internalNotes": "Emailed Bruce directly to set up Zoom demo next Thursday."
}
```

#### 4.5 Delete Pilot Inquiry
* **Method:** `DELETE`
* **Route:** `/api/pilot/:id`

---

## 🛠️ Integration Checklist for Frontend Developer
1. **Response Shapes:** The responses map `_id` to standard `id` on formatting for a smoother integration.
2. **Date Format:** ISO 8601 strings (`2026-05-19T13:00:00.000Z`) are returned.
3. **CORS:** Ensure your dev environment uses `http://localhost:5173` or `http://localhost:8080`.
4. **JWT:** Pass JWT token in standard `Authorization: Bearer <token>` header for all endpoints containing `/admin` or accessed by admin operations.
