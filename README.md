# PRADAP PRADA

Elegant gemstone and jewelry web experience built with Next.js App Router, featuring discovery, personalization, and storytelling in one luxury-inspired interface.

## Highlights

- Curated homepage with hero, brand story, featured categories, and CTAs
- Gem marketplace with search, advanced filters, and detail modal
- Personalization flow for ring, necklace, pendant, earring, and bracelet
- Gem personality quiz with result flow and share-card API
- Ready-made collection, support pages, auth pages, cart, checkout, and order pages

## Product Areas

| Area | Route | Description |
| --- | --- | --- |
| Home | `/` | Brand-led landing page and key navigation |
| Marketplace | `/marketplace` | Browse gemstones with filters and search |
| Customize | `/customize` | Choose jewelry type and personalize with gems |
| Quiz | `/quiz` | Discover your matching gemstone profile |
| Ready-made | `/ready-made` | Explore complete jewelry pieces |
| Checkout Flow | `/cart`, `/checkout`, `/orders` | Purchase and order journey |
| Support | `/support/*` | Care, returns, custom orders, and sizing |

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Radix UI primitives (via shadcn-style component system)
- Framer Motion for interaction
- Next OG image generation for share cards

## Local Development

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

App runs at:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run lint checks

## Project Structure

```text
app/            Next.js routes and layouts
components/     Reusable UI and feature components
lib/            Domain data, helpers, and business logic
hooks/          Shared custom React hooks
public/         Static assets (images, fonts, 3D assets)
styles/         Additional global styling
```

## Design Notes

- Luxury visual direction using serif typography and warm neutral palettes
- Bilingual-friendly content in parts of the UX (Thai + English)
- Componentized architecture for scalable feature additions

## Deployment

This project is ready to deploy on Vercel or any Node-compatible platform that supports Next.js 16.

## Repository

GitHub: https://github.com/PinturaW/Pradap-Prada
