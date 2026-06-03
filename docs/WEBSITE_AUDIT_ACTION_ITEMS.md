# eQOURSE Website — Post-Launch Audit Action Items

**Domain:** https://www.eqourse.com  
**Date:** 3 June 2026  
**Reference:** Based on Lighthouse audit + full site inspection on the live production domain

---

## Overview (For Everyone)

Our new website has been deployed and the **homepage is working well** — the design, branding, SEO tags, and metadata are all solid. However, after a detailed audit, we've identified several issues that need to be addressed urgently before we can see any real improvement in our Google rankings and user experience.

Here's the situation in simple terms:

### What's Working ✅

- The **new homepage** is live and looks great
- SEO metadata on the homepage (title, description, Open Graph, Twitter cards) is well-built
- The server response time is fast (50ms)
- Layout stability is perfect (zero layout shift)
- Best Practices score is **100/100** on Lighthouse

### What's Broken ❌

1. **The website is half-migrated.** When someone visits the homepage, they see our new site. But if they click on About Us, Blog, Careers, or many other pages — they get thrown back to the **old website** with the old design and old branding. This is confusing for visitors and very damaging for SEO.

2. **Old URLs are not redirecting.** We have 77 URLs from the old website that Google has already indexed. Right now, none of them redirect to the new pages. Some still show the old site, and others show a blank version of the homepage. Google doesn't know what happened to our pages.

3. **The homepage is too heavy (27 MB).** Three background videos alone are ~16.6 MB. A well-optimised page should be under 3 MB. This is making the site slow — especially on mobile.

4. **Google still shows the old website in search results.** When you search for "eQOURSE" on Google, the old titles and descriptions still appear because Google hasn't been told that things have changed.

### What Needs to Happen (In Priority Order)

| # | What | Why | Who |
|---|------|-----|-----|
| 1 | Remove the old website completely from the server | Visitors are seeing two different websites on one domain | Server/Hosting Team |
| 2 | Set up 301 redirects for all 77 old URLs | To preserve our Google rankings and avoid 404 errors | Server/Hosting Team |
| 3 | Fix the canonical tags on interior pages | Pages are incorrectly telling Google "I am the homepage" | Development Team |
| 4 | Compress videos and images on the homepage | Page is 27 MB — needs to be under 3 MB | Development Team |
| 5 | Verify Google Search Console and submit new sitemap | So Google can discover and index our new pages | SEO/Development Team |
| 6 | Set up proper security headers | HSTS, Content-Security-Policy, etc. are not configured | Server/Hosting Team |

---

## Technical Details (For the Development & Hosting Team)

### 🔴 CRITICAL — Must Fix Immediately

#### 1. Complete the Migration — Remove the Old Site

**Problem:** The domain currently serves three different responses:

| Behaviour | Example URLs | What Happens |
|-----------|-------------|--------------|
| New site (correct) | `/` (homepage only) | Returns the new React SPA |
| Old site (wrong) | `/aboutus`, `/blog`, `/career` | Returns the old PHP site with old design, old footer, links to `/index.php` |
| Homepage shell (wrong) | `/test-prep-content/sat`, `/free_pilot_signup` | Returns HTTP 200 with the homepage's `<head>` and `canonical="/"` — Google treats these as duplicates |

**Action Required:**
- The old PHP website files must be completely removed from the server
- ALL paths must be handled by the new React application's `index.html`
- The server must be configured so that any route that doesn't match a static file falls back to `index.html` (standard SPA configuration)

