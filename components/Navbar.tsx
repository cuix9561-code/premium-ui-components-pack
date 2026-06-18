'use client';

import React, { useState } from 'react';

interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

interface NavbarProps {
  brand: string;
  brandLogo?: React.ReactNode;
  links: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  sticky?: boolean;
  transparent?: boolean;
}

export function Navbar({
  brand,
  brandLogo,
  links,
  ctaLabel,
  ctaHref = '#',
  onCtaClick,
  sticky = true,
  transparent = false,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={`
        w-full z-50
        ${sticky ? 'fixed top-0 left-0 right-0' : 'relative'}
        ${
          transparent
            ? 'bg-transparent'
            : 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2 text-xl font-bold text-white">
            {brandLogo || (
              <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-sm font-bold">
                P
              </span>
            )}
            {brand}
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm text-slate-300 hover:text-emerald-400 transition-colors font-medium group"
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-600/20 text-emerald-400 rounded-full">
                    {link.badge}
                  </span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            {ctaLabel && (
              <a
                href={ctaHref}
                onClick={onCtaClick}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30"
              >
                {ctaLabel}
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold uppercase bg-emerald-600/20 text-emerald-400 rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
            {ctaLabel && (
              <a
                href={ctaHref}
                onClick={() => { setMobileOpen(false); onCtaClick?.(); }}
                className="block mt-2 px-4 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-lg text-center"
              >
                {ctaLabel}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
