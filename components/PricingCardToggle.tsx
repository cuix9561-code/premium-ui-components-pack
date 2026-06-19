'use client';

import React, { useState } from 'react';

// ─── Types ────────────────────────────────────────────────

export type BillingInterval = 'monthly' | 'yearly';

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
  onCta?: () => void;
}

export interface PricingCardToggleProps {
  tiers: PricingTier[];
  defaultInterval?: BillingInterval;
  onIntervalChange?: (interval: BillingInterval) => void;
  onTierSelect?: (tier: PricingTier, interval: BillingInterval) => void;
  className?: string;
}

// ─── Price Display with Transition ───────────────────────

function AnimatedPrice({
  price,
  interval,
  yearlyLabel,
}: {
  price: number;
  interval: BillingInterval;
  yearlyLabel: string;
}) {
  // Monthly display: per month; Yearly display: per month (billed annually) + yearly total
  const displayPrice = interval === 'monthly' ? price : Math.round(price * 0.8); // 20% discount
  const yearlyTotal = Math.round(price * 12 * 0.8);

  return (
    <div className="relative h-20 flex flex-col justify-center overflow-hidden">
      <div className="transition-all duration-300 ease-out">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums transition-all duration-300">
            ${displayPrice}
          </span>
          <span className="text-sm text-slate-400 font-medium">
            {interval === 'monthly' ? '/mo' : `/mo`}
          </span>
        </div>
        {interval === 'yearly' && (
          <p className="text-xs text-slate-500 mt-1 transition-all duration-300">
            ${yearlyTotal} billed annually
            <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 rounded-full">
              Save 20%
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Toggle Switch (Apple-style) ─────────────────────────

function IntervalToggle({
  interval,
  onChange,
}: {
  interval: BillingInterval;
  onChange: (v: BillingInterval) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      <span
        className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
          interval === 'monthly' ? 'text-white' : 'text-slate-500'
        }`}
        onClick={() => onChange('monthly')}
      >
        Monthly
      </span>

      {/* Toggle Switch */}
      <button
        onClick={() => onChange(interval === 'monthly' ? 'yearly' : 'monthly')}
        className={`
          relative w-14 h-7 rounded-full transition-all duration-300 ease-out
          focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2
          ${
            interval === 'yearly'
              ? 'bg-indigo-600 shadow-lg shadow-indigo-600/30'
              : 'bg-slate-700'
          }
        `}
        role="switch"
        aria-checked={interval === 'yearly'}
        aria-label="Toggle billing interval"
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md
            transition-all duration-300 ease-out
            ${interval === 'yearly' ? 'translate-x-7' : 'translate-x-0'}
          `}
        />
      </button>

      <span
        className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
          interval === 'yearly' ? 'text-white' : 'text-slate-500'
        }`}
        onClick={() => onChange('yearly')}
      >
        Yearly
      </span>
    </div>
  );
}

// ─── Pricing Card ────────────────────────────────────────

function PricingCard({
  tier,
  interval,
  onSelect,
}: {
  tier: PricingTier;
  interval: BillingInterval;
  onSelect: (tier: PricingTier, interval: BillingInterval) => void;
}) {
  const CardWrapper = tier.highlighted ? 'div' : 'div';
  const cardProps = {
    className: `
      relative flex flex-col rounded-2xl p-6 sm:p-8 transition-all duration-300 ease-out
      ${
        tier.highlighted
          ? 'bg-gradient-to-b from-slate-800/80 to-slate-900/80 border-2 border-indigo-500/60 scale-[1.02] sm:scale-105 shadow-xl shadow-indigo-500/20 animate-pulse-slow'
          : 'bg-slate-900/50 border border-slate-800 hover:border-slate-600 hover:shadow-lg hover:shadow-black/20'
      }
    `,
  };

  return (
    <CardWrapper {...cardProps}>
      {/* Most Popular Badge */}
      {tier.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-block px-4 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-indigo-500/30">
            {tier.badge}
          </span>
        </div>
      )}

      {/* Card Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">{tier.description}</p>
      </div>

      {/* Animated Price */}
      <AnimatedPrice
        price={tier.monthlyPrice}
        interval={interval}
        yearlyLabel="billed annually"
      />

      {/* Divider */}
      <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
            <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={() => onSelect(tier, interval)}
        className={`
          w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200
          ${
            tier.highlighted
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 active:scale-[0.98]'
              : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 active:scale-[0.98]'
          }
        `}
      >
        {tier.cta}
      </button>
    </CardWrapper>
  );
}

// ─── Main Component ──────────────────────────────────────

export function PricingCardToggle({
  tiers,
  defaultInterval = 'monthly',
  onIntervalChange,
  onTierSelect,
  className = '',
}: PricingCardToggleProps) {
  const [interval, setInterval] = useState<BillingInterval>(defaultInterval);

  const handleIntervalChange = (newInterval: BillingInterval) => {
    setInterval(newInterval);
    onIntervalChange?.(newInterval);
  };

  const handleTierSelect = (tier: PricingTier, selectedInterval: BillingInterval) => {
    onTierSelect?.(tier, selectedInterval);
  };

  return (
    <div className={`w-full py-8 ${className}`}>
      {/* Toggle Switch */}
      <IntervalToggle interval={interval} onChange={handleIntervalChange} />

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 items-start">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            interval={interval}
            onSelect={handleTierSelect}
          />
        ))}
      </div>

      {/* Footnote */}
      <p className="text-center text-xs text-slate-600 mt-8">
        All plans include a 14-day free trial. No credit card required. Cancel anytime.
      </p>
    </div>
  );
}

// ─── Default Tiers Preset ───────────────────────────────

export const defaultPricingTiers: PricingTier[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Perfect for individuals and side projects getting started.',
    monthlyPrice: 19,
    yearlyPrice: 15,
    features: [
      'Up to 5 projects',
      'Basic analytics dashboard',
      'Community support',
      '1 GB storage',
      'Standard API access',
    ],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams that need advanced features and priority support.',
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      'Unlimited projects',
      'Advanced analytics & reports',
      'Priority email support',
      '10 GB storage',
      'Full API access',
      'Custom domains',
      'Team collaboration',
    ],
    highlighted: true,
    badge: 'Most Popular',
    cta: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations requiring dedicated infrastructure.',
    monthlyPrice: 149,
    yearlyPrice: 119,
    features: [
      'Everything in Pro',
      '99.99% SLA guarantee',
      'Dedicated account manager',
      'Unlimited storage',
      'Custom integrations',
      'SSO & SAML',
      'Audit logs',
      'On-premise deployment',
    ],
    cta: 'Contact Sales',
  },
];
