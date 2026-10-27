export interface Specification {
  label: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName?: string;
  imageUrl?: string;
  productCount?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  model: string;
  categoryId: string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  mrp: number;
  sellingPrice: number;
  inStock: boolean;
  stockQuantity?: number;
  isFeatured?: boolean;
  isPublished: boolean;
  images: string[];
  specifications: Specification[];
  features: string[];
  applications?: string[];
  datasheetUrl?: string;
  minimumOrderQuantity?: number;
  createdAt: string;
  updatedAt: string;
}

export type EnquiryType = 'bulk' | 'oem' | 'general';

export type EnquiryStatus = 'new' | 'in-progress' | 'contacted' | 'closed';

export interface BulkOrderEnquiry {
  id: string;
  type: 'bulk';
  fullName: string;
  companyName: string;
  mobile: string;
  email: string;
  productId?: string;
  productName: string;
  quantity: number | string;
  city: string;
  state?: string;
  requirements: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface OEMEnquiry {
  id: string;
  type: 'oem';
  fullName: string;
  companyName: string;
  mobile: string;
  email: string;
  targetProductCategory: string;
  estimatedVolumePerMonth: string;
  technicalSpecsRequired: string;
  city: string;
  state?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface ContactEnquiry {
  id: string;
  type: 'general';
  fullName: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export type AnyEnquiry = BulkOrderEnquiry | OEMEnquiry | ContactEnquiry;

export interface SiteConfig {
  companyName: string;
  tagline: string;
  description: string;
  domain: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  salesEmail: string;
  supportEmail: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  socials: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  businessHours: string;
}

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface ProductReview {
  id: string;
  productId: string;
  reviewerName: string;
  reviewerEmail?: string;
  rating: number; // 1 to 5
  comment: string;
  status: ReviewStatus;
  createdAt: string;
}

export interface ProductReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

