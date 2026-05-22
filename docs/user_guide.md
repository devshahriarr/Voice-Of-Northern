# Voice of Northern (VON) - User Access and Testing Guide

This guide details how to navigate the **Voice of Northern (VON)** platform. It outlines the URL endpoints, describes features on each screen, and provides credentials to test member, moderator, and admin workflows.

---

## 🔑 Quick Bypass Credentials (For Testing)

To simplify frontend testing without requiring database setups, the login screen includes quick bypass links to redirect you directly. Alternatively, you can use these keys:

*   **Super Admin Bypass Code (For Decryption Challenges)**: `"SUPER_ADMIN_2026"`
    *   *Where to use*: On the admin complaints moderating desk (`/admin/complaints`), use this code to reveal shielded student details for anonymous grievances.

---

## 🗺️ Navigation Map & Route Index

### 1. Open Public Pages (Public Gateway)

| Page | URL Path | Description & Highlights |
| :--- | :--- | :--- |
| **Homepage** | `/` | Features the hero slider, real-time activity feed with filter tabs, achievements telemetry, leadership directory, and embedded contact form. |
| **About Us** | `/about` | Explains organization vision, milestones history, and student rights FAQ sections. |
| **Team Profiles** | `/about/team` | Showcases operator cards with dynamic bio expansion sliders and email connectors. |
| **Circular Bulletin** | `/notices` | Lists priority notice cards. Clicking a notice opens the PDF attachment. |
| **Notice Details** | `/notices/[id]` | Renders a responsive PDF preview iframe with custom loading overlays. |
| **Photography Gallery** | `/gallery` | Grid of student photographs and cultural campaigns grouped by albums. |
| **Events Hub** | `/event` | Lists upcoming events, registration prices, and scheduling tags. |
| **Event Intake** | `/event/[id]` | Details booking forms, seats, contribution fee registers, and transaction code entries. |
| **Complaints Timeline** | `/complaints` | Feed of validated student cases showing progression markers (LODGED, INVESTIGATING, RESOLVED). |
| **Case Details** | `/complaints/[id]` | Dynamic tracking layout displaying comments, feedback notes, and status bar timelines. |
| **Blogs & Articles** | `/blogs` | Student opinion articles categorized by sections. |
| **Blog Reader** | `/blogs/[slug]` | Full article reader with integrated social share toggles, heart/like reactions, and nested discussions. |

---

### 2. Authentication Gateway

*   **Login Interface (`/login`)**:
    *   *How to use*: Enter your username/password, or use the highlighted **"Bypass as Member"** or **"Bypass as Admin"** buttons at the bottom of the form card for immediate redirection.
*   **Member Register (`/register`)**:
    *   *How to use*: Enter student details (Name, ID, Department, Intake Year) and upload a picture of your student identity card using the validating file upload container.

---

### 3. Student Member Dashboard (Dashboard Workspace)

Once logged in as a student member, you can navigate these sections using the student sidebar layout:

*   **Student Profile (`/dashboard/profile`)**:
    *   *Access Path*: Dashboard ➔ Edit Profile
    *   *Features*: Update personal contact details, toggle phone verification state, and crop/upload profile avatars.
*   **Lodge Complaint (`/dashboard/complaints/create`)**:
    *   *Access Path*: Dashboard ➔ File Grievance
    *   *Features*: Input case title, select department categories, and drag-and-drop supporting images/PDFs. Use the **Anonymity Vault Toggle** to safely encrypt your credentials.
*   **My Complaints Tracker (`/dashboard/complaints/my-complaints`)**:
    *   *Access Path*: Dashboard ➔ Submitted Cases
    *   *Features*: Access a secure grid containing all your submitted complaints, along with direct tracking status link tags.
*   **Compose Article (`/dashboard/blogs/create`)**:
    *   *Access Path*: Dashboard ➔ Write Blog
    *   *Features*: Access a Markdown-enabled rich text block. Normal student credentials restrict composer types exclusively to `BLOG` articles (magazine publishing and PDF attachments are locked to admin levels).

---

### 4. Admin and Moderation Center (Admin Portal)

Logged-in moderators and administrators gain access to the control deck (`/admin/*`) featuring telemetry and administrative tools:

*   **Analytics Workspace (`/admin/dashboard`)**:
    *   *Features*: Tracks system telemetry using KPI counters (resolved cases count, total members), active resolution charts, pending intakes, and live moderation logs.
*   **Grievances Decryption Console (`/admin/complaints`)**:
    *   *Features*: Lists student complaints. Anonymous submissions display a glowing red **"Shielded Complainant Profile"** badge.
    *   *How to decrypt*: Click the shielded badge, input the Super Admin override code `"SUPER_ADMIN_2026"`, and submit a valid audit justification to reveal the student's real name, ID, and department.
*   **Member Intake Desk (`/admin/members`)**:
    *   *Features*: Displays pending registrations. Moderators can inspect the uploaded Student ID photo and click **Approve Member** or **Reject Application**.
*   **Audit Logger (`/admin/audit-logs`)**:
    *   *Features*: Records system changes. Tracks identity reveal transactions, identifying the actor admin, target case ID, timestamp, and justification reason.
*   **Notice and Article Moderator (`/admin/content`)**:
    *   *Features*: Edit, delete, or change priority flags on posted notices, blog articles, and student magazine publications.
*   **Campaign Creator (`/admin/events`)**:
    *   *Features*: Setup campus campaigns and upload banners using the drag-and-drop validator.
*   **Media Curation Desk (`/admin/gallery`)**:
    *   *Features*: Publish photographs and assign album tags.
*   **Campus Registry (`/admin/departments`)**:
    *   *Features*: Manage campus department keys and assign specific representatives to handle corresponding complaints.
