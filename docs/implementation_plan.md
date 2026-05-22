# Implementation Plan: Voice of Northern (VON)

This document presents the technical implementation plan for building the **Voice of Northern (VON)** platform. It integrates the user's explicit choices regarding double-blind anonymity (immutable audit logs), manual payment verification, local SMS/WhatsApp provider limits, and a unified rich-text/Markdown editor.

---

## 1. User Choices & Parameters Incorporated

> [!IMPORTANT]
> **1. Double-Blind Anonymity & Accountability**
> * A fully anonymous complaint hides user info from standard viewers/moderators.
> * If a Super Admin unlocks user details (for vital safety/abuse prevention), the system executes an **immutable Audit Log write** capturing: *Who unlocked it, when, and the required reason*.
>
> **2. Paid Event Registration & Payments**
> * Stick strictly to **Manual Verification** for the initial release. 
> * Event registration includes fields for **Transaction ID** and an optional **payment receipt screenshot**.
> * Digital payment gateways (SSLCommerz, Stripe, bKash) are formally categorized as **Future Scope**.
>
> **3. WhatsApp Notification Strategy**
> * Integration will be set up to connect with local messaging gateways (such as **Bulk SMS BD** or similar HTTP APIs).
> * To minimize overhead and API cost, SMS/WhatsApp notifications are **restricted strictly to critical status shifts only** (e.g., Complaint resolved, Membership approved/rejected, Urgent notices).
>
> **4. Unified Content Editor**
> * A single unified visual editor (built on **TipTap** or **Editor.js**) that seamlessly handles visual formatting and Markdown shortcuts.

---

## 2. Proposed Architecture & Folder Structure

We will implement a clean, decoupled workspace in `d:\Shahriar\VON`:

```
d:\Shahriar\VON\
├── backend/                  # Node.js + Express.js + Prisma API Server
│   ├── prisma/
│   │   └── schema.prisma     # DB schema definition
│   ├── src/
│   │   ├── controllers/      # API Controllers (Auth, Complaints, Events)
│   │   ├── middlewares/      # RBAC, Authentication guards, rate limits
│   │   ├── services/         # Third-party integrations (Email, SMS gateway)
│   │   ├── utils/            # Hashing, Token generation, Logger
│   │   └── app.ts            # App entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/                 # Next.js UI Client
│   ├── src/
│   │   ├── app/              # App Router pages (Home, Dashboard, Forms)
│   │   ├── components/       # Reusable components (Navbar, Editor, Visualizer)
│   │   ├── hooks/            # TanStack Query mutations & hooks
│   │   └── lib/              # API Client & configuration
│   ├── package.json
│   └── tailwind.config.js
└── docs/                     # SRS and Scope documentation
```

---

## 3. Database Schema Design (Prisma)

Here is the proposed core schema for PostgreSQL using Prisma ORM. It incorporates soft delete fields, relation mappings, and the **Immutable Audit Log** for anonymous lookup events.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  SUPER_ADMIN
  ADMIN
  MODERATOR
  COMPLAINT_OFFICER
  EVENT_MANAGER
  CONTENT_WRITER
  MEMBER
  GUEST
}

enum ComplaintStatus {
  PENDING
  UNDER_REVIEW
  APPROVED
  REJECTED
  RESOLVED
  ESCALATED
}

enum RegStatus {
  PENDING
  APPROVED
  REJECTED
}

enum EventType {
  FREE
  CONTRIBUTION
  PAID
}

enum EditorType {
  RICH_TEXT
  MARKDOWN
}

enum PostStatus {
  DRAFT
  PUBLISHED
}

enum NoticePriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

model User {
  id            Int            @id @default(autoincrement())
  email         String         @unique
  passwordHash  String
  firstName     String
  lastName      String
  department    String
  studentId     String         @unique
  role          Role           @default(MEMBER)
  isActive      Boolean        @default(true)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  deletedAt     DateTime?      // Soft delete

  membership    Membership?
  complaints    Complaint[]
  registrations EventRegistration[]
  posts         Post[]
  auditLogs     AuditLog[]
  complaintLogs ComplaintLog[]
}

model Membership {
  id         Int       @id @default(autoincrement())
  userId     Int       @unique
  user       User      @relation(fields: [userId], references: [id])
  status     RegStatus @default(PENDING)
  batch      String
  skills     String?
  appliedAt  DateTime  @default(now())
  verifiedAt DateTime?
}

model Complaint {
  id          Int             @id @default(autoincrement())
  userId      Int
  user        User            @relation(fields: [userId], references: [id])
  title       String
  description String
  status      ComplaintStatus @default(PENDING)
  isAnonymous Boolean         @default(false)
  evidenceUrl String?
  isPublic    Boolean         @default(false)
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  deletedAt   DateTime?       // Soft delete

  logs        ComplaintLog[]
}

