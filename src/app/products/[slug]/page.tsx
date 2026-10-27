import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { products } from '@/data/products';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductPricing } from '@/components/products/ProductPricing';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductReviewsSection } from '@/components/reviews/ProductReviewsSection';
import { Badge } from '@/components/ui/Badge';
import {
  ShieldCheck,
  CheckCircle2,
  Building2,
  Cpu,
  ChevronRight,
  Truck,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} (${product.model})`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Powerteck India`,
      description: product.shortDescription,
      images: product.images.length > 0 ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products in the same category
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  const productUrl = `${siteConfig.domain}/products/${product.slug}`;

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/products" className="hover:text-slate-900 transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href={`/products?category=${product.categoryId}`}
            className="hover:text-slate-900 transition-colors text-[#E50914] font-medium"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-xs">
            {product.model}
          </span>
        </nav>

        {/* Product Main Overview Section */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Gallery Column */}
            <div className="lg:col-span-6">
              <ProductGallery images={product.images} productName={product.name} />

              {/* Manufacturing Assurance Badges */}
              <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Quality Tested</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>Pan-India Fast Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Direct Factory Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>Energy Efficient Motor</span>
                </div>
              </div>
            </div>

            {/* Right Details Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#292929] text-white font-mono text-xs font-semibold">
                      Model: {product.model}
                    </span>
                    <span className="text-xs text-[#E50914] font-semibold">
                      {product.categoryName}
                    </span>
                  </div>

                  {product.inStock ? (
                    <Badge variant="success">
                      <CheckCircle2 className="w-3.5 h-3.5" /> In Stock & Ready
                    </Badge>
                  ) : (
                    <Badge variant="warning">Made to Order</Badge>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {product.name}
                </h1>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Pricing Block with Strict Validation & Formatting */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Direct Factory Pricing (Ex-Factory)
                  </div>
                  <ProductPricing
                    mrp={product.mrp}
                    sellingPrice={product.sellingPrice}
                    size="xl"
                  />
                  <div className="text-[11px] text-slate-400">
                    * Taxes extra as applicable (GST 18%). Bulk quantity discounts available on volume orders.
                  </div>
                </div>

                {/* Key Features Bullets */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Key Highlights & Features
                  </h3>
                  <ul className="space-y-1.5">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons (WhatsApp Buy Now + Bulk Order) */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <WhatsAppButton
                    productName={product.name}
                    model={product.model}
                    sellingPrice={product.sellingPrice}
                    productUrl={productUrl}
                    size="lg"
                    label="Buy Now via WhatsApp"
                    className="w-full text-sm font-bold"
                  />

                  <Link
                    href={`/bulk-order?product=${encodeURIComponent(product.id)}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#292929] hover:bg-[#1A1A1A] text-white text-sm font-bold transition-all shadow-sm"
                  >
                    <Building2 className="w-4 h-4 text-[#E50914]" />
                    <span>Request Bulk Quote</span>
                  </Link>
                </div>

                <div className="text-center">
                  <Link
                    href="/oem-manufacturing"
                    className="text-xs font-bold text-[#E50914] hover:underline"
                  >
                    Need this model with custom specs, OEM casing or private labelling? Learn more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specifications & Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Specifications Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#E50914]" />
              <span>Complete Technical Specifications</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr
                      key={index}
                      className={`border-b border-slate-100 transition-colors ${
                        index % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-slate-700 w-2/5 border-r border-slate-100">
                        {spec.label}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Full Description / Engineering Notes */}
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">Product Engineering Overview</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.fullDescription}
              </p>
            </div>
          </div>

          {/* Applications & Quick Quote Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Target Applications Card */}
            {product.applications && product.applications.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Typical Applications & Use Cases
                </h3>
                <div className="space-y-2">
                  {product.applications.map((app, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800 flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Factory Support Box */}
            <div className="bg-[#292929] rounded-2xl p-6 text-white space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#E50914]">
                Direct Factory Assistance
              </div>
              <h3 className="text-lg font-bold">Have Technical Questions on {product.model}?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Speak directly with our technical support team for product sizing, bulk dispatch and technical guidance.
              </p>
              <WhatsAppButton
                customMessage={`Hello, I have a technical question regarding ${product.name} (Model: ${product.model}). Please connect me to a product specialist.`}
                label="Technical Support WhatsApp"
                size="sm"
                variant="whatsapp"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Customer Ratings & Reviews Section */}
        <ProductReviewsSection
          productId={product.id}
          productName={product.name}
        />

        {/* Related Products from same category */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Related {product.categoryName} Models
              </h2>
              <Link
                href={`/products?category=${product.categoryId}`}
                className="text-xs font-semibold text-[#E50914] hover:underline"
              >
                View Category Catalogue →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
