# Voice of Northern (VON) - Project Analysis and Status Report

This document presents a comprehensive project analysis and current status report for the **Voice of Northern (VON)** platform. It reviews the directory structures, details the engineering guidelines, maps the active frontend components, and outlines the immediate steps for backend integration and database scaffolding.

---

## 1. Project Overview & Objectives

**Voice of Northern (VON)** is a production-grade web platform designed for a student organization at Northern University. It centralizes student rights advocacy, organizational communications, and event management. The platform aims to digitize and unify activities previously managed across fragmented social media groups (Facebook, Messenger, WhatsApp).

### Core Objectives
*   **Student Rights Advocacy & Complaint Management**: A structured pipeline allowing students to submit grievances and track resolutions transparently.
*   **Double-Blind Anonymity**: Complainants can choose to hide their identity. Relational user details are encrypted in the database and hidden from public layers. Unlocking details requires a Super Admin action, logging an immutable audit record.
*   **Manual Membership Verification**: Registration acts as a membership application, requiring student credentials and ID photo uploads for manual verification by administrators.
*   **Event Management**: Streamlining registration for Free, Contribution, or Paid events with manual payment verification.
*   **Unified Visual Content Editor**: Rich text and Markdown editor support for announcements, blogs, and university digital magazines.
*   **Critical Gateway Notifications**: Cost-efficient, targeted WhatsApp/SMS notification triggers bound strictly to critical status updates.

---

## 2. Directory & Codebase Architecture

The project is structured under a client-server architecture. The frontend is a Next.js App Router application built with TypeScript, Tailwind CSS v4, and custom components.

```
Voice-Of-Northern/
├── frontend/                  # Next.js 16 (App Router) + TypeScript UI Client
│   ├── src/
│   │   ├── app/               # Page routing groups and layouts
│   │   │   ├── (auth)/        # Authentication (Login & Student Registration)
│   │   │   │   ├── login/     # Login form with quick bypasses
│   │   │   │   └── register/  # Student ID verification form
│   │   │   ├── (public)/      # Open-facing layouts and details
│   │   │   │   ├── about/     # About page & team directory
│   │   │   │   ├── blogs/     # Blog reading, reactions & comments
│   │   │   │   ├── complaints/# Grievances feed, submit form & tracker
│   │   │   │   ├── event/     # Event directory & booking feed
│   │   │   │   ├── gallery/   # Media library grid
│   │   │   │   ├── notices/   # Notices bulletin & PDF preview frame
│   │   │   │   └── contact/   # Redirect wrapper to homepage contact
│   │   │   ├── admin/         # Moderator panels & telemetry gauges
│   │   │   │   ├── audit-logs/# Secure logs dashboard
│   │   │   │   ├── complaints/# Moderator clearance & identity unlock desk
│   │   │   │   ├── content/   # Article management console
│   │   │   │   ├── dashboard/ # Analytics center
│   │   │   │   ├── departments/
│   │   │   │   ├── events/    # Event creator & registry verification
│   │   │   │   ├── gallery/   # Media uploader dashboard
│   │   │   │   └── members/   # Member verification portal
│   │   │   └── dashboard/     # Student portal
│   │   │       ├── blogs/     # Blog creation restrictions
│   │   │       ├── complaints/# Client-side complaints status tracker
│   │   │       └── profile/   # Profile manager with avatar uploads
│   │   ├── components/        # UI Kit components (Button, Input, ContactSection)
│   │   ├── modules/           # Features local state, mocks, and schemas
│   │   └── styles/            # CSS theme variables
│   ├── package.json           # Next.js & React dependencies
│   └── tsconfig.json          # Strict check rules
└── docs/                      # Blueprints, plans, and reports
    ├── engineering/           # Coding standards and security mandates
    ├── project_report.md      # Current document
    └── user_guide.md          # Interface route guides
```

---

## 3. Engineering Guidelines & Design Constraints

The development lifecycle enforces strict rules defined in the `docs/engineering/` directory:

### Coding Standards (`docs/engineering/coding-standards.md`)
*   **Naming Conventions**: `camelCase` for variables and functions; `PascalCase` for React components; `kebab-case` for files and folders; `UPPER_SNAKE_CASE` for constants.
*   **Types**: Strict type checking with TypeScript (`strict: true`). Avoidance of `any` types.
*   **Structure**: Functions must be single-purpose and kept below ~30 lines. Deep nesting is prohibited.
*   **DRY Principles**: Form fields and layout modules are abstracted to prevent code duplication.

### Security Guidelines (`docs/engineering/security-guidelines.md`)
*   **Anonymity Protection**: Relational links, profile details, and names of anonymous submitters must not be exposed. Sensitive fields support database column-level encryption.
*   **Immutable Audit Trails**: Revealing an anonymous identity requires a Super Admin clearance level. The action triggers a transaction appending the action and required justification to the `AuditLog` table.
*   **Media Upload Limitations**:
    *   Images (JPEG/PNG): Max 5MB
    *   Documents (PDF): Max 10MB
    *   Video (MP4): Max 100MB
