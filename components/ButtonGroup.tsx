'use client';

import React, { useState } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 shadow-lg shadow-emerald-600/20',
  secondary:
    'bg-slate-700 text-slate-100 hover:bg-slate-600 active:bg-slate-800',
  outline:
    'border border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 active:border-emerald-600',
  ghost:
    'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 active:bg-slate-800',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-7 py-3.5 text-base rounded-xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-200 ease-out
        focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

// ─── Button Group ──────────────────────────────────────────

interface ButtonGroupProps {
  items: { label: string; value: string; icon?: React.ReactNode }[];
  selected?: string;
  onSelect: (value: string) => void;
  variant?: Variant;
  size?: Size;
}

export function ButtonGroup({
  items,
  selected,
  onSelect,
  variant = 'outline',
  size = 'md',
}: ButtonGroupProps) {
  return (
    <div className="inline-flex rounded-lg overflow-hidden border border-slate-700 divide-x divide-slate-700">
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onSelect(item.value)}
          className={`
            px-4 py-2 text-sm font-medium transition-all duration-150
            flex items-center gap-2
            ${
              selected === item.value
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }
          `}
        >
          {item.icon && <span className="w-4 h-4">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  );
}
