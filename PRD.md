# PRD: Lingua (working title)

|               |                                          |
| ------------- | ---------------------------------------- |
| Status        | Draft v0.1, for founder review           |
| Date          | 21 Sep 2026                              |
| Companion doc | `DESIGN.md` (UX, screens, design system) |
| Name          | "Lingua"                                 |

---

## 1. Summary

**One-liner.** A serious language-learning platform where a realistic AI teacher runs scheduled live classes in a video room, with a shared board and doubts answered on the spot, for learners of any language.

**How it works**

1. The learner picks a language and a goal. The platform places them at a level and builds a weekly timetable.
2. At class time they join a Meet-style room. An AI tutor (voice, face, board) teaches a 60-minute class to a small group.
3. Every doubt is answered live, at the moment it appears.
4. After class: notes, the learner's own corrections, short homework, and progress measured by what they can now do. No streaks, no XP.
5. The promise: the structure and accountability of a real school, at a fraction of a human tutor's cost.

**Why this can win.** General-purpose AI voice apps can already chat in almost any language. What they do not give a serious learner is a plan, a schedule, a class, accountability and evidence of progress. That bundle is the product, not the conversation itself. In my research pass, Duolingo's Video Call is 1:1 and short (roughly 1 to 3 minutes per call) and sits behind its top tier, Speak is audio-first practice, and Praktika sells 1:1 avatar conversation. I did not find a major player selling a structured, scheduled, multi-learner class taught by an AI. Verify that with a deeper app-store and web scan before you commit money.

**Three hard truths (read before anything else)**

1. **The economics live or die on class design.** At today's reported prices, a 1:1 AI video tutor costs roughly $4 to $40 per hour depending on vendor (central guess about $14). Human tutors on the big marketplaces run about $10 to $30 per hour. So "many students in one class" is not a feature. It is the business model. See Section 11.
2. **The AI has to be right.** One confidently wrong grammar rule destroys trust with serious learners. Curriculum grounding, a verifier and a "flag this" loop are P0, not polish. See Section 9.
3. **Speech tech hides learner errors.** Standard speech recognition and LLMs tend to "understand through" mistakes, which is exactly what a teacher must catch. You need verbatim transcription plus phoneme-level pronunciation scoring. See Section 10.

**First bet.** A 6-week private beta: 30 to 50 serious learners, one language, groups of 4, measuring attendance, perceived teaching quality, progress and cost per student-hour. Before that, a 2-week technical spike (Section 14).

---

## 2. Problem

| Pain                                               | Detail                                                                                                                                                                                                                              |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Doubts have nowhere to go                          | A learner hits a question mid-study (why this word order, why this ending). No teacher is there, forums are slow, so they guess or move on and the mistake sticks. This is the founder's own experience and the origin of the idea. |
| Gamified apps optimise for streaks, not competence | Serious learners (job, exam, relocation, family) want explanations, depth and real speaking practice, not points.                                                                                                                   |
| Human tutors do not scale for the learner          | Typically $10 to $30 per hour, plus scheduling across time zones and large quality variance.                                                                                                                                        |
| Self-study collapses without structure             | No timetable, no teacher expecting you, no cohort, no consequences for skipping.                                                                                                                                                    |

---

## 3. Vision and positioning

**Vision.** Every learner gets a patient teacher, a timetable and a classroom, in any language, at any hour.

**Positioning.** For serious adult learners who want to actually use a language, Lingua is a live-class platform taught by an AI teacher. Unlike gamified apps (short lessons, streaks) or open-ended AI chat (no structure), it gives you a timetable, a class, a teacher who answers every doubt live, and proof of progress.

**What it is not**

| Not this                  | Why                                                                                           |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| A Duolingo clone          | No XP, hearts, leaderboards or mascots. Progress is evidence, not points.                     |
| A chatbot with a face     | A class has a plan, timing, a group and accountability.                                       |
| A tutor marketplace       | v1 has no human tutors to recruit, vet and schedule. Human review is a later add-on.          |
| A Google Meet integration | You build your own room (Section 10). "Meet-like" describes the experience, not the plumbing. |

---

## 4. Goals and non-goals

| Goal (first 12 months)       | Measured by                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Learners improve measurably  | Speaking-rubric gain and can-do statements demonstrated (Section 13)                                               |
| Feels like a real class      | Voice latency p50 at most 1.0 s; teaching rating at least 4.2 / 5                                                  |
| Trustworthy content          | At least 97% correct in blind native-rater audits                                                                  |
| Sustainable unit economics   | At least 60% gross margin at the price charged                                                                     |
| Repeatable language launches | Language kit (ASR/TTS evaluation, native reviewers, lesson packs) that ships language #4 onward in 6 weeks or less |

