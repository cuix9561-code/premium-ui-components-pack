# 💎 Premium UI Components Pack

> Production-ready React + TypeScript UI components for indie developers and SaaS builders.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

---

## 📦 Components

| Component | Description |
|-----------|-------------|
| **ButtonGroup** | Versatile button system with 4 variants (primary, secondary, outline, ghost), 3 sizes, and built-in toggle group |
| **Navbar** | Fully responsive navigation bar with mobile hamburger menu, badge support, CTA button, sticky/transparent modes |
| **PricingPanel** | Premium pricing tier display with interval toggle, highlighted "popular" cards, feature lists, and CTA buttons |

### 🎯 ButtonGroup

A flexible button component with a built-in segmented control group.

```tsx
import { Button, ButtonGroup } from './components/ButtonGroup';

// Single button
<Button variant="primary" size="lg" onClick={handleClick}>
  Deploy Now
</Button>

// Button group (segmented control)
<ButtonGroup
  items={[
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
    { label: 'Lifetime', value: 'lifetime' },
  ]}
  selected={billingInterval}
  onSelect={setBillingInterval}
/>
```

**Props — Button**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | `''` | Additional classes |

**Props — ButtonGroup**

| Prop | Type | Description |
|------|------|-------------|
| `items` | `{ label, value, icon? }[]` | Array of group items |
| `selected` | `string` | Currently selected value |
| `onSelect` | `(value: string) => void` | Selection handler |

### 🧭 Navbar

A polished, responsive navigation bar.

```tsx
import { Navbar } from './components/Navbar';

<Navbar
  brand="PremiumUI"
  links={[
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing', badge: 'New' },
    { label: 'Docs', href: '#docs' },
  ]}
  ctaLabel="Get Started"
  ctaHref="#signup"
  sticky
/>
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brand` | `string` | required | Brand/logo text |
| `brandLogo` | `React.ReactNode` | auto | Custom logo element |
| `links` | `{ label, href, badge? }[]` | required | Navigation links |
| `ctaLabel` | `string` | — | Call-to-action button text |
| `sticky` | `boolean` | `true` | Fixed to top of viewport |
| `transparent` | `boolean` | `false` | Transparent background |

### 💰 PricingPanel

A premium pricing display for SaaS products.

```tsx
import { PricingPanel } from './components/PricingPanel';

const tiers = [
  {
    name: 'Starter',
    price: 19,
    description: 'Perfect for side projects',
    features: ['Up to 5 projects', 'Basic analytics', 'Community support'],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: 49,
    description: 'For growing businesses',
    features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom domains'],
    highlighted: true,
    badge: 'Popular',
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 149,
    description: 'For large teams',
    features: ['Everything in Pro', 'SLA guarantee', 'Dedicated support', 'Custom integrations'],
    cta: 'Contact Sales',
  },
];

<PricingPanel
  tiers={tiers}
  interval={interval}
  onIntervalChange={setInterval}
/>
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tiers` | `PricingTier[]` | required | Array of pricing tiers |
| `interval` | `'monthly' \| 'yearly'` | `'monthly'` | Billing interval |
| `onIntervalChange` | `fn` | — | Interval toggle handler |
| `compact` | `boolean` | `false` | 2-column layout |

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# Make sure you have React 18+ and Tailwind CSS 3+ installed
npm install react@18
npm install -D tailwindcss@3
```

### 2. Copy Components

```bash
cp -r components/ your-project/src/
```

### 3. Import & Use

```tsx
import { Button } from './components/ButtonGroup';
import { Navbar } from './components/Navbar';
import { PricingPanel } from './components/PricingPanel';
```

### 4. Tailwind Config (Optional)

The components use default Tailwind colors (`emerald`, `slate`) which are built-in. For a custom brand, extend your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { /* your brand colors */ },
      },
    },
  },
};
```

## 📁 Project Structure

```
premium-ui-components-pack/
├── components/
│   ├── ButtonGroup.tsx    # Button system + segmented group
│   ├── Navbar.tsx         # Responsive navigation bar
│   └── PricingPanel.tsx   # Premium pricing display
├── README.md              # This file
└── LICENSE                # MIT License
```

## 📄 License

MIT — Free for personal and commercial projects. Attribution appreciated but not required.

---

<div align="center">
  <sub>Built with 💚 by <a href="https://github.com/cuix9561-code">Mark Cui</a></sub>
</div>
