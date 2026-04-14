# Shokii — Landing Page React

Application React de la landing page Shokii, construite avec **Vite + TypeScript + React**.

## 🚀 Installation

```bash
cd shokii-lp-react
npm install
```

## 📦 Développement

```bash
npm run dev
```

Ouvre `http://localhost:5173` dans ton navigateur.

## 🏗️ Build production

```bash
npm run build
```

Le dossier `dist/` contient les fichiers statiques prêts au déploiement.

## 🌐 Routes

| Route | Page |
|-------|------|
| `/` | Landing page principale |
| `/kiss` | Page d'achat de KISS |

## 📁 Architecture

```
src/
├── app/              # Non utilisé (routing dans App.tsx)
├── components/
│   ├── layout/       # Header, Footer, KissHeader, KissFooter
│   ├── sections/     # Hero, Features, About, HowItWorks, Download,
│   │                 # Testimonials, Contact, Kiss* (page KISS)
│   └── ui/           # Reveal, GradientButton, StoreButton
├── constants/        # Données statiques (features, testimonials, plans...)
├── hooks/            # useReveal, useScrollSpy, useMediaQuery
├── lib/              # Utils (formatNumber, formatPrice)
├── styles/           # globals.css, kiss.css
├── types/            # Interfaces TypeScript
├── App.tsx           # Routing + assemblage des pages
├── KissPage.tsx      # Page KISS complète
└── main.tsx          # Point d'entrée
```

## 🎨 Design System

| Token | Valeur |
|-------|--------|
| Pink | `#FF1F78` |
| Purple | `A333C8` |
| Dark | `#1A1A2E` |
| Gradient | `linear-gradient(135deg, #FF1F78 0%, #A333C8 100%)` |
| Font | Poppins (400–800) |
| Breakpoints | 1024px, 768px, 480px |

## 🔧 Dépendances

| Dépendance | Pourquoi |
|---|---|
| `react-router-dom` | Routing client-side (/ et /kiss) |
| `font-awesome` (CDN) | Icônes cohérentes avec le site existant |

## ✅ Checklist SEO

- [x] `<title>` unique et descriptif par page
- [x] `<meta name="description">` optimisé
- [x] `<meta name="keywords">` et `<meta name="robots">`
- [x] `lang="fr"` sur le `<html>`
- [x] Open Graph tags (og:title, og:description, og:image, og:type, og:locale, og:url)
- [x] Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- [x] `<link rel="canonical">` par page
- [x] Hiérarchie des titres respectée (1 H1 unique par page, H2/H3 logiques)
- [x] Attributs `alt` descriptifs sur toutes les images
- [x] Attributs ARIA sur les éléments interactifs (aria-expanded, aria-label, aria-hidden)
- [x] Navigation clavier fonctionnelle
- [x] Lazy loading sur les images hors viewport (via IntersectionObserver dans useReveal)
- [x] Données structurées JSON-LD (Organization + SoftwareApplication)
- [x] URLs propres (/ et /kiss)
