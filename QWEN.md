# Shokii — Landing Page React

## Project Overview

**Shokii Landing Page** is a React-based landing page application built with **Vite + TypeScript + React**. It serves as the marketing/landing page for the Shokii product, featuring a modern design system with pink/purple gradient aesthetics.

### Key Features
- Two routed pages: Main landing page (`/`) and KISS purchase page (`/kiss`)
- Client-side routing via `react-router-dom`
- Responsive design with breakpoints at 1024px, 768px, and 480px
- SEO optimized with meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- Accessibility: ARIA attributes, keyboard navigation, screen reader support
- Scroll animations via custom `useReveal` hook
- Font Awesome icons (CDN) and Poppins font

## Technologies

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Language | TypeScript 6 |
| Routing | react-router-dom 7 |
| Linting | ESLint (eslint.config.js) |
| Font | Poppins (400–800) |

## Project Structure

```
src/
├── assets/              # Static assets (images, icons)
├── components/
│   ├── layout/          # Header, Footer, KissHeader, KissFooter
│   ├── sections/        # Hero, Features, About, HowItWorks, Download,
│   │                    # Testimonials, Contact, Kiss* (KISS page sections)
│   └── ui/              # Reusable UI: Reveal, GradientButton, StoreButton
├── constants/           # Static data (features, testimonials, plans, meta)
├── hooks/               # Custom hooks: useReveal, useScrollSpy, useMediaQuery, usePageMeta, useJsonLd
├── lib/                 # Utility functions (formatNumber, formatPrice)
├── styles/              # CSS: globals.css, kiss.css
├── types/               # TypeScript interfaces
├── App.tsx              # Routing + page composition
├── KissPage.tsx         # KISS page component
└── main.tsx             # Entry point
```

## Design System

| Token | Value |
|-------|-------|
| Pink | `#FF1F78` |
| Purple | `#A333C8` |
| Dark | `#1A1A2E` |
| Gradient | `linear-gradient(135deg, #FF1F78 0%, #A333C8 100%)` |
| Font | Poppins (400–800) |
| Breakpoints | 1024px, 768px, 480px |

CSS custom properties are defined in `src/styles/globals.css` under `:root`.

## Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:5173)
npm run dev

# Production build (TypeScript + Vite)
npm run build

# Run ESLint
npm run lint

# Preview production build locally
npm run preview
```

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing Page | Hero, Features, About, How It Works, Download, Testimonials, Contact |
| `/kiss` | KISS Page | Purchase flow with plan selection, payment form, reassurance |

## Development Conventions

- **TypeScript**: Full type safety with interfaces in `src/types/` and `.tsx` file extensions
- **Component Organization**: Components are organized by type (layout, sections, ui) under `src/components/`
- **Custom Hooks**: Reusable logic extracted into hooks (`useReveal` for scroll animations, `useScrollSpy` for navigation, `useMediaQuery` for responsive behavior)
- **Static Data**: Content constants are separated into `src/constants/` for maintainability
- **CSS Architecture**: Global styles in `globals.css`, KISS-specific styles in `kiss.css`; uses CSS custom properties and utility classes
- **SEO**: Each page has unique title, meta description, canonical URL, Open Graph tags, and JSON-LD structured data (Organization + SoftwareApplication)

## Dependencies

### Runtime
- `react` ^19.2.4
- `react-dom` ^19.2.4
- `react-router-dom` ^7.14.0

### Dev
- `typescript` ~6.0.2
- `vite` ^8.0.4
- `@vitejs/plugin-react` ^6.0.1
- `eslint` ^9.39.4
- `eslint-plugin-react-hooks` ^7.0.1
- `eslint-plugin-react-refresh` ^0.5.2
- `globals` ^17.4.0