**Non-goals for v1**

- No gamification: no XP, hearts, gems, streak counters, leaderboards, confetti, mascots.
- No human-tutor marketplace.
- No learners under 18.
- No "any language" at launch. Launch with 1 to 2 and earn the rest (Section 17).
- No native mobile apps. Mobile web first.
- No official certificates. Completion certificates only, and only later.
- No integration with Google Meet or Zoom.

---

## 5. Users

**Primary segment.** Adults (18+) with a concrete reason to learn and often a deadline: career move, exam, relocation, family. Casual hobbyists are not the target; free apps already serve them.

| Persona               | Situation                                                                                              | Needs                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Maya, 28, analyst     | Needs B2 German for a job move in 9 months. Evenings only. Stalled at A2 because nothing explains why. | A realistic plan, explanations, speaking practice on a fixed schedule |
| Kenji, 35, exam taker | Needs a target English speaking score for a visa or university.                                        | Exact plan, mock tests, blunt feedback                                |
| Sofia, 42, family     | Wants to talk with her partner's family in Portuguese. Anxious about speaking in front of people.      | Patience, privacy (camera off), no embarrassment                      |

**Jobs to be done**

- When I hit a doubt while studying, I want it answered right now, so I do not fossilise a mistake.
- When I plan my week, I want a timetable that fits my life and tells me honestly what I can reach by when.
- When I speak, I want precise feedback without being embarrassed.

---

## 6. Core user journey

1. **Start.** Pick target language, own language and goal.
2. **Placement (10 to 15 min).** Listening, reading, one spoken and one written sample. Result: level band plus skill profile.
3. **Reality check and plan.** The platform compares goal, deadline and weekly hours to a planning heuristic and says plainly if they do not add up. Then it generates a syllabus and a weekly timetable.
4. **Book.** Confirm class slots. Calendar invite and reminders are created.
5. **Before class.** 10-minute review of items from the last class. Device check in the lobby.
6. **Class (60 min).** The format in Section 7.
7. **After class.** Recap page: corrections, new items, parked doubts answered, homework, transcript.
8. **Checkpoint.** Every unit: short assessment mapped to can-do statements. Progress page updates with evidence.

---

## 7. Class format v1 (60 minutes)

Design goal: maximise learner talk time while keeping the expensive avatar minutes to a minimum.

| Min      | Segment         | Mode                                              | Purpose                                                         |
| -------- | --------------- | ------------------------------------------------- | --------------------------------------------------------------- |
| 0 to 5   | Warm-up recall  | Group, avatar on                                  | Spaced review of last class items; tutor calls learners by name |
| 5 to 20  | Teach           | Group, avatar on                                  | One or two targets on the Board; doubts allowed at any time     |
| 20 to 40 | Guided practice | Per-learner audio coach or peer pairs, avatar off | Every learner speaks a lot; per-learner pronunciation scoring   |
| 40 to 52 | Production task | Small groups or individual, avatar off            | Role-play or task using the new forms                           |
| 52 to 60 | Recap           | Group, avatar on                                  | Parked doubts, top corrections, homework                        |

Avatar-on time is 28 of 60 minutes. Learner speaking time in practice segments should be at least 60%. Group size target: 4 in MVP, 8 to 12 later.

**Elastic cohorts.** A class opens when a minimum number of learners book it (for example 3). Below the minimum, offer a reschedule or a 1:1 audio session. This protects margin.

---

## 8. Functional requirements

Priority: **P0** = needed for private beta. **P1** = public beta. **P2** = later.

### 8.1 Onboarding, placement, plan

| ID   | Requirement                                                                                                              | Pri | Acceptance criteria                                                                       |
| ---- | ------------------------------------------------------------------------------------------------------------------------ | --- | ----------------------------------------------------------------------------------------- |
| ON-1 | Goal capture: target language, own language, goal type, optional deadline, weekly hours, availability windows, time zone | P0  | Done in 90 s or less; every field editable later                                          |
| ON-2 | Adaptive placement: listening, reading, spoken and written sample; returns CEFR band plus skill profile                  | P0  | On a 50-learner validation set, within one sub-level of a human rater for at least 80%    |
| ON-3 | Reality check: tell the learner plainly if goal, deadline and hours do not add up, with options                          | P0  | Shown before payment; learner can override                                                |
| ON-4 | Own-language diagnostics: common error patterns for the learner's first language                                         | P1  | Seeds the error watch-list                                                                |
| PL-1 | Syllabus generator: units to lessons, each tied to can-do statements, vocabulary, grammar                                | P0  | Every lesson has objective, target forms, examples, common own-language errors, exercises |
| PL-2 | Weekly schedule: propose class slots from open cohorts plus study blocks; learner confirms                               | P0  | Respects time zone and availability; ICS and Google Calendar sync                         |
| PL-3 | Reminders at 24 h, 1 h and 10 min before class (email and web push)                                                      | P0  | Per-channel opt-out; no guilt or loss-framing copy                                        |
| PL-4 | Missed-class flow: recording and notes available, plan re-adjusts, next slot offered                                     | P0  | Learner back on track in 2 clicks or fewer                                                |
| PL-5 | Elastic cohorts (Section 7)                                                                                              | P1  | Minimum size configurable per level and slot                                              |

