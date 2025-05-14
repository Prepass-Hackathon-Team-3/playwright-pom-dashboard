/**
 * Utility functions to support test automation
 */

/**
 * Generate a random email address for test data
 */
export function generateRandomEmail(): string {
  const timestamp = new Date().getTime();
  return `test.user.${timestamp}@example.com`;
}

/**
 * Generate a random string of specified length
 */
export function generateRandomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Format date for input fields (YYYY-MM-DD)
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
} 