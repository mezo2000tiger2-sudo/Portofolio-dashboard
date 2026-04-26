# Gemini Project Context: Dashboard

This project is a modern administrative dashboard built with Next.js, leveraging advanced features of React 19 and Next.js 16 (experimental/edge versions as per `package.json`).

## Project Overview

*   **Purpose:** An experimental dashboard for managing posts, users, and comments.
*   **Main Technologies:**
    *   **Framework:** Next.js 16.2.4 (App Router)
    *   **Library:** React 19.2.4
    *   **Styling:** Tailwind CSS v4
    *   **State Management:** TanStack React Query (v5)
    *   **UI Components:** Radix UI, Shadcn UI
    *   **Icons:** Lucide React
    *   **Fonts:** Geist, Geist Mono, Inter
*   **Architecture:**
    *   `src/app`: App Router pages and layouts.
    *   `src/app/_components`: Local components specific to the dashboard pages.
    *   `src/components/ui`: Shared, reusable UI components (Shadcn UI).
    *   `src/lib`: Utility functions (e.g., `cn` for Tailwind classes).
    *   `src/types`: TypeScript interface definitions.
    *   `src/app/Providors.tsx`: Client-side provider wrapper (QueryClientProvider).

## Building and Running

*   **Development:** `npm run dev`
*   **Build:** `npm run build`
*   **Start Production:** `npm run start`
*   **Linting:** `npm run lint`

## Development Conventions

*   **Component Pattern:** 
    *   Prefer Functional Components with TypeScript.
    *   Use `"use client"` directive at the top of files that utilize hooks (React Query, useState, etc.).
    *   Place component-specific sub-components in `_components` folders within the relevant route directory to keep the main `components` directory clean.
*   **Data Fetching:**
    *   Use TanStack React Query for all external data fetching.
    *   Define query functions and keys clearly.
    *   Current data source is [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
*   **Styling:**
    *   Utility-first CSS using Tailwind CSS v4.
    *   Use the `cn` utility from `src/lib/utils.ts` for dynamic class merging.
    *   Follow Shadcn UI patterns for consistency.
*   **Type Safety:**
    *   Define shared interfaces in `src/types`.
    *   Explicitly type component props and data fetching results.

## Critical Warnings

*   **Next.js Version:** As noted in `AGENTS.md`, this project uses a version of Next.js with potential breaking changes and non-standard APIs compared to standard training data (v16.2.4). Always verify API compatibility with the local `node_modules`.