### 8.2 Live class room

| ID    | Requirement                                                                                                 | Pri                         | Acceptance criteria                                                              |
| ----- | ----------------------------------------------------------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------- |
| CR-1  | Join from dashboard or link; device-check lobby; camera optional, mic required                              | P0                          | Median time to join 30 s or less                                                 |
| CR-2  | AI tutor as a participant with voice and video avatar; runs the lesson plan through timed segments          | P0                          | 60-minute class completes without human intervention in at least 95% of sessions |
| CR-3  | The Board: shared teaching surface (headings, sentences with glosses, vocab, tables, redlines, doubt cards) | P0                          | Board updates within 500 ms of the tutor referring to them; text is selectable   |
| CR-4  | Live captions in the target language; optional translation; tap any word for gloss and audio                | P0                          | Captions at most 1 s behind speech                                               |
| CR-5  | Ask a doubt: hand raise, push-to-talk or typed. Tutor acknowledges within 1.5 s, then answers or parks it   | P0                          | At least 90% of doubts answered in class or at recap                             |
| CR-6  | Learner controls: mute, slower, repeat, explain in my language, leave and rejoin                            | P0                          | Rejoin restores Board state and segment position                                 |
| CR-7  | Group turn management: hand queue, tutor calls by name, crosstalk control (server-side ducking)             | P0 (up to 4), P1 (up to 12) | No two learners' audio reaches the tutor simultaneously during a turn            |
| CR-8  | Breakouts: peer pairs and solo AI coach during practice; timers; auto-return                                | P1                          | Return to main room within 5 s                                                   |
| CR-9  | Text chat the tutor can read and answer; shared class notes                                                 | P1                          |                                                                                  |
| CR-10 | Low-bandwidth mode: audio plus Board only, suggested automatically on weak connections                      | P0                          | Class remains usable with video off at around 300 kbps down                      |
| CR-11 | Learner shares an image or document for discussion                                                          | P2                          |                                                                                  |
| CR-12 | Recording with consent for the learner's own review; deletion on request                                    | P0                          | Deletion completes within 24 h                                                   |

### 8.3 Tutor intelligence

| ID   | Requirement                                                                                                  | Pri                          |
| ---- | ------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| TI-1 | Lesson-pack grounding: the tutor teaches from a vetted lesson pack and retrieves reference entries for rules | P0                           |
| TI-2 | Correction policy engine (Section 9.3)                                                                       | P0                           |
| TI-3 | Verbatim transcript plus phoneme-level pronunciation assessment per learner track                            | P0 transcript, P1 phoneme UI |
| TI-4 | Persistent learner model (errors, vocabulary, pronunciation issues, goals, interests)                        | P0                           |
| TI-5 | Verifier for claims outside the lesson pack (checks against reference or hedges)                             | P0                           |
| TI-6 | Adaptive pacing from response time and error rate. Never from face or emotion detection.                     | P1                           |
| TI-7 | Safety: scope limits, prompt-injection resistance, moderation                                                | P0                           |
| TI-8 | "Flag this" on any tutor statement, feeding a review queue                                                   | P0                           |

### 8.4 After class and practice

| ID   | Requirement                                                                           | Pri |
| ---- | ------------------------------------------------------------------------------------- | --- |
| AC-1 | Recap page: key items, my corrections, parked doubts answered, talk share, transcript | P0  |
| AC-2 | Homework: 10 to 15 minutes targeted at my errors; written work gets feedback          | P0  |
| AC-3 | Auto-built spaced-repetition deck from my mistakes and new items                      | P0  |
| AC-4 | Study room: on-demand 1:1 audio-only practice with the AI (cheap tier)                | P1  |
| AC-5 | Unit checkpoints and mock speaking test                                               | P1  |

### 8.5 Progress

