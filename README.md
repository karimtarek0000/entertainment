# Entertainment-trailer

A modern, full-stack web application for browsing, searching, and bookmarking
movies and TV series trailers. Built with Next.js, React, Clerk authentication,
and Tailwind CSS.

## Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Clerk** (Authentication)
- **Headless UI**
- **Zod** (Validation)
- **React YouTube**

## Features

- **Authentication**: Secure sign up, login, and email verification using Clerk.
- **Dashboard**: Browse trending and recommended movies and TV series.
- **Search**: Real-time search for movies, series, and bookmarks.
- **Bookmarks**: Save and manage your favorite trailers.
- **Media Player**: Watch YouTube trailers directly in the app.
- **Responsive UI**: Clean, modern, and mobile-friendly design.
- **Config-driven Forms**: Auth forms are generated from a JSON config.
- **Skeleton Loading**: Smooth loading experience with skeleton cards.
- **API Integration**: Fetches data from a REST API (see `.env` for `API_URL`).

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd entertainment
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   - Copy `.env` and update `API_URL` and Clerk keys as needed.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Project Structure

```
entertainment/
│
├── public/
│   ├── logo.svg
│   └── icons/
│       └── sprite.svg
│
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles (Tailwind)
│   │   ├── layout.tsx          # Root layout
│   │   ├── middleware.ts       # Route protection logic
│   │   ├── auth/
│   │   │   ├── layout.tsx      # Auth layout
│   │   │   ├── page.tsx        # Login page
│   │   │   └── sign-up/
│   │   │       └── page.tsx    # Sign up page
│   │   └── dashboard/
│   │       ├── layout.tsx      # Dashboard layout
│   │       ├── page.tsx        # Dashboard home (Trending/Recommended)
│   │       ├── bookmarks/
│   │       │   └── page.tsx    # Bookmarks page
│   │       ├── movies/
│   │       │   └── page.tsx    # Movies page
│   │       └── series/
│   │           └── page.tsx    # TV Series page
│   ├── actions/
│   │   ├── resourcess.ts       # Data fetching for movies/series
│   │   └── user.ts             # User/bookmark actions
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button.tsx
│   │   │   └── Input.tsx
│   │   ├── molecules/
│   │   │   ├── AuthForm.tsx
│   │   │   ├── AuthVerify.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── DropDown.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── MediaPlayer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── NotFoundContent.tsx
│   │   │   ├── RenderSVG.tsx
│   │   │   ├── Search.tsx
│   │   │   └── skeleton/
│   │   │       └── SkeletonCard.tsx
│   │   ├── organisms/
│   │   │   ├── CardWrapper.tsx
│   │   │   └── Header.tsx
│   │   └── templates/
│   │       └── Dashboard.tsx
│   ├── conifg/
│   │   └── configDrivenUI.auth.json  # Auth form config
│   ├── context/                # (empty or for React context)
│   ├── hooks/
│   │   ├── CounterOTP.ts
│   │   ├── Debounce.ts
│   │   ├── Login.ts
│   │   └── SignUp.ts
│   ├── utils/
│   │   ├── index.ts
│   │   └── twMerge.ts
│   ├── validations/
│   │   └── auth.schema.ts
│   └── index.d.ts             # TypeScript global types
│
├── .env                       # Environment variables
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── next.config.ts
└── README.md
```

**Key folders:**

- `public/` – Static assets (logo, SVGs)
- `src/app/` – App routes, layouts, and pages
- `src/components/` – UI components (atomic design)
- `src/actions/` – Server actions for data and user
- `src/hooks/` – Custom React hooks
- `src/utils/` – Utility functions
- `src/validations/` – Zod schemas for validation
- `src/conifg/` – Config-driven UI (auth forms)

---

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Lint code

---
