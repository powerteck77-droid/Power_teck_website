# Powerteck — Manufacturing Brand Website & Admin Operations Hub

> High-reliability Power Electronics & OEM Manufacturing Brand Website with Product Catalogue, WhatsApp Click-to-Chat Buy Now, Wholesale Bulk Order Enquiries, Turnkey OEM Manufacturing RFPs, and Product Management Admin Dashboard.

---

## ⚡ Key Highlights & Features

### 1. Public Experience & Product Catalogue
- **Brand Aesthetic**: Deep navy (`#0B192C`), precision electric blue (`#0066CC`), slate neutrals, clean typography, generous whitespace, and subtle industrial grid accents.
- **Home**: Manufacturing hero with interactive CTAs, verified manufacturing highlights, featured product categories, 4-stage OEM workflow, and trust metrics.
- **Product Catalogue (`/products`)**: Real-time category filtering, instant keyword search across SKU/model/name, stock status toggle, and INR price sorting.
- **Product Detail (`/products/[slug]`)**: Interactive image gallery with high-res zoom preview, complete technical specifications table, applications list, key feature highlights, and related models.
- **Bulk Order Procurement (`/bulk-order`)**: Dedicated B2B inquiry form capturing company name, email, phone, quantity slabs, delivery location, and custom requirements.
- **OEM Manufacturing (`/oem-manufacturing`)**: Detailed capabilities (SMT lines, custom transformer winding, IP67 potting, pre-compliance testing) and private-label RFQ form.
- **About Us (`/about`) & Contact Us (`/contact`)**: 100% full-load burn-in QA protocols, Bengaluru facility details, and interactive contact desk.

### 2. Pricing Rules & Commercial Validation
- **Indian Rupee (INR) Formatting**: Standard `₹` currency rendering.
- **Discount Percentage**: Calculated automatically as `round(((MRP - SellingPrice) / MRP) * 100)`.
- **Zero Fictional Discounts**: When `MRP === Selling Price` or discount is 0%, discount badges and crossed-out original prices are cleanly omitted.
- **Strict Validation**: Enforces `sellingPrice <= MRP` and non-negative values across both user-facing views and admin product creators.

### 3. Configurable WhatsApp Click-to-Chat
- "Buy Now on WhatsApp" buttons automatically generate formatted enquiry text containing:
  - Product Name & Model Number
  - Live Selling Price
  - Direct Product URL
- Configured safely via `siteConfig.ts` and `NEXT_PUBLIC_WHATSAPP_NUMBER` without hardcoding unverified phone numbers.

### 4. Admin Management Dashboard
- **/admin/login**: Administrator authentication gateway.
- **/admin**: KPI operations metrics (Catalogue models, live categories, pending bulk quotes, OEM custom RFPs) and recent incoming inquiry stream.
- **/admin/products**: Inventory management with instant in-stock toggles, pricing view, discount preview, edit, and deletion confirmation.
- **/admin/products/new**: Product creator with live pricing calculation, image URL manager, and specifications key-value builder.
- **/admin/products/[id]/edit**: Product editor pre-populating specifications and pricing.
- **/admin/categories**: Category taxonomy and product assignment manager.
- **/admin/enquiries**: Inquiries hub with status management (`new`, `in-progress`, `contacted`, `closed`), detail modal, and one-click WhatsApp reply.
- **/admin/settings**: Business WhatsApp number and contact detail editor with Supabase integration status checker.

### 5. Supabase Integration-Ready Architecture
- Designed with clean integration boundaries in `src/lib/supabase.ts` for Supabase PostgreSQL, Auth, and Storage.
- Runs smoothly in local mock/seed mode out-of-the-box and switches to cloud Supabase when `.env.local` credentials are provided.
- Service-role credentials are strictly isolated from client-side bundles.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS
- **Icons**: Lucide Icons
- **State & Data**: Client & Server state with integration-ready Supabase client
- **SEO**: Dynamic `sitemap.ts` and `robots.ts` with metadata tags on all routes

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` to set your custom WhatsApp number:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Admin Dashboard Access
Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) or [http://localhost:3000/admin/login](http://localhost:3000/admin/login).
Demo credentials are pre-filled:
- **Email**: `admin@powerteck.in`
- **Password**: `powerteck2026`

---

## 🧪 Testing and Quality Assurance

Run TypeScript compilation and build checks:
```bash
npm run build
```
Run linter:
```bash
npm run lint
```
