# Project Requirements Document (PRD)
# Paws And Preferences — Find Your Favourite Kitty

**Version:** 1.0  
**Date:** March 15, 2025  
**Status:** Completed

---

## 1. Executive Summary

**Paws & Preferences** is a single-page web application that helps users discover their cat or kitten preferences by swiping through a stack of cat images—similar to popular dating apps—and expressing like (swipe right) or dislike (swipe left). After completing the stack, the app shows a summary and the set of cats the user liked.

---

## 2. Objectives

| # | Objective |
|---|------------|
| 1 | Build a small web application for discovering user cat/kitten preferences. |
| 2 | Present a series of cat pictures and allow like/dislike via swipe gestures. |
| 3 | Provide a summary of liked cats and display the liked set at the end. |
| 4 | Deliver a mobile-first, intuitive, and pleasant experience. |

---

## 3. Functional Requirements

### 3.1 Core Features

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | **Single-page application (SPA)** — All interactions occur on one page without full reloads. | Must |
| FR-2 | **Cat image stack** — Users view a stack of cat images (fixed count; see assumptions). | Must |
| FR-3 | **Swipe right = Like** — Swiping (or dragging) right on a card indicates like. | Must |
| FR-4 | **Swipe left = Dislike** — Swiping (or dragging) left indicates dislike. | Must |
| FR-5 | **Swipable everywhere** — Swipe/drag must work in **both** full-screen (desktop) and mobile view: touch swipe on mobile, mouse drag on desktop. | Must |
| FR-6 | **On-screen buttons** — Like and dislike must also be achievable via visible buttons (click/tap), in both desktop and mobile view. | Must |
| FR-7 | **Keyboard shortcuts** — Like and dislike must be achievable via keyboard (e.g. arrow left/right or dedicated keys), for desktop and whenever focus is in the app. | Must |
| FR-8 | **Summary screen** — After all cats are swiped, show: (a) total number of cats liked, (b) list/grid of liked cat images. | Must |
| FR-9 | **Cat image source** — All cat images must be sourced from the CATAAS API (https://cataas.com/). | Must |
| FR-10 | **Mobile-first** — Interface must work smoothly on mobile with intuitive, pleasant UX. | Must |

### 3.2 CATAAS Integration

- **Base URL:** `https://cataas.com`
- **Relevant endpoints (for reference):**
  - Random cat image: `GET /cat` (e.g. `https://cataas.com/cat`)
  - With size: `GET /cat?width=W&height=H` or `?type=small|medium|square`
  - JSON response (for ID/URL): `GET /cat?json=true`
  - List cats: `GET /api/cats?skip=0&limit=N`
  - Tags: `GET /api/tags`
- **Implementation note:** Use a fixed number of image URLs (e.g. fetch once or use `/api/cats` with `limit`) to avoid duplicate cats in one session if using random `/cat` repeatedly.

### 3.3 Optional / Nice-to-Have

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-11 | Restart / “Play again” to go through the stack again. | Should |
| FR-12 | Basic accessibility (ARIA, focus, reduced motion). | Should |

---

## 4. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-1 | **Performance** — Images should load in a reasonable time; consider placeholders or lazy loading. |
| NFR-2 | **Responsiveness** — Layout must adapt to different screen sizes (mobile, tablet, desktop) and to **page orientation** (portrait and landscape). The UI must behave correctly when the viewport is resized or when testing with browser device emulation (e.g. F12 → toggle device toolbar / mobile view). |
| NFR-3 | **Touch** — Swipe gestures must feel responsive (no major lag or jank) on touch devices; on desktop, mouse drag must provide equivalent “swipe” interaction. |
| NFR-4 | **No backend required** — Client-only application; no server-side logic or database. |
| NFR-5 | **Hosting** — Must be deployable to **GitHub Pages** and run as a static site. |

---

## 5. Assumptions & Constraints

| # | Item |
|---|------|
| 1 | **Fixed number of cats** — Use a fixed set of 10–20 cat pictures per session (e.g. 15). |
| 2 | **No user accounts** — No login, no persistence of results across sessions (optional: localStorage for “last results” is acceptable). |
| 3 | **CATAAS availability** — Reliance on CATAAS API; handle errors (e.g. image load failure) gracefully. |
| 4 | **Modern browsers** — Target modern, evergreen browsers (Chrome, Firefox, Safari, Edge) and mobile browsers. |
| 5 | **GitHub** — Code will live in a public GitHub repository; deployment via GitHub Pages. |

---

## 6. Tech Stack (Recommended)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | React 18 | Component-based UI, good ecosystem, easy to deploy as static SPA. |
| **Build tool** | Vite | Fast dev server and builds, minimal config, ideal for static export. |
| **Language** | JavaScript or TypeScript | TypeScript recommended for maintainability; JS acceptable for a small app. |
| **Styling** | CSS (plain or CSS Modules) or Tailwind CSS | Keeps bundle small; Tailwind optional for rapid UI. |
| **State** | React `useState` / `useReducer` | Sufficient for stack state, likes list, and current card index. |
| **HTTP** | `fetch` | No extra library; CATAAS is REST. |
| **Hosting** | GitHub Pages | As per deliverables; build output is static. |
| **Version control** | Git + GitHub | Public repo required. |

*Alternatives:* Vanilla JS + Vite, or Vue/Svelte instead of React—all compatible with GitHub Pages.

---

## 7. Deliverables

| # | Deliverable | Owner |
|---|-------------|--------|
| 1 | **Hosted website** — Public URL on GitHub Pages. | Dev |
| 2 | **Public GitHub repository** — Source code, README, and (optional) link to PRD. | Dev |

---

## 8. Out of Scope (Current Phase)

- User authentication or profiles  
- Backend or database  
- Sharing results to social media (optional later)  
- Favourites persistence across devices  
- Cat breed or tag filtering (can be added later)

---

## 9. Success Criteria

- User can complete a full swipe-through of the cat stack on mobile and desktop.  
- Like/dislike can be done via **swipe/drag**, **on-screen buttons**, and **keyboard** in both full-screen (desktop) and mobile view.  
- Summary screen correctly shows count and images of liked cats.  
- App is usable and pleasant on a typical mobile device (portrait and landscape); layout is responsive when switching to mobile view (e.g. F12 device toolbar).  
- App is deployable and viewable on GitHub Pages.  
- Repository is public and README explains how to run and deploy.

---

## 10. References

- CATAAS: https://cataas.com/  
- CATAAS API documentation: https://cataas.com/doc.html  
- GitHub Pages: https://pages.github.com/

---

*This PRD is the single source of truth for scope and requirements. Changes should be reflected here before implementation.*