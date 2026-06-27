# Avior Watches

Luxury watch e-commerce platform built with Next.js 14, Tailwind CSS, Zustand, and PostgreSQL.

## Features

- Luxury storefront with collection browsing and product detail pages
- Persistent cart with local storage
- Checkout flow with Stripe-ready placeholder endpoint
- Secret admin area with login guard
- Product CRUD and store settings management
- PostgreSQL-backed persistence for products and settings

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand
- PostgreSQL
- GSAP
- Framer Motion

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Update `.env.local` with your local values:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_PLACEHOLDER
STRIPE_SECRET_KEY=sk_test_PLACEHOLDER
NEXT_PUBLIC_SITE_URL=https://avior.vercel.app
ADMIN_USERNAME=admin
ADMIN_PASSWORD=avior2025
DATABASE_URL=postgresql://postgres:hassan123@localhost:5432/postgres
```

If you prefer a separate database, create one in pgAdmin and update `DATABASE_URL` to match it.

### 3. Run the app

```bash
npm run dev -- --port 3000
```

### 4. Build for production

```bash
npm run build
```

## PostgreSQL Setup

The app will auto-create the required tables on first connection:

- `products`
- `settings`

It also seeds those tables from the JSON files in `data/` the first time it connects.

### pgAdmin quick setup

1. Connect to your local PostgreSQL server.
2. Make sure the database referenced by `DATABASE_URL` exists.
3. If needed, create a database such as `avior`.
4. Run the app once so it can create and seed the tables.

## Admin Access

- Open the site and click `الخليل` in the footer five times.
- Sign in with the admin credentials from `.env.local`.

## Notes

- JSON files in `data/` are still used as seed data and fallback.
- For Vercel production writes, a dedicated managed database is recommended.
- The current checkout route is a placeholder and should be wired to live Stripe credentials before accepting real payments.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build the app
- `npm run start` - start the production server
- `npm run lint` - run linting

