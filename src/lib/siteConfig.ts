import { SiteConfig } from './types';

export const siteConfig: SiteConfig = {
  companyName: 'Powerteck',
  tagline: 'Leading Manufacturer of Electronics & Home Appliances in India',
  description:
    'Powerteck Industries is a premier Indian manufacturer of high-performance Air Coolers, Ceiling & BLDC Fans, Mixer Grinders, Kitchen Chimneys, Home Theaters, and OEM Home Appliances.',
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'https://powerteck.in',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+919599278444',
  phoneDisplay: '+91 9599 278 444',
  // Configurable WhatsApp number (in E.164 format without '+' or spaces for wa.me)
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919599278444',
  whatsappDisplay: '+91 9599 278 444',
  email: 'info@powerteck.in',
  salesEmail: 'support@powerteck.in',
  supportEmail: 'support@powerteck.in',
  address: {
    street: 'Industrial Area, Phase II',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110052',
    country: 'India',
  },
  socials: {
    facebook: 'https://facebook.com/powerteck.in',
    instagram: 'https://instagram.com/powerteck.in',
  },
  businessHours: 'Monday – Saturday: 9:30 AM – 7:00 PM IST',
};

