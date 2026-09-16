# AGENTS.md — NESTRA

## Project Mission
Build NESTRA as a portfolio-grade Turkish website and admin application for a fictional premium modular living-space manufacturer in Türkiye.

Before implementing or changing architecture, read this file and `PROJECT_BRIEF.md`. Treat both as the project constitution. If a requested change conflicts with them, flag the conflict before making broad changes.

## Working Rules
- Use TypeScript throughout.
- Use Next.js App Router.
- Prefer React Server Components by default.
- Add `"use client"` only where browser-side interaction, state, effects, or client-only animation requires it.
- Keep Client Component boundaries as small as practical.
- Use functional React components.
- Use Tailwind CSS v4 for styling.
- Use shadcn/ui primitives when useful, especially for forms, dialogs, tables, dropdowns, and the admin application.
- Do not let the public website inherit a generic shadcn/SaaS visual style.
- Use Motion only for purposeful, restrained interaction and animation.
- Respect `prefers-reduced-motion`.
- Use Next/Image for production imagery where appropriate.
- Use Supabase for database and admin authentication.
- Use Zod for validation and React Hook Form for substantial interactive forms.
- Prefer accessible semantic HTML and keyboard-accessible interactions.
- Build mobile-first and test responsive behavior.
- Avoid unnecessary dependencies.
- Avoid premature abstractions and oversized components.
- Extract reusable components when there is a real repeated pattern.
- Do not modify unrelated files while completing a focused task.
- Do not invent product facts, prices, certifications, guarantees, addresses, phone numbers, or legal claims.

## Language
The entire user-facing product is Turkish:
- navigation
- headings and body copy
- buttons
- forms
- validation/error messages
- admin dashboard
- metadata/SEO copy

Code stays professional English:
- component names
- variables/functions
- file names
- database names
- TypeScript types

## Quality Bar
This must not look like a template, generic AI-generated landing page, or generic SaaS dashboard.

Priorities:
1. Strong visual hierarchy
2. Architectural/editorial character
3. Performance
4. Accessibility
5. Responsive quality
6. Maintainable code
7. Purposeful motion

Avoid:
- excessive rounded cards
- pill buttons everywhere
- animation on every element
- scroll hijacking
- mouse followers/custom cursor gimmicks
- gratuitous WebGL/3D
- excessive glassmorphism
- fake testimonials or fake business metrics
- placeholder content presented as real company facts

## Visual Implementation
Current V1 design tokens and direction are defined in `PROJECT_BRIEF.md`.

Do not silently replace the agreed typography, palette, model identity, page structure, or brand direction with personal design choices.

The V1 design can be refined during implementation when the real UI exposes a problem, but changes should be deliberate rather than arbitrary.

## Motion
Appropriate:
- subtle entrance/reveal
- restrained image reveal
- small image scale on hover
- arrow/CTA micro-interactions
- subtle navbar transition
- gallery transitions
- very light parallax/scroll-linked effects in selected areas

Avoid:
- scroll hijacking
- constant movement
- large text flying around the screen
- animation that delays access to content
- heavy 3D unless explicitly approved later

## Data Architecture
Initial application data:
- `models`: NESTRA product/model information
- `quote_requests`: quote/contact leads and their status
- Supabase Auth: admin authentication

The public website should read product information from the application data layer rather than duplicating product facts throughout components.

Do not create fake payment, checkout, customer account, favorites, or blog systems unless scope is explicitly expanded later.

## Admin
The admin area is a real functional part of the portfolio project, not a visual mockup.

Expected capabilities:
- dashboard overview
- models CRUD
- quote request list/detail
- quote status management
- image/content management where appropriate

Initial quote statuses:
- Yeni
- İletişime Geçildi
- Teklif Gönderildi
- Satış

## Verification
After meaningful implementation work:
- run lint
- run TypeScript/type checks when available
- run relevant tests when added
- report errors rather than hiding them
- check responsive behavior for major public pages

When a task is broad, first explain the intended changes and files. Prefer small, reviewable implementation steps.
