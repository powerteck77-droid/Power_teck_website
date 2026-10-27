import React from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductCard } from '@/components/products/ProductCard';
import { HeroBannerSlider } from '@/components/home/HeroBannerSlider';
import { OEMImageSlider } from '@/components/home/OEMImageSlider';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';
import {
  ShieldCheck,
  Factory,
  ArrowRight,
  Package,
  Wrench,
  Truck,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Zap,
  Wind,
  Fan,
  Utensils,
  Flame,
  Volume2,
} from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

const categoryIconMap: Record<string, React.ReactNode> = {
  'cat-air-coolers': <Wind className="w-4 h-4 sm:w-5 sm:h-5" />,
  'cat-fans': <Fan className="w-4 h-4 sm:w-5 sm:h-5" />,
  'cat-mixer-grinders': <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />,
  'cat-kitchen-chimneys': <Flame className="w-4 h-4 sm:w-5 sm:h-5" />,
  'cat-home-theaters': <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />,
  'cat-irons-heating': <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />,
};

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 6);

  // Dynamic category product counts
  const categoryList = categories.map((cat) => {
    const count = products.filter(
      (p) => p.categoryId === cat.id && p.isPublished
    ).length;
    return {
      ...cat,
      count: count > 0 ? count : cat.productCount,
    };
  });

  return (
    <div className="flex flex-col bg-[#F8F9FA]">
      {/* 1. Full-Width Responsive Hero Banner Carousel */}
      <HeroBannerSlider />

      {/* 2. Shop by Category (Matching reference screenshot) */}
      <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-bold text-[#E50914] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#E50914]" />
                <span>VERIFIED PRODUCT RANGE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight">
                Shop by <span className="text-[#E50914]">Category</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-xl">
                Explore our manufactured range of cooling appliances, ceiling fans, kitchen essentials, and audio electronics.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 text-[#E50914] hover:bg-red-50 text-xs sm:text-sm font-semibold transition-colors shrink-0"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {categoryList.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative flex flex-col justify-between bg-white hover:bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 text-left transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-1 hover:border-[#E50914]/40"
              >
                {/* Top Row: Category Icon Pill (Left) & Product Image (Right) */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-50 text-[#E50914] flex items-center justify-center shrink-0 border border-red-100">
                    {categoryIconMap[category.id] || <Package className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                  <div className="h-20 sm:h-24 w-full relative flex items-center justify-center overflow-hidden">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Bottom Row: Category Name + Count (Left) & Circular Arrow (Right) */}
                <div className="flex items-end justify-between pt-2 border-t border-slate-100 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-[#171717] group-hover:text-[#E50914] transition-colors leading-snug line-clamp-1">
                      {category.name}
                    </h3>
                    <span className="text-[11px] sm:text-xs text-[#6B7280] font-normal block mt-0.5">
                      {category.count} Models
                    </span>
                  </div>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 group-hover:bg-[#E50914] group-hover:text-white text-slate-500 flex items-center justify-center transition-colors shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Products Grid */}
      <section className="py-12 sm:py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="text-xs font-semibold text-[#E50914] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span>DIRECT FROM FACTORY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight">
                Featured Powerteck Appliances
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-xl">
                Ready for dispatch. Direct factory pricing with instant single-unit WhatsApp order or bulk wholesale supply.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-semibold text-[#171717] hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
            >
              <span>Explore Complete Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E50914]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Powerteck Section */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E50914] text-xs font-semibold border border-red-200/80">
                <Factory className="w-3.5 h-3.5" /> Indian Manufacturing Brand
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight leading-snug">
                Powerteck — Engineering Everyday Comfort with Pure Copper Reliability
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Headquartered in Delhi, <strong>Powerteck</strong> is a premier manufacturer of heavy-duty evaporative Air Coolers, high-velocity Ceiling & BLDC Fans, high-torque Mixer Grinders, Kitchen Chimneys, and Audio Systems.
              </p>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Every Powerteck appliance is built with pure copper motor windings, dense honeycomb cooling media, and precision thermal overload protectors to deliver uncompromising performance through severe Indian summers.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-slate-200">
                  <div className="text-xl font-bold text-[#171717]">100%</div>
                  <div className="text-xs font-semibold text-slate-700">Pure Copper Motor Winding</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">High thermal endurance & longevity</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-slate-200">
                  <div className="text-xl font-bold text-[#171717]">Direct</div>
                  <div className="text-xs font-semibold text-slate-700">Ex-Factory Pricing</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Transparent rates without middlemen</div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#292929] hover:bg-[#1a1a1a] text-white text-xs font-semibold transition-all"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all"
                >
                  <span>Visit Factory / Office</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-[#292929] p-3 shadow-md">
                <img
                  src="/branding/resized_1600x586-1.jpg.png"
                  alt="Powerteck Appliances Showcase"
                  className="w-full h-auto rounded-xl object-contain bg-[#1F1F1F]"
                />
                <div className="p-3 text-white">
                  <div className="text-xs font-bold text-[#E50914]">Delhi Manufacturing Facility</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Equipped with automated assembly lines, high-tonnage moulding & 100% QC chambers.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. OEM Appliance Slider Showcase */}
      <OEMImageSlider />

      {/* 5. OEM & Contract Manufacturing Section */}
      <section className="py-12 sm:py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E50914] text-xs font-semibold border border-red-200/80">
                  <Factory className="w-3.5 h-3.5" /> Private Label & OEM Manufacturing
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight leading-snug">
                  Custom Appliance OEM Manufacturing for Brands & Distributors
                </h2>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Powerteck provides turnkey original equipment manufacturing (OEM) for national brands and regional retail distributors. From custom cooler mouldings and motor winding to branded packaging and certified testing.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Custom Brand Labelling & Boxes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Pure Copper Winding Specs</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Flexible Minimum Order Batches</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Rigorous In-House QA Testing</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/oem-manufacturing"
                    className="px-5 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#c40811] text-white text-xs font-semibold transition-all shadow-sm"
                  >
                    Submit OEM Specification
                  </Link>
                  <WhatsAppButton
                    customMessage="Hello Powerteck, I would like to discuss private-label OEM manufacturing for our brand."
                    label="WhatsApp OEM Desk"
                    size="sm"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-center">
                <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 space-y-1">
                  <div className="w-9 h-9 rounded-lg bg-red-100 text-[#E50914] flex items-center justify-center mx-auto mb-1.5">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#171717]">Custom Tooling</h4>
                  <p className="text-[10px] text-slate-500">Moulding, sweep sizes & tank volumes</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 space-y-1">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#171717]">Full QC Tested</h4>
                  <p className="text-[10px] text-slate-500">100% full load tested before dispatch</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 space-y-1">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-1.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#171717]">Direct Transport</h4>
                  <p className="text-[10px] text-slate-500">Direct factory logistics to your warehouse</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 space-y-1">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-1.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#171717]">Spares & Warranty</h4>
                  <p className="text-[10px] text-slate-500">Dedicated factory replacement backup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bulk Order Enquiry CTA Banner */}
      <section className="py-12 bg-[#292929] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-2">
              <Package className="w-3.5 h-3.5 text-[#E50914]" /> Wholesale & Institutional Orders
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Procuring in Bulk or Looking for Distributorship?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Get tiered wholesale rate slabs, seasonal inventory bookings, and direct GST factory invoicing.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/bulk-order"
              className="px-5 py-3 rounded-xl bg-[#E50914] hover:bg-[#c40811] text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
            >
              Request Bulk Quote
            </Link>
            <WhatsAppButton
              size="md"
              label="WhatsApp Wholesale Desk"
              className="px-5 py-3 text-xs sm:text-sm"
            />
          </div>
        </div>
      </section>

      {/* 7. Why Choose Powerteck (Verified Claims Only) */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-semibold text-[#E50914] uppercase tracking-wider mb-1">
              Manufacturing Standards
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
              Why Retailers & Dealers Choose Powerteck
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Built on verified manufacturing practices, authentic specifications, and prompt warranty support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#E50914] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-sm font-bold text-[#171717]">100% Pure Copper Motors</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                All fan and cooler motors use 100% pure copper wire winding for maximum energy conductivity and thermal safety.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#E50914] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-sm font-bold text-[#171717]">Direct Ex-Factory Pricing</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Procure directly from our manufacturing assembly in Delhi without multi-layer distributor margins.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#E50914] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-sm font-bold text-[#171717]">100% QC & Burn-in Tested</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Every unit undergoes full-voltage electrical testing and mechanical balancing before leaving the factory.
              </p>
            </div>

            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[#E50914] flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="text-sm font-bold text-[#171717]">Dedicated Spares Backup</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Prompt availability of genuine replacement motors, blades, honeycomb pads, and electrical switches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Direct Contact & Support Strip */}
      <section className="py-8 bg-[#292929] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-xs text-slate-400">Need Immediate Assistance?</div>
            <div className="text-base font-semibold text-white mt-0.5">
              Call Direct Sales: <a href={`tel:${siteConfig.phone}`} className="text-[#E50914] hover:underline font-bold">{siteConfig.phoneDisplay}</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Call Factory</span>
            </a>
            <WhatsAppButton
              size="sm"
              label="Instant WhatsApp"
              className="text-xs"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
