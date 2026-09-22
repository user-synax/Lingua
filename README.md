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