model ComplaintLog {
  id             Int             @id @default(autoincrement())
  complaintId    Int
  complaint      Complaint       @relation(fields: [complaintId], references: [id])
  actorId        Int
  actor          User            @relation(fields: [actorId], references: [id])
  previousStatus ComplaintStatus
  newStatus      ComplaintStatus
  note           String?
  createdAt      DateTime        @default(now())
}

model Event {
  id          Int                 @id @default(autoincrement())
  title       String
  description String
  type        EventType           @default(FREE)
  price       Float               @default(0.0)
  bannerUrl   String?
  eventDate   DateTime
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt

  registrations EventRegistration[]
}

model EventRegistration {
  id                 Int       @id @default(autoincrement())
  eventId            Int
  event              Event     @relation(fields: [eventId], references: [id])
  userId             Int
  user               User      @relation(fields: [userId], references: [id])
  status             RegStatus @default(PENDING)
  transactionId      String?
  screenshotUrl      String?
  contributionAmount Float     @default(0.0)
  registeredAt       DateTime  @default(now())
}

model Notice {
  id        Int            @id @default(autoincrement())
  title     String
  content   String
  priority  NoticePriority @default(LOW)
  category  String
  createdAt DateTime       @default(now())
}

model Post {
  id             Int        @id @default(autoincrement())
  authorId       Int
  author         User       @relation(fields: [authorId], references: [id])
  title          String
  content        String
  editorType     EditorType @default(RICH_TEXT)
  status         PostStatus @default(DRAFT)
  category       String
  tags           String?
  pdfMagazineUrl String?
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
  deletedAt      DateTime?  // Soft delete
}

model AuditLog {
  id        Int      @id @default(autoincrement())
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  action    String   // e.g., "UNLOCKED_ANONYMOUS_IDENTITY"
  details   String   // JSON string containing audit notes, reason, IP, etc.
  createdAt DateTime @default(now())
}
```

---

## 4. Phase-by-Phase Execution Plan

### Phase 1: Environment & Project Scaffolding
1. **Frontend Setup:**
   * Run initial queries to see standard Next.js parameters.
   * Initialize Next.js project inside `d:\Shahriar\VON\frontend` utilizing a responsive, dark-mode-first aesthetic with Tailwind.
2. **Backend Setup:**
   * Initialize Node.js + Express + TypeScript under `backend/`.
   * Configure basic express routing, TypeScript transpilation, and error handling.
3. **Database Configuration:**
   * Configure Prisma ORM with target database parameters.
   * Set up local connection checking and script seed files for predefined roles (`SUPER_ADMIN`, `ADMIN`).

### Phase 2: Authentication & Membership System
1. **User Onboarding:**
   * Implement user registration APIs (saving details like Department, Student ID, batch info).
   * Secure logins with JWTs, issuing access tokens via HTTP-only cookies.
2. **Membership Application Flow:**
   * Create membership apply routes.
   * Admin dashboard view allowing moderators/admins to manually approve or reject memberships.

### Phase 3: Core Complaint & Event Management
1. **Anonymity Mechanism:**
   * Code complaint submission API.
   * Suppress user details on frontend views if `isAnonymous = true`.
   * Implement a high-clearance controller `GET /api/complaints/:id/reveal-identity` accessible strictly by Super Admin. Writing to `AuditLog` table is mandatory inside this transaction.
2. **Manual Event Registrations:**
   * Set up Event models supporting Free, Contribution, and Paid tiers.
   * Registrations collect `transactionId` and `screenshotUrl`.
   * Dashboard tables for Event Managers to confirm registrations.

### Phase 4: CMS, Noticeboard, & Notifications
1. **Unified Editor Component:**
   * Build unified WYSIWYG editor using TipTap, featuring interactive tools and automated markdown parsing shortcut overrides.
2. **Notices & CMS Archives:**
   * Implement standard post and announcement endpoints.
3. **Local SMS/WhatsApp Integrations:**
   * Integrate an HTTP gateway service mimicking Bulk SMS BD APIs.
   * Bind SMS triggers exclusively to status changes:
     * Complaint ➔ `RESOLVED`
     * Membership ➔ `APPROVED` / `REJECTED`
     * Urgent Notice Broadcast

---

## 5. Verification & Testing Strategy

### 5.1. Automated Unit & Integration Tests
* **Auth APIs:** Verify incorrect logins fail, valid logins yield secure session cookies, and route guards block guest accounts.
* **Audit Trail Security:** Write tests asserting that invoking the `reveal-identity` endpoint immediately creates a corresponding `AuditLog` row. Assert that trying to delete or modify `AuditLog` rows returns a DB-level schema or driver error (ensuring immutability).
* **Validation Bounds:** Input checks verifying size parameters of uploaded PDFs/videos.

### 5.2. Manual & Visual Quality Assurance
* **Dark Mode Aesthetics:** Inspect components inside various screen thresholds to avoid horizontal scrollbars.
* **Workspaces & Forms:** Step through complete event-buy processes and complaint tracking forms.
