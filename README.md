# Dublin Youth String Orchestra (DYSO)

A full-stack website and content management system built for the Dublin Youth String Orchestra — a youth string ensemble based in Dublin, Ohio.

## 🎻 About the Site

This site serves as the primary digital presence for DYSO, giving students, parents, and prospective members everything they need — schedules, audition info, recordings, and contact details — in one place. Behind the scenes, orchestra administrators can manage all site content through a password-protected CMS panel without touching any code.

## 📄 Pages

- **Home** — Hero landing page with orchestra overview
- **Schedule** — Live rehearsal and concert calendar, dynamically managed via the admin panel
- **Audition** — Audition requirements, eligibility criteria, dates, locations, and application form links (all CMS-controlled)
- **Listen** — Recordings and media showcase
- **Members** — Member resources and portal
- **Contact** — Contact form with Remind class code integration

## 🛠 Admin Panel Features

A password-protected internal CMS accessible at `/admin`:

- **Schedule Management** — Add, edit, delete, and drag-to-reorder rehearsals, concerts, and breaks
- **Application Settings** — Toggle applications open/closed, set deadlines, update Google Form links for orchestra and rehearsal assistant applications
- **Audition Requirements** — Edit eligibility criteria and requirements directly from the panel
- **Contact Settings** — Update the Remind class code and contact email year-over-year

## 🛠 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS
- **Drag & Drop:** @hello-pangea/dnd
- **Data Fetching:** TanStack Query (React Query)
- **Icons:** Lucide React
- **Backend, Auth & Deployment:** Base44

## 🔧 Local Development

```bash
npm install
npm run dev
```

> **Note:** Backend, database, and admin authentication require Base44 credentials. The live site is deployed via Base44.

## 📸 Live Site

[https://dublinyouthstringorchestra.com]

## 📋 Context

Designed and developed as a personal project for a local Dublin, Ohio youth orchestra. Built to replace static content with a dynamically managed site that non-technical staff can update independently.