| ID   | Requirement                                                                     | Pri |
| ---- | ------------------------------------------------------------------------------- | --- |
| PR-1 | Can-do progress with evidence (transcript excerpts, clips)                      | P0  |
| PR-2 | Skill snapshot for speaking, listening, reading, writing with confidence ranges | P0  |
| PR-3 | Attendance register: plain record, no streaks, XP or leaderboards               | P0  |
| PR-4 | Weekly plain-language report                                                    | P1  |
| PR-5 | Completion certificate (not an official qualification)                          | P2  |

### 8.6 Account, billing, admin

| ID   | Requirement                                                                                   | Pri |
| ---- | --------------------------------------------------------------------------------------------- | --- |
| AD-1 | Auth (email and Google), profile; interface language separate from target language            | P0  |
| AD-2 | Subscription, trial, refunds; Stripe plus local payment methods (for example UPI in India)    | P0  |
| AD-3 | Admin console: cohorts, live session monitor, transcript search, flag queue, per-session cost | P0  |
| AD-4 | Self-serve data export and deletion                                                           | P0  |
| AD-5 | Curriculum authoring tool with native-reviewer workflow                                       | P1  |

---

## 9. AI tutor spec

### 9.1 Role

A language teacher, not a chatbot. It follows a lesson plan, manages time, teaches one or two targets per segment, checks understanding, corrects errors, answers doubts and closes with a recap.

### 9.2 Teaching rules

| #   | Rule                                                                                                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R1  | Learner talk share at least 60% in practice segments. Tutor never speaks longer than about 45 s without a learner turn.                                                                                       |
| R2  | Target-language share by level (starting hypotheses, tune with data): A1 about 55%, A2 about 70%, B1 about 85%, B2 and above about 95%. Own-language help on request.                                         |
| R3  | Check understanding about every 5 minutes with a concrete question, never "Do you understand?".                                                                                                               |
| R4  | Acknowledge a doubt within 1.5 s. Answer in about 30 s of speech with an example on the Board, or park it and say when it will be answered. If unsure, say so and point to the reference instead of guessing. |
| R5  | Personalise examples with the learner's goal, interests and past errors.                                                                                                                                      |
| R6  | Calm, respectful register. No shaming, no sarcasm, no fake enthusiasm.                                                                                                                                        |
| R7  | Groups: call learners by name, equal turns, do not favour the fluent, one-sentence catch-up for late joiners, control crosstalk.                                                                              |
| R8  | Transparency: always identifies as an AI tutor and never claims to be human when asked sincerely. Any persona backstory is minimal and labelled fictional.                                                    |
| R9  | Stay in scope. Decline harmful requests, resist "ignore your instructions" attempts, give no medical or legal advice, do not collect sensitive personal data.                                                 |

### 9.3 Correction policy

- **Accuracy drills:** correct immediately.
- **Fluency tasks:** hold corrections until the end of the turn or segment.
- **Order of escalation:** prompt self-repair ("check the verb"), then recast, then explicit rule.
- **Limit:** at most 2 corrections per learner turn. Prioritise errors that block meaning, then errors on current targets, then recurring patterns.
- **Every correction is logged** to the learner model and shown on the Board as a redline (see `DESIGN.md`).

### 9.4 Grounding and accuracy

- Every lesson has a vetted **lesson pack**: objectives, target forms, examples, common own-language errors, exercises. Generated with AI, reviewed by native speakers.
- Explanations outside the pack pass a **verifier** (second pass against reference material) or are hedged.
- **Flag this** on any tutor statement creates a review ticket. Reviewers fix the pack, not just the ticket.
- **Golden test set** per language (200+ items: explanations, corrections, translations) runs on every prompt or model change.

### 9.5 Learner model

Goal and deadline, own language, level per skill, error log (type, count, last seen), vocabulary state (spaced-repetition), pronunciation issues by phoneme, interests, preferred pace, attendance, doubt history.

### 9.6 Evaluation

- **Weekly human audit:** native or certified raters score a sample on accuracy, pedagogy and tone.
- **Automated:** talk share, latency per stage, correction rate, hallucination flags, session completion.

---

## 10. Technical approach

### 10.1 Architecture

```
Learner browser (Next.js + WebRTC SDK, PWA)
        |  WebRTC
   Room server (SFU, e.g. LiveKit) ---- recording / egress --> object storage
        |            |
        |            +-- Tutor agent (server)
        |                  VAD + turn detection
        |                  STT (verbatim) + pronunciation assessment
        |                  LLM: lesson state machine + tools (Board, timer, notes)
        |                  TTS (or speech-to-speech model)
        |
        +-- Avatar worker joins the room as a participant, publishes synced audio + video
        +-- Board sync (shared document or data channel)

Backend: API, Postgres (users, plans, cohorts, sessions, learner model, errors),
         scheduler / queue, curriculum store + vector index, billing, admin
```

