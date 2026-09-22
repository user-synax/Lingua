# Lingua

A serious language-learning platform where a realistic AI teacher runs scheduled live classes in a video room — with a shared board and doubts answered on the spot.

The bundle is the product: **plan + timetable + live 60-minute group class + doubts answered live + recap/homework + can-do evidence.** No XP, streaks, mascots, or hearts — progress is evidence, not points.

> Source of truth for product and design: [`PRD.md`](./PRD.md) (v0.1) and [`DESIGN.md`](./DESIGN.md) (“Lattice” design system). This README describes the code as it is; where code and PRD differ, it says so.

## Status

Pre-launch build working toward the PRD’s Phase 0 spike → 6-week private beta (one language, groups of 4). Honest snapshot of what exists:

| Area | State |
|---|---|
| Email auth + onboarding capture | Live (`/login`, `/signup`, `/onboarding`) |
| Placement mock (10-min flow, client-scored A1–B2) | Live (`/placement`, clearly labeled mock) |
| Reality check (goal × deadline × hours verdict, placement-aware) | Live (`/plan`) |
| Dashboard + video room join (LiveKit + lobby device check) | Live (`/dashboard`, `/room/[roomName]`) |
| AI tutor avatar, Board sync, captions, doubts queue | Stubs in the room UI — planned |
| Recap, homework, spaced-repetition deck, checkpoints | Planned |
| Can-do progress, billing (Stripe/UPI), admin console | Planned |

## Tech stack

| Layer | Reality in this repo |
|---|---|
| Frontend | Next.js 16.3.5 + React 19 + Tailwind CSS v4, `bun` runtime |
| Realtime | LiveKit (client SDK in frontend, server SDK in backend) |
| Backend | Express 4 + Mongoose/MongoDB, JWT cookie auth with rotation, zod validation, helmet + rate limits |
| Docs | `PRD.md`, `DESIGN.md` (Lattice: parchment `#f7f6f2`, forest ink `#001f1f`, Inter) |

> Divergence note: PRD §10 recommends Postgres; the backend in this repo currently uses MongoDB via Mongoose. Treat the code as truth until the owner decides.

## Structure

```
Lingua/
├── README.md            # you are here
├── PRD.md               # product requirements (v0.1)
├── DESIGN.md            # Lattice design system
├── frontend/            # Next.js app (App Router)
│   ├── app/             # routes: /, login, signup, onboarding, placement,
│   │                    #   plan, dashboard, account, room, privacy
│   ├── components/      # guards, nav, plan, placement, room, ui
│   ├── lib/             # api.js (backend client), plan.js, placement.js
│   └── context/         # AuthContext
└── backend/             # Express API
    └── src/
        ├── routes/      # auth, onboarding, rooms, user
        ├── controllers/ # auth, onboarding, rooms, user
        ├── models/      # User (auth + onboarding), Room
        ├── schemas/     # zod validation
        ├── middleware/  # auth, error, validate
        └── config/      # db, env
```

## Prerequisites

- `bun` 1.x (repo standard; `node` 20+ also runs the backend)
- MongoDB reachable at `MONGODB_URI` (local `mongodb://127.0.0.1:27017/lingua` works)
- A LiveKit Cloud project (URL + API key/secret) for video rooms — without it, room creation returns `503` by design

## Quickstart

```bash
# 1. Backend (port 5000)
cd backend
cp .env.example .env   # then fill secrets + LiveKit creds (see table below)
bun install
bun run dev

# 2. Frontend (port 3000) — in a second terminal
cd frontend
bun install
bun run dev            # NEXT_PUBLIC_API_URL defaults to http://localhost:5000
```

Open [http://localhost:3000](http://localhost:3000). Signup → onboarding → placement → plan → dashboard → room.

## Environment

Backend (`backend/.env`, see [`.env.example`](./backend/.env.example)):

| Variable | Purpose |
|---|---|
| `PORT` | Backend port (default `5000`) |
| `MONGODB_URI` | Mongo connection string |
| `ACCESS_TOKEN_SECRET` / `REFRESH_TOKEN_SECRET` | JWT secrets (≥32 chars) |
| `ACCESS_TOKEN_EXPIRES_IN` / `REFRESH_TOKEN_EXPIRES_IN` | Token lifetimes (`15m` / `7d`) |
| `FRONTEND_URL` | Allowed CORS origin (`http://localhost:3000`) |
| `COOKIE_SECURE` | `false` locally, `true` behind HTTPS |
| `LIVEKIT_URL` / `LIVEKIT_API_KEY` / `LIVEKIT_API_SECRET` | LiveKit Cloud credentials |

Frontend: `NEXT_PUBLIC_API_URL` (optional; defaults to `http://localhost:5000`).

## API overview

Base: `{API_URL}/api`. Auth is JWT in cookies (`credentials: "include"`).

| Method & path | Purpose |
|---|---|
| `POST /auth/signup`, `/auth/login`, `/auth/logout` | Email auth |
| `GET /auth/me`, `POST /auth/refresh` | Session + rotation |
| `POST /auth/verify`, `/auth/resend-code`, `/auth/forgot-password`, `/auth/reset-password` | Verification + recovery |
| `GET /user/me`, `PATCH /user/me`, `DELETE /user/me` | Profile (name-only edit, self-serve deletion) |
| `GET /onboarding`, `PUT /onboarding` | Goal capture (target, goal, deadline, hours, availability, timezone) |
| `GET /rooms`, `POST /rooms` | List / create rooms |
| `GET /rooms/:name`, `POST /rooms/token` | Room detail + LiveKit join token |

## Scripts & verification

| Where | Command | Purpose |
|---|---|---|
| `frontend/` | `bun run dev` | Dev server (`:3000`) |
| `frontend/` | `bun run build` | Production build — must pass before every PR |
| `frontend/` | `bunx eslint <touched files>` | Lint touched files — must be clean |
| `backend/` | `bun run dev` | Dev server with watch (`:5000`) |
| `backend/` | `bun run start` | Production start |

## Contributing

- Never work on `main`. `git checkout main` → `pull` → `git checkout -b feat/<name>` → small atomic commits → verify → push → open PR → teammate review → merge → delete branch.
- Frontend and backend are separate ownership areas: every PR states what it touched, and backend files never ride along in a frontend PR (and vice versa).
- One micro-task per PR: small diffs, conventional commits (`feat:`, `fix:`, `style:`, `refactor:`, `chore:`, `docs:`), easy review, easy rollback.
- UI follows `DESIGN.md`; product behavior follows `PRD.md`. No XP/streaks/gamification — ever.
- Merges are done by the teammate reviewer, not the author.

## Docs

- [`PRD.md`](./PRD.md) — what we build and why (v0.1, 21 Sep 2026)
- [`DESIGN.md`](./DESIGN.md) — Lattice design system (tokens, components, rhythms)
