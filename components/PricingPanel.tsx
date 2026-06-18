'use client';

import React from 'react';

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
  onCta?: () => void;
  priceSuffix?: string;
}

interface PricingPanelProps {
  tiers: PricingTier[];
  interval?: 'monthly' | 'yearly';
  onIntervalChange?: (interval: 'monthly' | 'yearly') => void;
  compact?: boolean;
}

export function PricingPanel({
  tiers,
  interval = 'monthly',
  onIntervalChange,
  compact = false,
}: PricingPanelProps) {
  return (
    <div className="w-full py-8">
      {/* Interval Toggle */}
      {onIntervalChange && (
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-slate-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => onIntervalChange('monthly')}
              className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                interval === 'monthly'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => onIntervalChange('yearly')}
              className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                interval === 'yearly'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Yearly
              <span className="ml-1.5 text-[10px] text-emerald-400 font-bold">-20%</span>
            </button>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div
        className={`
          grid gap-6
          ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}
        `}
      >
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`
              relative flex flex-col rounded-2xl p-6 transition-all duration-300
              ${
                tier.highlighted
                  ? 'bg-gradient-to-b from-emerald-900/40 to-slate-900 border-2 border-emerald-500/50 shadow-xl shadow-emerald-600/10 scale-105'
                  : 'bg-slate-900/50 border border-slate-800 hover:border-slate-600'
              }
            `}
          >
            {/* Badge */}
            {tier.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white rounded-full shadow-lg">
                  {tier.badge}
                </span>
              </div>
            )}

            {/* Header */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
              <p className="text-sm text-slate-400 mt-1">{tier.description}</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">${tier.price}</span>
                {tier.priceSuffix && (
                  <span className="text-sm text-slate-400">{tier.priceSuffix}</span>
                )}
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={tier.onCta}
              className={`
                w-full py-3 rounded-xl text-sm font-semibold transition-all
                ${
                  tier.highlighted
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/25'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                }
              `}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