**Example server config (Nginx):**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Example server config (Apache `.htaccess`):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ /index.html [L]
```

---

#### 2. Implement 301 Redirects for All 77 Legacy URLs

**Problem:** None of the old URLs redirect. Google still has them indexed with old content. Without 301 redirects, all the SEO equity accumulated over the years is lost.

**Action Required:** Add server-level redirect rules. Every old URL must return a `301 Moved Permanently` to the correct new URL. Below is the complete redirect map:

**Main Navigation:**
| Old URL | New URL | 
|---------|---------|
| `/index` | `/` |
| `/index.php` | `/` |
| `/index.html` | `/` |
| `/contact-us` | `/contact-us` *(same — verify it serves new site)* |
| `/free-pilot` | `/free-pilot` *(same — verify it serves new site)* |
| `/free_pilot_signup` | `/free-pilot` |
| `/samples` | `/samples` *(verify)* |
| `/casestudy` | `/case-studies` |
| `/blog` | `/blogs` |
| `/blog-detail.php` | `/blogs` *(or map individual blog posts by ID if possible)* |

**About Section:**
| Old URL | New URL |
|---------|---------|
| `/aboutus` | `/about-us` |
| `/clients-testimonials` | `/clients-testimonials` *(verify)* |
| `/clients_testimonials` | `/clients-testimonials` |
| `/career` | `/careers` |
| `/faq` | `/faq` *(verify)* |

**Custom E-Learning:**
| Old URL | New URL |
|---------|---------|
| `/custom-e-learning-solutions` | `/custom-e-learning-content` |
| `/k12-and-higher-education` | `/k12-higher-education` |
| `/k12-curriculum-development-and-design-services` | `/k12-curriculum-development` |
| `/assessment-development-services` | `/assessment-development` |
| `/educational-content-development` | `/educational-content-development` |
| `/workbook-development` | `/workbook-development` |
| `/teacher-lesson-plan` | `/teacher-lesson-plan` |
| `/stem-curriculum-services` | `/stem-curriculum` |
| `/interactive-ebook-creation` | `/ebook-creation` |
| `/2d-3d-videos` | `/2d-3d-videos` |
| `/quiz-question-bank-development` | `/quiz-question-bank` |

**Exam Preparation:**
| Old URL | New URL |
|---------|---------|
| `/test-prep-content` | `/test-prep-content` *(verify)* |
| `/test-prep-content/aptis` | `/aptis` |
| `/test-prep-content/toeic` | `/toeic` |
| `/test-prep-content/sat` | `/sat` |
| `/test-prep-content/act` | `/act` |
| `/test-prep-content/ap-exam` | `/ap-exam` |
| `/test-prep-content/ielts` | `/ielts` |
| `/test-prep-content/cefr-placement-solutions` | `/cefr` |
| `/test-prep-content/pte` | `/pte` |
| `/test-prep-content/toefl` | `/toefl` |

**Learning Solutions:**
| Old URL | New URL |
|---------|---------|
| `/learning-solutions` | `/learning-solutions` *(verify)* |
| `/ilt-solutions` | `/ilt-solutions` |
| `/corporate-e-learning-solutions` | `/corporate-e-learning` |
| `/training-modules` | `/training-modules` |
| `/gamified-learning` | `/gamified-learning` |
| `/adaptive-learning` | `/adaptive-learning` |
| `/blended-learning` | `/blended-learning` |
| `/immersive-simulation-ar-vr` | `/ar-vr` |
| `/instructional-design-services` | `/instructional-design` |
| `/optimizing-aI-powered-learning` | `/ai-powered-learning` |

**Video Solutions:**
| Old URL | New URL |
|---------|---------|
| `/elearning-video-solutions` | `/elearning-video-solutions` *(verify)* |
| `/ppt-videos-services` | `/ppt-videos` |
| `/articulate-storyline-services` | `/articulate-storyline` |
| `/animated-video-services` | `/animated-videos` |

**Localization:**
| Old URL | New URL |
|---------|---------|
| `/localization-services` | `/localization-services` *(verify)* |
| `/translation-services` | `/translation` |
| `/voice-over-services` | `/voice-over` |
| `/subtitling-services` | `/subtitling` |

**Technology:**
| Old URL | New URL |
|---------|---------|
| `/technology-solutions` | `/technology-solutions` *(verify)* |
| `/lms-course-builds` | `/lms-course-builds` |
| `/white-label-lms` | `/white-label-lms` |

**Subject Matter Experts:**
| Old URL | New URL |
|---------|---------|
| `/smes` | `/sme` |
| `/tutors-and-sme-recruitment` | `/recruitment` |
| `/tutors-and-sme-training` | `/training` |
| `/live-online-tutor` | `/live-tutors` |

**Samples:**
| Old URL | New URL |
|---------|---------|
| `/text-samples` | `/samples/text-content` |
| `/kindergarden-to-k5-samples` | `/samples/k12-kg-5` |
| `/k6-to-k12-samples` | `/samples/k12-grade-6-12` |
| `/iit-jee-neet-samples` | `/samples/iit-jee-neet` |
| `/upsc-state-psc-samples` | `/samples/upsc-state-psc` |
| `/stem-content-samples` | `/samples/stem-content` |
| `/curriculum-samples` | `/samples/cbse-content` |
| `/translation-and-localization-text-samples` | `/samples/localization` |
| `/test-prep-and-assessments` | `/samples/test-prep-assessments` |
| `/video-samples` | `/samples/video-content` |
| `/articulate-storyline-video-samples` | `/samples/articulate-storyline` |
| `/pen-tab-and-ppt-samples` | `/samples/pen-tab-ppt` |
| `/ai-avater-video-samples` | `/samples/ai-videos` |
| `/flash-to-htm-samples` | `/samples/flash-to-html` |
| `/2d-3d-video-samples` | `/samples/2d-3d-animation` |
| `/promotional-video` | `/samples/promotional-video` |
| `/immersive-simulation-ar-vr-video` | `/samples/ar-vr` |

**Footer / Utility:**
| Old URL | New URL |
|---------|---------|
| `/privacy_policy` | `/privacy-policy` |
| `/sitemap` | `/sitemap` *(verify)* |

> **Important:** Each redirect must be a **single 301 hop** (old URL → 301 → new URL → 200). No chains, no loops. After implementing, test every single row.

---

#### 3. Fix Canonical Tags on Interior Pages

**Problem:** Every new page currently has `<link rel="canonical" href="https://www.eqourse.com/" />` — pointing to the homepage. This tells Google that every page is a duplicate of the homepage.

**Action Required:**
- Each page must have a **self-referencing canonical** tag
- Example: The page at `/about-us` should have `<link rel="canonical" href="https://www.eqourse.com/about-us" />`
- This is handled in the React code via `react-helmet-async` — verify that each page component sets its own canonical correctly

---

### 🟡 HIGH PRIORITY — Fix Within 1-2 Weeks

#### 4. Reduce Page Weight from 27 MB to Under 3 MB

**Problem — Heaviest resources on the homepage:**

| Resource | Type | Size | Fix |
|----------|------|------|-----|
| `/assets/video-project.mp4` | Video | ~7.3 MB | Compress to H.265/VP9, reduce resolution, or use poster image + lazy load |
| `/assets/stats-bg-video.mp4` | Video | ~4.9 MB | Same as above |
| `/hero-bg-3d.mp4` | Video | ~4.4 MB | Same as above |
| `/assets/index-*.js` | JS Bundle | ~2.9 MB | Code-split with dynamic `import()`, remove unused libraries |
| `/assets/who-we-are.png` | Image | ~2.0 MB | Convert to WebP/AVIF, resize to actual display dimensions |
| `/assets/timeline-20xx.png` (×7) | Images | ~0.5-0.9 MB each | Convert to WebP/AVIF, compress, serve responsive sizes |

**Performance Scores (Desktop Lighthouse):**

| Metric | Current | Target |
|--------|---------|--------|
| Performance Score | 61/100 | 90+ |
| First Contentful Paint (FCP) | 3.3s | < 1.8s |
| Largest Contentful Paint (LCP) | 3.9s | < 2.5s |
| Speed Index | 3.6s | < 3.4s |
| Time to Interactive | 4.6s | < 3.8s |
| Total Blocking Time | 60ms ✅ | < 200ms |
| Cumulative Layout Shift | 0 ✅ | < 0.1 |

---

#### 5. Server Configuration Checklist

The following must be configured at the server/hosting level:

- [ ] **HTTPS enforced** — all HTTP requests must 301-redirect to HTTPS
- [ ] **Single canonical host** — pick either `www.eqourse.com` or `eqourse.com` and 301-redirect the other
- [ ] **Security headers present:**
  - `Strict-Transport-Security` (HSTS)
  - `Content-Security-Policy`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`