### 10.2 Decisions

| Decision        | Recommendation                                                                                                                                | Why                                                                                                                                                          | Revisit when                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| Room            | Own room on an SFU such as LiveKit (open source, cloud or self-hosted). Not Google Meet.                                                      | See 10.3. Separate audio track per participant gives per-learner speech recognition and pronunciation scoring almost for free.                               | Institutional partners demand Meet |
| Agent framework | LiveKit Agents (Python) or similar                                                                                                            | Has avatar plugins; the avatar joins the room as its own participant and publishes synced audio and video, and the front end renders it like any video track | You outgrow it                     |
| Voice pipeline  | Prototype on a speech-to-speech model. Move the teacher brain to cascaded STT, LLM, TTS for production if measurements justify it.            | Speech-to-speech is fastest to build and lowest latency. Cascaded gives control, verbatim transcripts, verification hooks and better cost in long sessions.  | After Phase 0 measurements         |
| Avatar          | Buy (managed API) for MVP. Avatar must be switchable off per learner and per segment.                                                         | Reported prices span about $0.01 to $0.50 per minute (Section 11). Get written quotes.                                                                       | Avatar spend exceeds 25% of COGS   |
| Pronunciation   | Dedicated phoneme-level assessment service alongside the LLM (for example Azure Speech pronunciation assessment, Speechace or ELSA-type APIs) | General ASR and LLMs auto-correct learner errors and hide them                                                                                               | Per-language accuracy tests fail   |
| Board           | Shared document (CRDT) or data channel. The tutor writes to it with structured tool calls.                                                    | Real text (not images) so glosses, selection and translation work                                                                                            |                                    |
| Front end       | Next.js / React, PWA, mobile web first                                                                                                        | India-style networks and phones are the design target; no app-store dependency                                                                               | Retention data demands native      |
| Backend         | Postgres, object storage, a job queue, vector index for lesson packs                                                                          | Boring and sufficient                                                                                                                                        |                                    |
| Payments        | Stripe plus local methods (for example UPI in India)                                                                                          | Local payment methods drive conversion in many markets                                                                                                       |                                    |
| Observability   | Per-session trace: latency by stage, tokens, dollars, transcript                                                                              | Cost is the top risk; measure from day one                                                                                                                   |                                    |

**Keep provider interfaces thin** (STT, LLM, TTS, avatar, pronunciation) so any vendor can be swapped in a day.

### 10.3 Why not Google Meet

The Google Meet Media API is a Developer Preview that gives apps access to real-time media from a conference. Per Google's docs I found (2025), the Cloud project, the OAuth principal and all participants must be enrolled in the preview program, and the documented scope is read-only. It is about consuming streams, not publishing an avatar's video as a participant. That is not a base for a public product. Check current status, but plan on your own room.

### 10.4 Latency budget (targets)

| Stage                           | Budget                                   |
| ------------------------------- | ---------------------------------------- |
| Network up and down             | 80 to 150 ms                             |
| End-of-turn detection           | 200 to 350 ms                            |
| Speech recognition finalisation | 100 to 200 ms                            |
| LLM first token                 | 250 to 500 ms                            |
| TTS first audio                 | 100 to 250 ms                            |
| Avatar render and sync          | 100 to 300 ms                            |
| **Voice-to-voice**              | **p50 at most 1.0 s, p95 at most 1.8 s** |

A speech-to-speech model collapses the middle stages into roughly 300 to 600 ms. Mask the remaining delay in the UI (Section 7 of `DESIGN.md`).

### 10.5 Long-session reliability

- Lesson plan is a **state machine** with checkpoints: segments, goals, exit criteria. If the agent crashes, another agent resumes from the last checkpoint plus a summary.
- Summarise context every ~10 minutes. Long uncached voice sessions are reported to cost several times more than cached ones, so caching and summaries are cost controls as well as reliability controls.
- Reconnect flow restores Board and position. Test with deliberate network chaos.
- Capacity: one avatar session per class; N learner tracks. Check vendor concurrency limits before promising peak-hour capacity.

### 10.6 Build path for a very small team

Weeks 0 to 2: LiveKit Cloud and Agents, one avatar vendor, one speech-to-speech model, Next.js front end, Postgres (a hosted option such as Supabase is fine). No custom infrastructure. One lesson pack. Learn the real cost per minute before designing anything else.

---

## 11. Unit economics and pricing

**Model.** Cost per student-hour = [G x (group speech + N x listen-only ASR + avatar)] / N + I x per-learner coach, then plus 15% overhead (rooms, storage, payments). G = 28 group minutes with avatar, I = 32 individual minutes (Section 7), N = 8.

