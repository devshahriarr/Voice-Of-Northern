# Voice of Northern (VON) - Student Advocacy Portal

**Voice of Northern (VON)** is a production-grade web application built to digitize student rights advocacy, event management, media galleries, notices, and transparent campus journalism for students at Northern University. It replaces fragmented social media channels with a secure, centralized, and audited digital ecosystem.

---

## 🚀 Key Features

*   **Verified Membership Intake**: Student registrations are parsed and require student ID cards to be uploaded for manual admin verification before dashboards are unlocked.
*   **Double-Blind Anonymity Vault**: Complainants can lodge grievances with a single click toggle for complete anonymity. Submitter details are encrypted in database tables and hidden from regular admins.
*   **Immutable Audit Logging**: Decrypting or revealing anonymous submitter details is strictly restricted to `SUPER_ADMIN` authorization levels, which requires a validated credentials bypass and automatically logs the action, timestamp, and justification.
*   **Real-time Activity Feed**: A unified feed grouping notices, events, and blogs that supports dynamic client-side filtering.
*   **Official PDF Notices Viewer**: Bulletins are equipped with native, responsive PDF frame viewers and loading overlay state handlers.
*   **Interactive Event Registry**: Streamlined ticketing for campus events, supporting free, paid, or contribution registration tiers.
*   **Moderator Operations Console**: Secure administrative screens to manage departments, moderate content, audit system events, verify members, and upload gallery imagery.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 16.2.6 (App Router)
*   **Language**: TypeScript (Strict Mode)
*   **Styling**: Vanilla CSS + Tailwind CSS v4 custom theme mappings
*   **State Management**: React Context (`AuthProvider`) & local React state triggers
*   **Database Management (Planned)**: PostgreSQL + Prisma ORM
*   **Routing**: Next.js client-side history navigation hooks

---

## 📂 Project Structure

```
Voice-Of-Northern/
├── frontend/                  # Next.js UI client application
│   ├── src/
│   │   ├── app/               # Routing groups, layouts and views (28 routes)
│   │   │   ├── (auth)/        # Authentication (Login & Student Registration)
│   │   │   ├── (public)/      # Public pages (Home, About, Notice, Gallery, Events)
│   │   │   ├── admin/         # Moderator panels & analytics dashboard
│   │   │   └── dashboard/     # Student portal (Complaint lodge, profile manager)
│   │   ├── components/        # Reusable UI component catalog
│   │   ├── modules/           # Feature-level local mocks, schemas, and types
│   │   └── styles/            # Tailwind themes and global stylesheet declarations
│   ├── package.json           # Node configuration and dependencies
│   └── tsconfig.json          # Strict TypeScript configurations
└── docs/                      # Specification sheets, reports, and blueprints
    ├── engineering/           # Guidelines, coding standards, and security mandates
    ├── project_report.md      # Comprehensive development progress report
    └── user_guide.md          # Step-by-step route and dashboard user guide
```

---

## 🏁 Getting Started

### Prerequisites

Verify that you have Node.js (v18 or higher) and npm installed:
```bash
node --version
npm --version
```

### Installation

1.  Clone the repository and enter the directory.
2.  Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
3.  Install npm packages and dependencies:
    ```bash
    npm install
    ```

### Running Locally

To start the development server with hot-reloading:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Building for Production

Compile the production bundle and verify TypeScript types:
```bash
npm run build
```

---

## 🔒 Security Best Practices Implemented

*   **Sanitization Pipelines**: All custom forms (e.g. complains intake, contact requests) sanitize HTML and script characters before processing.
*   **SPA Navigation Preservation**: Form handlers use Next.js `useRouter().push()` transitions to prevent browser cache locks during history navigations.
*   **Clearance-Gated Decryption**: Submitter details can only be unlocked via validated challenge badges requiring the `"SUPER_ADMIN_2026"` clearance key.