*   **Authentication**: JWT token-based authentication with secure flags (`httpOnly`, `secure`, `sameSite: "strict"`). Hashing with `bcrypt` or `argon2`.
*   **Database Safeguards**: Column-level encryption in PostgreSQL for sensitive tables. Parametrized queries via Prisma ORM to mitigate SQL Injection.

---

## 4. Current Implementation Status (Completed Frontend Pages)

The frontend features 28 route modules, compiled with Turbopack and verified. The following pages have been finalized:

| Page Routing | Description | Features Implemented |
| :--- | :--- | :--- |
| `/` | Home Portal | Hero section, dynamic notices feed, upcoming events, achievements counters, team, and reusable contact section. |
| `/login` | Login | Credentials fields, error alerts, and client-side quick bypass redirects for fast testing. |
| `/register` | Register | Student credential validator, file attachment widget for ID cards, and onboarding states. |
| `/about` | About Details | Organizational vision, mandates, historical timelines, and FAQ guides. |
| `/about/team` | Team Directory | Bio pages, structural roles, email directory, and social profile links. |
| `/complaints` | Grievances Feed | Read-only public complaints board containing search filter controls and status badges. |
| `/complaints/submit` | Lodge Intake | Multi-step form featuring file uploads, department selectors, and absolute Anonymity Toggles. |
| `/complaints/[id]` | Status Tracker | Linear progress workflow timeline, public details panel, and admin feedback notes. |
| `/notices` | Circular Bulletin | Categorized grid system for notices and urgent circular badges. |
| `/notices/[id]` | Notice Viewer | Native iframe PDF preview container, metadata panels, and loader screens. |
| `/blogs` | Articles Board | Blog categories listing, author filters, and article summaries. |
| `/blogs/[slug]` | Article View | Full markdown blog rendering, client reaction counters, and unified comments container. |
| `/event` | Events Directory | Upcoming workshops, contribution seminars, and price badges. |
| `/event/[id]` | Event Tracker | Seat registration layout, payment status inputs, and transaction code logs. |
| `/gallery` | Photography Library | Photo album tiles, categorization badges, and hover details. |
| `/dashboard/profile` | Member Profile | Dynamic personal details modifier, avatar uploader, and mobile validation flags. |
| `/dashboard/complaints/my-complaints` | Student Grid | Complete list of student grievances showing submission states and direct tracking links. |
| `/dashboard/blogs/create` | Composer | Secure markdown creator restricted strictly to `BLOG` articles. |
| `/admin/dashboard` | Admin Center | Analytical counters, status charts, system audit summary, and quick navigation modules. |
| `/admin/complaints` | Grievances Desk | Shielded complainant details decrypt panel, verified credentials unlocks, and resolution controls. |
| `/admin/members` | Verification Center | Intake applications reviewer, student ID attachment viewer, and single-click verify/reject actions. |
| `/admin/events` | Events Creator | Event creator panel with file attachment handlers for banners. |
| `/admin/gallery` | Album Manager | Photo uploader widget and title categories. |
| `/admin/content` | Content Moderator | Approved notice, blog post, and magazine editor overview. |
| `/admin/audit-logs` | Auditing System | Interactive table tracking identity reveal events, actor admins, timestamps, and justification reasons. |
| `/admin/departments` | Campus Registry | Create or modify department entries and assign audit representatives. |

---

## 5. Completed Refactoring Milestones

1.  **Component Modularization (DRY Compliance)**:
    *   **Contact Form**: Refactored the form layout in `contact/page.tsx` into a reusable, sanitized component at [src/components/ui/contact-section.tsx](file:///h:/VON/Voice-Of-Northern/frontend/src/components/ui/contact-section.tsx). Cleaned up duplication on the home screen.
    *   **Comments & Reactions**: Created a shared `<InteractionSection />` component used in both Complaints and Blogs to eliminate redundant state mechanisms.
2.  **Navigation Fixes**:
    *   Replaced `window.location.href` redirections on the `/login` screen with Next.js's native `useRouter().push()`. This preserves client-side virtual routing state and stops back-button event listener freezes.
3.  **Moderator Decrypt Badge**:
    *   Rewrote the decrypt challenge flow in `/admin/complaints`. The shield now pulls live fields from the selected grievance record once the `"SUPER_ADMIN_2026"` code clears.
4.  **Uploader Framework**:
    *   Replaced URL text input boxes inside Admin Gallery and Admin Events with a fully validating drag-and-drop `<FileUpload />` component.

---

## 6. Build and Verification Logs

The client package built cleanly using the Turbopack compiler:
*   **Compile Time**: 21.6 seconds.
*   **TypeScript Verification Time**: 4.5 seconds.
*   **Total Output Routes**: 28 page routes compiled with 0 errors.
*   **Target Exit Code**: 0.