| Scenario | Group speech | Listen ASR | Avatar    | Per-learner coach | Per student-hour (with overhead) |
| -------- | ------------ | ---------- | --------- | ----------------- | -------------------------------- |
| Lean     | $0.03/min    | $0.003/min | $0.03/min | $0.03/min         | about $1.44                      |
| Central  | $0.08/min    | $0.005/min | $0.15/min | $0.05/min         | about $2.93                      |
| Heavy    | $0.15/min    | $0.010/min | $0.50/min | $0.12/min         | about $7.35                      |

**Sensitivity (central case).** N = 4: about $3.85. N = 8: about $2.93. N = 12: about $2.62. Past N of about 8, per-learner practice minutes dominate cost, not the avatar.

**Reference: the same 60 minutes as 1:1 with avatar on the whole time** costs about $4 (lean), $14 (central), $40 (heavy). That is why group classes and a hybrid class format are mandatory.

**Gross margin illustration** (12 class-hours per month):

| Monthly price | Per class-hour | Lean | Central | Heavy |
| ------------- | -------------- | ---- | ------- | ----- |
| $49           | $4.08          | 65%  | 28%     | -80%  |
| $79           | $6.58          | 78%  | 55%     | -12%  |

**Levers, ranked by impact at N = 8**

1. Cheaper per-learner practice: peer pairs for about half of practice time, repeat-after-me drills scored by pronunciation assessment with no LLM, smaller cached models.
2. Avatar only where it earns its cost (group segments), audio plus Board fallback, cheaper vendor or on-device rendering later.
3. Prompt caching and periodic context summaries in long sessions.
4. Bigger N, with breakouts to protect talk time.
5. Annual or prepaid plans to cut payment fees and churn.

**Pricing hypotheses to test**

- Anchors: human tutors $10 to $30 per hour; AI-only speaking apps around $20 per month (Speak published $20 monthly or $99 yearly in 2024).
- Core plan hypothesis: 12 class-hours per month plus unlimited asynchronous study for about $79 per month. Test $59 / $79 / $99.
- Free placement plus one trial class (cost about $3 each; cap per user).
- Lower-income markets need purchasing-power pricing, which only works on the lean cost stack.

**Price and cost caveat.** Avatar and voice prices below come mostly from vendor and third-party blog posts (Sep 2026) and vary by an order of magnitude. Treat as ranges and get written quotes in Phase 0.

---

## 12. Competitive snapshot

| Player                                        | What it is                                                | Strength                                                                            | Gap we exploit                                                                                 |
| --------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Duolingo (Max: Video Call, Roleplay)          | Gamified app with 1:1 AI video chat with a character      | Distribution, habit                                                                 | Calls last about 1 to 3 minutes, not graded, top tier only; no class, no teacher-led structure |
| Speak                                         | AI speaking tutor, audio-first, roleplay                  | Strong speaking focus; $1B valuation (Dec 2024, $78M Series C); 10M+ users reported | Practice, not a scheduled class; no shared Board; no cohort                                    |
| Praktika                                      | Realistic avatar tutors, 1:1, 9 languages, 1,000+ lessons | Avatar realism and personas; 4.8 stars on the App Store                             | 1:1 conversation; streaks and challenges are part of the product                               |
| italki / Preply / Verbling                    | Human tutor marketplaces                                  | Real humans, huge choice, about $10 to $30 per hour                                 | Cost, scheduling, quality variance                                                             |
| Lingoda-style live group classes              | Structured live classes with human teachers               | Structure and accountability                                                        | Price per class, fixed timetables, human capacity                                              |
| General AI assistants (voice and video modes) | Open-ended conversation in any language                   | Free or cheap, instant                                                              | No plan, cohort, schedule or measurable progress                                               |

**Moat candidates:** curriculum quality, cohort and schedule mechanics, learner-error data, outcomes evidence, brand for serious learners. Not the avatar and not the LLM; both are rentable by everyone.

---

## 13. Success metrics

**North star:** learners completing at least 2 live classes per week (WLC2).