- [ ] **HTTP/2 or HTTP/3** enabled for asset delivery
- [ ] **Long cache lifetimes** set on static assets (`Cache-Control: max-age=31536000` for hashed assets)
- [ ] **Old PHP files removed** — no `.php` handlers, old admin paths, or upload endpoints should exist on the server
- [ ] **robots.txt** exists, does NOT block the site, references the sitemap
- [ ] **No leftover staging configuration** — confirm there is no `noindex` or `Disallow: /` from any previous staging setup

---

#### 6. Google Search Console & Analytics Setup

- [ ] Verify the property in Google Search Console (we have added the verification meta tag and HTML file — the latest deployment should include both)
- [ ] Submit the new XML sitemap (only new canonical URLs, not old ones)
- [ ] Use "Request Indexing" on the homepage and top pages
- [ ] Confirm GA4 fires on every route change (SPA navigation needs explicit `page_view` events)
- [ ] Set up form conversion tracking (Free Pilot, Contact, Careers)
- [ ] Add the site to Bing Webmaster Tools as well

---

### 🟢 MEDIUM PRIORITY — Fix Within 2-4 Weeks

#### 7. Accessibility Fixes (Lighthouse Score: 87/100)

| Issue | Count | Fix |
|-------|-------|-----|
| Insufficient colour contrast | 73 elements | Adjust text/background colour combinations to meet WCAG 4.5:1 ratio |
| Buttons without accessible name | 7 buttons | Add `aria-label` to icon-only buttons |
| Touch targets too small | 4 elements | Make tap targets at least 48×48px |
| Headings not in sequential order | Multiple | Fix heading hierarchy (H1 → H2 → H3, no skipping) |

