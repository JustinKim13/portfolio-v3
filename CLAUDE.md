# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Portfolio v3 — Justin Kim's personal portfolio webapp (SWE/MLE). Spotify-themed UI with live Spotify API integration.

---

## Commands

```bash
# Dev
npm run dev       # starts at http://localhost:3000

# Build & preview
npm run build
npm run preview   # build + start

# Type-check
npm run typecheck # tsc --noEmit

# Lint
npm run lint
```

## Spotify API Setup

1. Go to https://developer.spotify.com/dashboard and create an app
2. Get `CLIENT_ID` and `CLIENT_SECRET`
3. Use Authorization Code flow once to obtain a `REFRESH_TOKEN`
4. Add to `.env.local`:
   ```
   SPOTIFY_CLIENT_ID=
   SPOTIFY_CLIENT_SECRET=
   SPOTIFY_REFRESH_TOKEN=
   ```
5. Never expose `CLIENT_SECRET` to the client — all Spotify calls go through `/api/spotify/*` routes

---

## Recommended Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR/SSG, SEO, Server Components |
| Language | TypeScript | Strict mode on |
| Styling | Tailwind CSS v4 + CVA | Utility-first + variant management |
| Components | shadcn/ui (Radix primitives) | Accessible headless UI |
| 3D | Three.js + @react-three/fiber + @react-three/drei | Carry over from v2 |
| Post-processing | @react-three/postprocessing | Bloom, chromatic aberration, etc. |
| Animation | Motion (Framer Motion v12) + GSAP ScrollTrigger | Scroll-driven scenes |
| Smooth scroll | Lenis | Buttery scroll inertia |
| Data viz | D3.js or Recharts | For MLE project showcases |
| Deployment | Vercel | Same as v2 |

---

## Project Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, providers, Lenis)
│   ├── page.tsx            # Home (assembles sections)
│   └── globals.css         # Tailwind directives + CSS vars
├── components/
│   ├── sections/           # Full-page sections (Hero, About, Work, etc.)
│   ├── ui/                 # Reusable atoms (Button, Card, Badge, etc.)
│   ├── canvas/             # R3F / Three.js scene components
│   └── layout/             # Navbar, Footer
├── hooks/                  # Custom hooks (useScrollProgress, useMediaQuery, etc.)
├── lib/
│   ├── motion.ts           # Shared Framer Motion variants
│   ├── utils.ts            # cn() helper (clsx + tailwind-merge)
│   └── fonts.ts            # next/font definitions
├── constants/              # Content data (projects, skills, experience)
├── types/                  # Shared TypeScript types
└── assets/                 # Static images, icons, 3D models
```

All content (bio, projects, experience, skills) lives in `constants/` — no content hardcoded in components.

---

## Component Conventions

### Naming & files
- One component per file; filename matches component name (PascalCase).
- Barrel exports via `index.ts` only inside `components/ui/` and `components/canvas/`.
- Section components are not re-exported — import directly.

### Props & typing
```tsx
// Use explicit interface, never inline type in function signature
interface HeroProps {
  tagline: string;
}

export function Hero({ tagline }: HeroProps) { ... }
```

### CVA for variants
```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('base classes', {
  variants: {
    variant: { primary: '...', ghost: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});
```

### The `cn()` utility
Always use `cn()` (clsx + tailwind-merge) when combining conditional classes:
```tsx
import { cn } from '@/lib/utils';
<div className={cn('base', isActive && 'active', className)} />
```

---

## Styling Conventions

### Design tokens (Tailwind CSS vars)
Define all brand colors as CSS custom properties in `globals.css`, exposed as Tailwind tokens:
```css
:root {
  --background: 5 8 22;       /* #050816 */
  --foreground: 243 243 243;
  --accent: 145 94 255;        /* purple */
  --muted: 170 166 195;
  --card: 21 16 48;
}
```
Access via `bg-[rgb(var(--background))]` or configure in `tailwind.config.ts`.

### Dark-first
Design dark theme first. Light mode is optional.

### Typography scale
Use `next/font` for zero-layout-shift font loading. Define a single `fontSans` and `fontMono` in `lib/fonts.ts`.

### Spacing & layout
- Container max-width: `max-w-7xl mx-auto px-6 sm:px-12`
- Section padding: `py-20 md:py-32`
- Consistent gap scale: `gap-4`, `gap-6`, `gap-8`, `gap-12`

### Avoid magic numbers
Prefer Tailwind scale values. Only use `[]` escape for truly one-off values.

---

## Animation Patterns

### Framer Motion
- All reusable variants live in `lib/motion.ts` (never inline in components).
- Use `whileInView` + `viewport={{ once: true }}` for scroll-triggered reveals.
- Wrap sections in `<motion.section>` with `variants={staggerContainer}` so children stagger automatically.
- Keep `duration` ≤ 0.6s for UI transitions; reserve longer durations for hero/cinematic effects.

### GSAP ScrollTrigger
Use for scroll-pinned scenes, parallax layers, or scrubbed timeline animations (things Framer Motion handles poorly at large scale).

```ts
// Always clean up in useEffect return
useEffect(() => {
  const ctx = gsap.context(() => { ... }, containerRef);
  return () => ctx.revert();
}, []);
```

### Lenis (smooth scroll)
Initialize once in root layout; expose via context or a `useLenis` hook. Integrate with GSAP `ScrollTrigger` via `lenis.on('scroll', ScrollTrigger.update)`.

### Three.js / R3F
- Wrap every canvas in `<Suspense fallback={<Loader />}>`.
- Use `useFrame` for per-frame animations; never `setInterval` inside R3F.
- Apply post-processing via `<EffectComposer>` from `@react-three/postprocessing`.
- Use `<Float>` from drei for idle hover animations on objects.

---

## Performance Rules

- Lazy-load heavy canvas sections with `next/dynamic` and `ssr: false`.
- Use `next/image` for all raster images.
- 3D model files go in `/public`; load via `useGLTF` with `useGLTF.preload()`.
- Keep initial JS bundle lean — defer non-critical animations.

---

## Content Data Shape

All portfolio content is typed and centralized in `constants/`:

```ts
// types/index.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

export interface Experience {
  title: string;
  company: string;
  date: string;
  points: string[];
  icon: string;
}
```

---

## Key Context: Owner

Justin Kim — CS student, aspiring SWE/MLE. Portfolio sections: Hero, About, Experience, Projects, Skills/Tech, Contact. Projects to highlight: QuizClash, MadLease, FlixFinder (from v2) plus ML/AI projects.
