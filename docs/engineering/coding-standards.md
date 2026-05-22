# Coding Standards – Voice of Northern (VON)

Version: 2.0  
Scope: Frontend + Backend  

---

# 1. Purpose

This document defines coding standards to ensure:

- Consistency
- Maintainability
- Scalability
- Readability
- Security

All contributors and AI tools must follow this document strictly.

---

# 2. General Principles

- Follow DRY (Don’t Repeat Yourself)
- Follow SOLID principles
- Prefer simplicity over complexity
- Write clean and readable code
- Avoid premature optimization
- Do not use hardcoded values

---

# 3. User Roles (RBAC)

The VON platform enforces Role-Based Access Control to partition administrative and student actions securely:

- **SUPER_ADMIN**: Full unrestricted infrastructure control, permission configuration, database checks, and recovery of soft-deleted entries.
- **ADMIN**: Complete user management, operational role assignment, system moderation, and viewing system logs.
- **MODERATOR**: Manual membership application verification, basic content curation, and notice uploads.
- **COMPLAINT_OFFICER**: Grid review of student grievances, workflow status updates, and public publishing checks.
- **EVENT_MANAGER**: Event creation, ticketing parameters, manual payment verification queue management.
- **CONTENT_WRITER**: Article editing (Markdown/WYSIWYG tools), magazine PDF publication, category tagging.
- **GENERAL_MEMBER**: Standard and anonymous complaint filing, event check-in, profile management.

---

# 4. Naming Conventions

## Variables
- Use camelCase
- Must be meaningful

Example:
```typescript
userEmail
complaintTitle
isAuthenticated
```

---

## Functions
- Use camelCase
- Must describe action (verb-based)

Example:
```typescript
createUser()
getComplaintList()
validateInput()
```

---

## Components
- Use PascalCase

Example:
```tsx
UserCard
ComplaintCard
Navbar
UnifiedEditor
```

---

## Files & Folders
- Use kebab-case

Example:
```typescript
user-service.ts
complaint-controller.ts
auth-middleware.ts
```

---

## Constants
- Use UPPER_SNAKE_CASE

Example:
```typescript
MAX_IMAGE_SIZE
API_TIMEOUT
```

---

# 5. Project Structure

The project utilizes a decoupled client-server architecture:

```
VON/
 ├── backend/                  # Node.js + Express.js + Prisma API Server
 │   ├── prisma/
 │   │   └── schema.prisma     # DB schema definition
 │   ├── src/
 │   │   ├── controllers/      # API Controllers (Auth, Complaints, Events)
 │   │   ├── middlewares/      # RBAC, JWT, security headers, rate limits
 │   │   ├── services/         # Integrations (Bulk SMS BD, transactional mail)
 │   │   ├── utils/            # Hashing, token, logger, audit-trail helper
 │   │   └── app.ts            # Express app entry point
 │
 ├── frontend/                 # Next.js UI Client
 │   ├── src/
 │   │   ├── app/              # Next.js App Router (Public + Admin panels)
 │   │   ├── components/       # Reusable components (UnifiedEditor, Cards)
 │   │   ├── hooks/            # Client state & API query hooks (TanStack Query)
 │   │   └── lib/              # API client connection configurations
 │
 └── docs/                     # SRS, Specifications, and Engineering Guides
```

---

# 6. TypeScript Rules

- Strict mode must be enabled
- Avoid using `any`
- Use proper types/interfaces

Example:
```typescript
type User = {
  id: number
  email: string
}
```

---

# 7. Code Formatting

- Use Prettier
- Use ESLint
- Max line length: 100 characters
- Use 2 spaces indentation

---

# 8. Functions and Logic

- Functions must be small and single-purpose
- Avoid deep nesting
- Max function length: ~30 lines

Bad:
```typescript
if (a) {
  if (b) {
    if (c) {
    }
  }
}
```

Good:
```typescript
if (!isValid()) return
processData()
```

---

# 9. API Standards

## REST Rules

- GET → fetch data
- POST → create
- PUT/PATCH → update
- DELETE → remove

---

## Endpoint Naming

```
/api/users  
/api/complaints  
/api/auth/login  
```

---

## Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```

---

# 10. Database Standards

- Use Prisma ORM
- Use autoincrement integer or UUID as primary key
- Normalize data
- Add indexes where necessary (e.g., studentId, email)

---

# 11. Frontend Standards

- Use reusable components
- Follow design system strictly
- Avoid inline styles
- Keep UI minimal and consistent

---

# 12. State Management

- Use React hooks
- Avoid unnecessary global state
- Keep state minimal

---

# 13. Error Handling

- Always handle errors
- Do not expose sensitive data
- Use centralized error handler

---

# 14. Logging

- Use structured logging
- Do not log sensitive data

---

# 15. Performance

- Use pagination
- Lazy load components
- Optimize images
- Avoid unnecessary re-renders

---

# 16. Testing

- Write unit tests for core logic
- Use Playwright for E2E testing
- Cover critical flows

---

# 17. Git Standards

## Branch Naming

```
feature/auth-login  
fix/complaint-bug  
refactor/user-module  
```

---

## Commit Messages

```
feat: add login  
fix: resolve upload bug  
refactor: improve API  
```

---

# 18. Code Review

- No direct push to main
- All PR must be reviewed
- Tests must pass before merge

---

# 19. Documentation

- Document APIs
- Comment complex logic
- Keep README updated

---

# 20. Prohibited Practices

- No hardcoded secrets
- No duplicate code
- No unused variables
- No console logs in production
- No insecure logic

---

# Final Note

All contributors and AI tools must follow these standards strictly.
Non-compliance may result in rejection of code.