#### 8. SEO Link Text Improvements (Lighthouse Score: 92/100)

- 11 links use generic text like "Learn More" or "Read More"
- Replace with descriptive text (e.g., "Explore our Exam Preparation Services")
- This helps Google understand what the destination page is about

#### 9. Consider Server-Side Rendering (SSR) / Pre-Rendering

- The new site is a JavaScript SPA — the initial HTML has metadata in `<head>` but no visible body content
- Google can render JS but it's slower and less reliable
- Pre-rendering or SSR ensures full page content is available in the initial HTML
- This helps with both SEO indexing speed and perceived page load performance

---

## Verification Checklist (Sign-Off Before Marking Complete)

Use this checklist to confirm everything is done:

- [ ] Every URL serves the new site (no old pages anywhere on the domain)
- [ ] All 77 legacy URLs return a single 301 hop to a relevant new page (HTTP 200 final)
- [ ] No URL returns the homepage shell with `canonical="/"` for non-home content
- [ ] Each page has a unique title, meta description, H1, and self-referencing canonical
- [ ] `robots.txt` is correct (no `Disallow:/`, no stray `noindex`) and references the sitemap
- [ ] XML sitemap lists only canonical new URLs and is submitted in Search Console
- [ ] HTTPS enforced; single canonical host; security headers present
- [ ] GA4 fires on every route change; key form conversions tracked
- [ ] Homepage total page weight reduced from ~27 MB toward under ~3 MB
- [ ] Lighthouse scores (mobile AND desktop): Performance 90+, Accessibility 95+, SEO 100

---

*This document is generated from a comprehensive audit of the live production site. All findings are based on direct inspection conducted on 3 June 2026.*
