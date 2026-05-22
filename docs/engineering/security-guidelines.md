# Security Guidelines – Voice of Northern (VON)

Version: 2.0  
Scope: Full System  

---

# 1. Purpose

This document defines security practices to:

- Protect user data
- Prevent vulnerabilities
- Ensure safe system operation
- Maintain compliance with best practices

All developers and AI tools must follow this document strictly.

---

# 2. Authentication Security

- Use robust hashing (such as `bcrypt` or `argon2`) for password hashing.
- Never store plain text passwords under any circumstance.
- Use strong password rules (min 8 characters, containing uppercase, numbers, and symbols).
- Use secure session management (Next.js server-side guards and secure HTTP-Only JWT cookies).

---

# 3. Authorization (RBAC)

- Implement strict Role-Based Access Control on both frontend navigation routers and backend controllers.
- Supported Roles: `SUPER_ADMIN`, `ADMIN`, `MODERATOR`, `COMPLAINT_OFFICER`, `EVENT_MANAGER`, `CONTENT_WRITER`, and `GENERAL_MEMBER`.
- Restrict route clearances dynamically and block operations at the database querying interface layer.
- Validate role permissions on every protected endpoint.

---

# 4. Input Validation

- Validate all inputs on both client form hooks and server middleware stacks.
- Use strict schema runtime parsing via **Zod / Joi**.
- Reject invalid, un-sanitized, or unexpected parameters.
- Sanitize inputs comprehensively to defend against Cross-Site Scripting (XSS) threats.

---

# 5. API Security

- Intercept and authenticate every protected request.
- Enforce appropriate REST HTTP verbs.
- Return generic error payloads to prevent system schema fingerprinting.
- Never expose internal database configurations, stack traces, or server directory parameters.

---

# 6. Password & Credential Security

- Store only securely generated hashes.
- Do not expose api tokens, DB links, or cryptographic values in the source code.
- Store sensitive values in environment files (`.env`), protected via local server access permissions.

---

# 7. File Upload Security

The complaint and publishing modules support diverse media validation parameters:
- **Allowed Formats:** JPG, PNG, PDF, and MP4.
- **Strict Size Limitations:**
  - **Images (JPG, PNG):** Maximum 5MB per upload.
  - **PDF Documents:** Maximum 10MB per upload.
  - **Videos (MP4):** Maximum 100MB per upload.
- **Security Scans & Validation:**
  - Enforce backend MIME-type verification (inspecting file magic-number signatures, not just extensions).
  - Generate a secure, unique UUID filename before storing to prevent parameter injection attacks.
  - Keep uploads separated under isolated directory namespaces or external object volumes (S3/R2).

---

# 8. Anonymous Identity Protection (Double-Blind Anonymity)

To preserve complainant security, the system mandates:
- **Relational Integrity Protection:** Leaking any relational user data, profile links, names, or contact information of an anonymous submitter in public API responses is strictly prohibited.
- **Database Level Safeguards:** Sensitive complaint text segments and author IDs must support column-level encryption protocols inside PostgreSQL.
- **Strict Lookup Logs:** If a Super Admin is forced to review submitter details due to legal/abuse flags, the system must trigger an automatic, non-deletable log insertion in `AuditLog` mapping the user, action, and explanation.

---

# 9. Database Security

- Use Prisma ORM to automatically prevent SQL Injection attacks.
- Never construct raw queries without strict parameterized value escaping.
- Apply the least-privilege principle on backend connection strings.

---

# 10. Protection Against Attacks

## SQL Injection
- Use parameterized queries
- Use ORM schemas

## XSS (Cross-Site Scripting)
- Sanitize rich text inputs using libraries like DOMPurify.
- Escape all rendered outputs.

## CSRF
- Set JWT sessions via HTTP-Only, Secure, SameSite cookies.

## Rate Limiting
- Limit API requests per IP (e.g., login and anonymous complaint endpoints) to prevent brute-force attacks.

---

# 11. HTTPS & Data Transmission

- Enforce HTTPS for all requests.
- Block HTTP connections on production environments.
- Protect cookies with secure flags (`httpOnly: true`, `secure: true`, `sameSite: "strict"`).

---

# 12. Logging & Monitoring (Immutable Audit Log)

- Log critical security events.
- Never log user credentials, passwords, or active session tokens.
- Maintain immutable trails for high-level operations (revealing anonymous users, config overwrites).

---

# 13. Error Handling

- Suppress stack trace prints in production API responses.
- Return user-friendly generic errors.
- Pipe detailed exception contexts securely to backend server logs.

---

# 14. Access Control

- Protect sensitive administration folders.
- Verify ownership parameters before deleting/updating data entries.

---

# 15. Third-Party Services

- Store all gateway API tokens (e.g., Bulk SMS BD, Email servers) securely in backend server variables.
- Maintain fallback routes if integrations error out.

---

# 16. Backup & Recovery

- Schedule daily database backups.
- Maintain off-site secure backup vaults.
- Conduct quarterly data restoration drills.

---

# 17. Deployment Security

- Disable debugger channels in production mode.
- Use secure Nginx proxies to manage certificates and forward traffic.

---

# 18. Prohibited Practices

- No hardcoded secrets.
- No unvalidated routing channels.
- No direct client-database calls.
- No storage of raw media files without MIME checks.

---

# Final Note

Security is mandatory. All code must comply with this document.
Any violation must be fixed before deployment.