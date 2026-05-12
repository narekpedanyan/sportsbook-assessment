# Sportsbook Assessment

A production-quality live sportsbook application built with Next.js App Router. Features real-time odds updates, a persistent bet slip, and a responsive layout for both desktop and mobile.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Client State | Zustand |
| Server State | TanStack Query |
| Forms | React Hook Form + Zod |
| Package Manager | pnpm |

## Features

- **Sports Lobby** — server-rendered grid of sports with live/upcoming event counts
- **Live Events** — events grouped by competition with real-time odds polling every 2s
- **Odds Animations** — green flash on shortening odds, red on drifting
- **Bet Slip** — persistent sidebar (desktop) / bottom drawer (mobile) with singles and accumulator support
- **Stake Validation** — configurable min/max stake with Zod schema and potential return calculation
- **Bet Confirmation** — AlertDialog → toast success flow
- **Theme Switcher** — light/dark mode, system-aware, no hydration flash
- **Responsible Gambling Banner** — dismissible, with live session timer
- **Loading Skeletons** — pixel-matched skeletons for lobby and sport pages

## Getting Started

```bash
pnpm install
pnpm playwright install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm lint         # run ESLint
pnpm lint:fix     # fix lint errors
pnpm format       # format with Prettier
pnpm format:check # check formatting
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & API routes
├── components/
│   ├── core/             # App-wide layout components (Header, StickyHeader, SportEvents, ThemeSwitcher)
│   ├── shared/           # Reusable domain components (EventRow, OddsButton, SportCard, BetSlipCard, MatchClock)
│   └── ui/               # shadcn/ui primitives
├── features/             # Feature modules (BetSlip, ResponsibleGamblingBanner)
├── stores/               # Zustand stores
├── providers/            # React context providers
├── lib/                  # Utilities, config, and API fetch functions
└── types/                # TypeScript interfaces
```