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

- `src/app/` – Next.js app directory (routing, layouts, pages)
- `src/components/` – UI components (atoms, molecules, organisms, templates)
- `src/actions/` – Server actions for data fetching and user management
- `src/hooks/` – Custom React hooks (auth, debounce, OTP, etc.)
- `src/utils/` – Utility functions
- `src/validations/` – Zod schemas for form validation
- `src/conifg/` – Config-driven UI for auth forms

---

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Lint code

---
