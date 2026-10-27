'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';
import { categories } from '@/data/categories';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Package,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Verified Clean Social Icons matching reference
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function PinterestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" {...props}>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.33 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Hide public navbar on /admin routes
  const isAdminRoute = pathname?.startsWith('/admin');
  if (isAdminRoute) return null;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products', hasDropdown: true },
    { name: 'OEM Manufacturing', href: '/oem-manufacturing' },
    { name: 'Bulk Order', href: '/bulk-order' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* 1. Top Red Contact Bar (Relative in normal flow, scrolls out of view naturally) */}
      <div className="relative w-full select-none bg-[#E50914] text-white text-[12px] sm:text-[13px] h-[40px] flex items-center z-40">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Info: Contact Us & Verified Phone */}
          <div className="flex items-center gap-3 sm:gap-4 font-normal">
            <Link
              href="/contact"
              className="flex items-center gap-1.5 hover:underline underline-offset-2 transition-opacity text-white"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </Link>
            <span className="opacity-40 select-none">|</span>
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-1.5 hover:underline underline-offset-2 font-medium text-white"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{siteConfig.phoneDisplay}</span>
            </a>
          </div>

          {/* Right Info: Verified Socials & Email */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 text-white/90">
              <a
                href={siteConfig.socials?.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="X / Twitter"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Pinterest"
              >
                <PinterestIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.socials?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            <span className="opacity-40 select-none hidden sm:inline">|</span>

            <a
              href={`mailto:${siteConfig.salesEmail}`}
              className="hidden sm:flex items-center gap-1.5 text-white hover:underline underline-offset-2 text-[12px]"
              aria-label="Powerteck Support Email"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{siteConfig.salesEmail}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Charcoal Navigation Header (Sticky at top-0, remaining visible on all scroll positions) */}
      <header className="sticky top-0 z-50 w-full select-none bg-[#292929] text-white shadow-md">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[80px] lg:h-[92px]">
            {/* Original White Powerteck Logo - Target 190-215px desktop width */}
            <div className="flex items-center">
              <Link
                href="/"
                className="inline-flex items-center"
                aria-label="Powerteck Home"
              >
                <img
                  src="/branding/powerteck-logo-white.png"
                  alt="Powerteck Logo"
                  className="w-[165px] sm:w-[190px] lg:w-[215px] h-auto max-h-[58px] object-contain transition-opacity hover:opacity-95"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links + Search Icon */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <nav className="flex items-center gap-6 xl:gap-7">
                {navLinks.map((link) => {
                  const active = isActive(link.href);

                  if (link.hasDropdown) {
                    return (
                      <div
                        key={link.name}
                        className="relative py-2 flex items-center"
                        onMouseEnter={() => setCategoriesDropdownOpen(true)}
                        onMouseLeave={() => setCategoriesDropdownOpen(false)}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            'inline-flex items-center gap-1 text-[14px] font-medium transition-colors py-1',
                            active
                              ? 'text-[#E50914] font-semibold'
                              : 'text-white hover:text-[#E50914]'
                          )}
                        >
                          <span>{link.name}</span>
                          <ChevronDown className="w-3.5 h-3.5 opacity-75 transition-transform duration-200" />
                        </Link>

                        {/* Clean Floating Products Dropdown */}
                        <div
                          className={cn(
                            'absolute top-full left-0 w-72 pt-2 transition-all duration-200 z-50',
                            categoriesDropdownOpen
                              ? 'opacity-100 translate-y-0 pointer-events-auto'
                              : 'opacity-0 translate-y-1 pointer-events-none'
                          )}
                        >
                          <div className="bg-[#242424] rounded-xl shadow-2xl border border-white/10 p-2.5 space-y-0.5 text-white">
                            <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-white/10 mb-1">
                              Product Categories
                            </div>
                            {categories.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/products?category=${cat.slug}`}
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#333333] hover:text-[#E50914] transition-colors group/item"
                              >
                                <div className="p-1 rounded-md bg-[#333333] text-[#E50914] group-hover/item:bg-[#E50914] group-hover/item:text-white transition-colors shrink-0">
                                  <Package className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-[13px] font-medium text-white group-hover/item:text-[#E50914] transition-colors">
                                    {cat.name}
                                  </div>
                                </div>
                              </Link>
                            ))}
                            <div className="pt-1.5 border-t border-white/10 mt-1">
                              <Link
                                href="/products"
                                className="block text-center py-1.5 text-xs font-semibold text-[#E50914] hover:bg-[#333333] rounded-lg transition-colors"
                              >
                                Browse All Products →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        'relative inline-flex items-center text-[14px] font-medium transition-colors py-1',
                        active
                          ? 'text-[#E50914] font-semibold after:content-[""] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2.5px] after:bg-[#E50914]'
                          : 'text-white hover:text-[#E50914]'
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Search Button matching reference */}
              <Link
                href="/products"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
                aria-label="Search Products"
              >
                <Search className="w-4 h-4 text-white" />
              </Link>
            </div>

            {/* Mobile Hamburger & Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/products"
                className="p-2 rounded-lg bg-white/10 text-white flex items-center justify-center"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="p-2 rounded-lg bg-[#E50914] text-white flex items-center justify-center text-xs"
                aria-label="Call Sales"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#242424] text-white px-4 pt-3 pb-6 space-y-2 shadow-2xl">
            <div className="space-y-0.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                if (link.hasDropdown) {
                  return (
                    <div key={link.name} className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            'block px-3 py-2 rounded-lg text-sm font-medium flex-1',
                            active
                              ? 'text-[#E50914] bg-white/5 font-semibold'
                              : 'text-white hover:bg-white/5'
                          )}
                        >
                          {link.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                          className="p-2 text-slate-300 hover:text-white"
                          aria-label="Toggle product categories"
                        >
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 transition-transform duration-200',
                              mobileProductsOpen ? 'rotate-180 text-[#E50914]' : ''
                            )}
                          />
                        </button>
                      </div>

                      {/* Nested Product Categories for Mobile */}
                      {mobileProductsOpen && (
                        <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-[#E50914] ml-3">
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/products?category=${cat.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded"
                            >
                              • {cat.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block px-3 py-2 rounded-lg text-sm font-medium',
                      active
                        ? 'text-[#E50914] bg-white/5 font-semibold'
                        : 'text-white hover:bg-white/5'
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/bulk-order"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-[#E50914] hover:bg-[#c40811] text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Bulk Order Quotation
              </Link>
              <div className="flex items-center justify-between text-xs text-slate-400 px-3 pt-1">
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                  📞 {siteConfig.phoneDisplay}
                </a>
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                  🔒 Admin Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