| Metric                     | Definition                                                                                          | Private-beta target                  |
| -------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Activation                 | Signup to placement done to first class booked                                                      | at least 60%                         |
| First-class attendance     | Booked first class attended                                                                         | at least 75%                         |
| Week-4 retention           | Attended at least 1 class in week 4, of those who attended class 1                                  | at least 45%                         |
| Classes per active learner | Per week                                                                                            | at least 2                           |
| Learner talk share         | Practice segments / whole class                                                                     | at least 60% / at least 25%          |
| Doubt response             | Median time to first tutor response                                                                 | 2 s or less                          |
| Teaching rating            | Post-class 1 to 5                                                                                   | at least 4.2                         |
| Factual accuracy           | Blind native-rater audit of sampled explanations and corrections                                    | at least 97%                         |
| Latency                    | Voice-to-voice                                                                                      | p50 at most 1.0 s, p95 at most 1.8 s |
| Session reliability        | Classes completed without unrecoverable failure                                                     | at least 98%                         |
| Cost                       | COGS per student-hour at N of 4 or more                                                             | at most $3.50                        |
| Progress                   | Change on a 10-point speaking rubric over 8 weeks; share of targeted can-do statements demonstrated | +0.5 points or more; at least 70%    |

**Progress honesty.** A common rule of thumb is that each CEFR level takes on the order of 100 to 200 or more hours, so an 8-week beta at 4 hours per week (about 32 hours) will not move anyone a full level. Use finer sub-level rubrics and can-do evidence, and never promise "fluent in 90 days".

---

## 14. Roadmap and MVP scope

| Phase           | Weeks          | Scope                                                                                                                                                                                                                                                                                                       | Exit criteria                                                                                                                  |
| --------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 0. Spike        | 0 to 2         | One room, voice agent, static portrait or one avatar vendor, Board stub, one lesson pack. Test with 5 to 10 learners 1:1 and one group of 3 to 4. Measure latency and real cost per minute.                                                                                                                 | Real cost per minute known; at least 7 of 10 testers would attend again; top 10 failure modes listed                           |
| 1. Private beta | 3 to 10        | One language, levels A1 to B1; placement v1; plan, schedule, reminders; live class (groups up to 4) with Board and redlines; doubts; captions and translation; recap, homework, review deck; can-do progress; admin v1 (monitor, transcripts, flag queue, cost dashboard); billing via Stripe payment links | At least 4 of the 6 critical metrics in Section 13 met: attendance, week-4 retention, teaching rating, accuracy, latency, cost |
| 2. Public beta  | 11 to 24       | Cohorts up to 8 to 12; breakouts and peer pairs; pronunciation UI; adaptive homework; unit checkpoints; languages 2 and 3; mobile web polish; pricing tests                                                                                                                                                 | Week-8 retention holding, gross margin at least 60%, NPS at least 40                                                           |
| 3. Scale        | Months 7 to 12 | Language expansion kit, human-review tier, institutions and employers, certificates, partner API                                                                                                                                                                                                            | Language #4 shipped in 6 weeks or less                                                                                         |

---

## 15. Risks

| Risk                                   | L / I | Mitigation                                                                                             | Early signal                                  |
| -------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Unit economics fail                    | H / H | Hybrid class format, cost dashboard from day one, avatar kill switch, price tests, multi-vendor quotes | Cost per student-hour above $3.50 in beta     |
| Tutor teaches something wrong          | M / H | Lesson packs, verifier, native audits, Flag this                                                       | Audit accuracy below 97%                      |
| Latency and awkward turn-taking        | H / H | Low-latency stack, barge-in tuning, "thinking" cues, audio-only fallback                               | p95 above 1.8 s; learners talk over the tutor |
| Avatar feels uncanny or gets rejected  | M / M | A/B avatar vs audio-only; per-learner off switch; stylised option                                      | Low ratings with avatar on                    |
| Group dynamics break down              | M / M | Start with N of 4; floor control; equal-turn rule; peer pairs                                          | Silent learners; crosstalk                    |
| Learners drop off                      | H / H | Schedule plus cohort plus reminders without guilt; recap value; measure week 4                         | Week-4 retention under 30%                    |
| Vendor dependency and price changes    | M / H | Thin provider interfaces, two vendors per layer, contracts                                             | Price or terms changes                        |
| Uneven quality across languages        | H / M | Per-language ASR/TTS evaluation gate; launch 1 to 2 only                                               | Failing golden set in a language              |
| Compliance (privacy, minors, AI rules) | M / H | 18+ only, consent, retention limits, legal review before EU launch (Section 16)                        | Regulator or partner questions                |
| Big players ship the same thing        | H / M | Own the serious-learner niche: goal tracks, cohorts, outcomes evidence, curriculum                     | Duolingo or Speak announces live classes      |
| 60-minute session fails midway         | M / H | Checkpointed state machine, agent failover, reconnect tests                                            | Session completion below 98%                  |
| Misuse (harassment, prompt injection)  | L / M | Moderation, mute and report, injection tests                                                           | Reports                                       |

---

## 16. Privacy, safety, compliance

