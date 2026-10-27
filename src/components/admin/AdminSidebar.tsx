'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Layers,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Star,
  Cpu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Products Catalogue', href: '/admin/products', icon: Package },
    { label: 'Add New Product', href: '/admin/products/new', icon: PlusCircle },
    { label: 'Categories', href: '/admin/categories', icon: Layers },
    { label: 'Bulk Enquiries', href: '/admin/enquiries?type=bulk', icon: Inbox },
    { label: 'OEM Enquiries', href: '/admin/enquiries?type=oem', icon: Cpu },
    { label: 'Customer Reviews', href: '/admin/reviews', icon: Star },
    { label: 'Website Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (item: { href: string; exact?: boolean }) => {
    const itemPath = item.href.split('?')[0];
    if (item.exact) return pathname === itemPath;
    return pathname.startsWith(itemPath);
  };

  return (
    <aside className="w-64 bg-[#292929] text-slate-300 flex flex-col min-h-screen border-r border-white/10 shrink-0 select-none">
      {/* Brand Header with Exact Homepage Logo */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
        <Link href="/admin" className="flex flex-col gap-1" aria-label="Powerteck Admin Overview">
          <img
            src="/branding/powerteck-logo-white.png"
            alt="Powerteck"
            className="w-[155px] h-auto max-h-[42px] object-contain"
          />
          <div className="text-[10px] text-[#E50914] uppercase tracking-wider font-bold">
            Operations & Admin Hub
          </div>
        </Link>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 px-3 py-6 space-y-1">
        <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Catalogue & Operations
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all',
                active
                  ? 'bg-[#E50914] text-white shadow-md shadow-red-950/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#E50914]" />
            <span>View Public Website</span>
          </span>
          <span className="text-[10px] text-slate-400">↗</span>
        </Link>

        <Link
          href="/admin/login"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
