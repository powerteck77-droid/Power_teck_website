import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { siteConfig } from './siteConfig';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format numbers into standard Indian Rupee (INR) currency format
 * e.g., 1499 -> ₹1,499
 */
export function formatINR(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate discount percentage from MRP and selling price
 * Returns 0 if sellingPrice >= mrp or if inputs are invalid.
 */
export function calculateDiscount(mrp: number, sellingPrice: number): number {
  if (!mrp || mrp <= 0 || !sellingPrice || sellingPrice <= 0) return 0;
  if (sellingPrice >= mrp) return 0;
  const discount = ((mrp - sellingPrice) / mrp) * 100;
  return Math.max(0, Math.round(discount));
}

/**
 * Validate pricing rules:
 * - Nonnegative values
 * - Selling Price must be <= MRP
 */
export function validatePricing(mrp: number, sellingPrice: number): { valid: boolean; error?: string } {
  if (mrp < 0) {
    return { valid: false, error: 'MRP cannot be a negative amount.' };
  }
  if (sellingPrice < 0) {
    return { valid: false, error: 'Selling price cannot be a negative amount.' };
  }
  if (sellingPrice > mrp) {
    return { valid: false, error: 'Selling price cannot exceed Maximum Retail Price (MRP).' };
  }
  return { valid: true };
}

/**
 * Generate a WhatsApp Click-to-Chat URL with structured product inquiry text
 */
export function generateWhatsAppUrl({
  productName,
  model,
  sellingPrice,
  productUrl,
  customMessage,
  phoneNumber,
}: {
  productName?: string;
  model?: string;
  sellingPrice?: number;
  productUrl?: string;
  customMessage?: string;
  phoneNumber?: string;
}): string {
  const phone = phoneNumber || siteConfig.whatsappNumber;
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  let text = '';
  if (customMessage) {
    text = customMessage;
  } else if (productName) {
    const priceText = typeof sellingPrice === 'number' ? `\n💰 *Price:* ${formatINR(sellingPrice)}` : '';
    const modelText = model ? ` (Model: ${model})` : '';
    const linkText = productUrl ? `\n🔗 *Product Link:* ${productUrl}` : '';

    text = `Hello Powerteck Team,\n\nI would like to enquire/purchase the following product:\n📦 *Product:* ${productName}${modelText}${priceText}${linkText}\n\nPlease share availability, payment details, and estimated delivery timeline. Thank you!`;
  } else {
    text = `Hello Powerteck Team,\n\nI have an enquiry regarding your power electronics and OEM manufacturing solutions.`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate slug from string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}
