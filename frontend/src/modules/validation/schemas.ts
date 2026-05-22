/**
 * Strict Input Validation and Sanitization utilities
 */

/**
 * Validates a contact phone number: 10 to 15 digits, optionally prefixed with '+'
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone.trim().replace(/[-\s]/g, ''));
}

/**
 * Validates a standard email address structure
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Escapes HTML characters to prevent XSS during mock form processing
 */
export function sanitizeString(val: string): string {
  if (!val) return '';
  return val
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