Verify all of this with a lawyer before launch; this is a checklist, not legal advice.

- **18+ only in v1.** Avoids children's-data regimes. Age gate at signup.
- **Consent and control.** Plain-language consent for recording, transcripts and voice processing. Recording is optional. Self-serve export and deletion.
- **Voice data.** Do not build voiceprints. Short retention for raw audio (for example 30 days), longer for transcripts until deleted. Vendor contracts with no training on learner data.
- **AI disclosure.** Label the tutor as AI everywhere. Check local transparency rules (for example the EU AI Act).
- **EU note.** AI used to evaluate learning outcomes can be classed as high-risk in the EU, and inferring emotions in education settings is restricted. Do legal review before EU launch and never infer emotion from camera video (already a design rule).
- **Regional privacy.** GDPR (EU), DPDP Act (India), CCPA (California) and others as you enter them.
- **Content safety.** Moderation for learner-to-learner and learner-to-AI. Report, mute and block. Slang and profanity are legitimate learning content: teach them with register labels rather than banning them.
- **Security.** Standard basics: secrets management, rate limits, abuse detection, prompt-injection tests in CI.
- **Accessibility.** WCAG 2.2 AA.

---

## 17. Assumptions and decisions needed

**Assumptions I made (correct me):** adult learners, global, English interface first; web app, no native apps; managed vendors for room, avatar and speech (no model training); camera optional, mic required; "Lingua" is a placeholder name.

| Decision           | Options                                                                                  | Default recommendation                                                 |
| ------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Launch language(s) | Pick by scoring demand x speech-recognition/TTS quality x your ability to review content | 1 to 2 languages that score highest; do not promise "any language" yet |
| Target segment     | Goal-driven adults vs general learners                                                   | Goal-driven adults (career, exam, relocation, family)                  |
| Class size         | 1:1, 4, 8, 12                                                                            | 1:1 in Phase 0 to learn, 4 in beta, 8 to 12 in public beta             |
| Avatar realism     | Photoreal vs stylised vs audio-only                                                      | Test all three in Phase 0; always allow audio-only                     |
| Curriculum source  | Write, license, generate plus review                                                     | Generate with AI against CEFR descriptors, native-review every pack    |
| Human in the loop  | None, spot audits, live escalation                                                       | Audits in beta; live escalation only later                             |
| Pricing            | Subscription, class packs, hybrid                                                        | Subscription with class-hour allowance; test three price points        |
| Name and brand     |                                                                                          | Decide before any public page                                          |

---

## 18. Glossary

- **CEFR:** Common European Framework of Reference, levels A1 to C2.
- **SFU:** Selective Forwarding Unit, the server that relays WebRTC audio and video in a room.
- **STT / ASR:** speech to text. **TTS:** text to speech.
- **VAD:** voice activity detection (knowing when someone is speaking).
- **Barge-in:** learner interrupts the tutor.
- **Recast:** tutor repeats the learner's sentence correctly without stopping to explain.
- **Lesson pack:** the vetted content bundle a class is taught from.

---

## 19. Sources

Captured 21 Sep 2026. Pricing figures are ranges from vendor and third-party posts; get written quotes.

- Duolingo Video Call and Max: https://blog.duolingo.com/video-call and https://blog.duolingo.com/duolingo-max
- Praktika: https://apps.apple.com/us/app/-/id1624701477 and https://pulse2.com/praktika-32-5-million-raised-to-transform-language-learning-with-avatar-tutors
- Speak: https://techcrunch.com/2024/06/20/language-learning-app-speak-nets-20m-doubles-valuation and https://www.unite.ai/speak-secures-78m-series-c-funding-at-1b-valuation-to-transform-ai-powered-language-learning
- LiveKit virtual avatars: https://docs.livekit.io/agents/models/avatar/ and https://docs.livekit.io/frontends/build/virtual-avatars/
- Google Meet Media API (Developer Preview): https://developers.google.com/workspace/meet/media-api/reference/web/media_api_web.meetmediaapiclient.joinmeeting
- Real-time avatar pricing: https://www.forasoft.com/blog/article/interactive-ai-avatar-development, https://aitwin.me/blog/ai-avatars-are-expensive, https://www.liveavatar.com/, https://selviaai.com/heygen-pricing-explained (competitor of HeyGen; treat as biased)
- Realtime voice pricing: https://www.forasoft.com/blog/article/openai-realtime-api-pricing, https://synthorai.io/blog/gpt-realtime-api-pricing/
- Human tutor prices: https://www.mezzoguild.com/spanish-lesson-cost and https://migaku.com/blog/language-fun/how-to-find-a-language-tutor
