// PRD ON-2 placement — frontend-only MOCK scorer.
// Real adaptive placement + human-rater validation (80% within one sub-level)
// is backend work. This stub runs the 10–15 min flow client-side, captures
// samples, and returns a clearly-labeled estimate so the journey can proceed
// to reality check (ON-3) and syllabus (PL-1). Never presented as certified.

export const PLACEMENT_SECTIONS = ["listening", "reading", "spoken", "written"];

// Generic items (target-language agnostic). Real packs ship per language
// with native-reviewed audio + texts. `answer` is the correct option index.
export const LISTENING_ITEMS = [
  {
    id: "L1",
    prompt: "You hear: “The class starts at seven in the evening.” When is it?",
    options: ["Morning", "19:00", "7 AM", "Weekend"],
    answer: 1,
  },
  {
    id: "L2",
    prompt: "You hear: “She goes to work by train, but on Fridays she walks.” How does she travel on Fridays?",
    options: ["By train", "By bus", "On foot", "She stays home"],
    answer: 2,
  },
  {
    id: "L3",
    prompt: "You hear: “Because it was raining, we stayed and reviewed.” Why did they stay?",
    options: ["They were tired", "It was raining", "Class was cancelled", "They forgot"],
    answer: 1,
  },
];

export const READING_ITEMS = [
  {
    id: "R1",
    prompt: "“Classes run Mon + Wed, 19:00–20:00. Join from the dashboard link.” How long is a class?",
    options: ["30 minutes", "60 minutes", "90 minutes", "All evening"],
    answer: 1,
  },
  {
    id: "R2",
    prompt: "“Every doubt is answered live or parked for the recap.” What happens to a parked doubt?",
    options: ["It is deleted", "It is answered at recap", "It is ignored", "It costs extra"],
    answer: 1,
  },
  {
    id: "R3",
    prompt: "“Progress is evidence: transcript clips tied to can-do statements.” What proves progress?",
    options: ["Streak days", "Points", "Transcript evidence", "Leaderboard rank"],
    answer: 2,
  },
];

export function scoreChoices(items, answers) {
  let correct = 0;
  items.forEach((it, i) => {
    if (answers?.[i] === it.answer) correct += 1;
  });
  return { correct, total: items.length };
}

// Stub sample assessor: length + sentence variety only. Real scoring needs
// verbatim STT + phoneme assessment + human rater (PRD §9–10). Returns 1–5.
export function assessSample(text) {
  const t = (text || "").trim();
  if (t.length < 20) return { score: 1, note: "Too short to judge — try 2–3 sentences." };
  const words = t.split(/\s+/).length;
  const sentences = t.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  if (words >= 60 && sentences >= 4) return { score: 4, note: "Connected sample — placement estimate only." };
  if (words >= 30 && sentences >= 2) return { score: 3, note: "Basic connected text — placement estimate only." };
  return { score: 2, note: "Short sample — placement estimate only." };
}

// Pure: { listening: number[], reading: number[], spoken: string, written: string }
// -> { band, skills, canDos, breakdown, isStub }
export function placementBand({ listening, reading, spoken, written }) {
  const l = scoreChoices(LISTENING_ITEMS, listening);
  const r = scoreChoices(READING_ITEMS, reading);
  const s = assessSample(spoken);
  const w = assessSample(written);

  // Map correct counts to 1–5 per receptive skill; samples already 1–5.
  const listeningScore = 1 + Math.round((l.correct / l.total) * 4);
  const readingScore = 1 + Math.round((r.correct / r.total) * 4);
  const avg = (listeningScore + readingScore + s.score + w.score) / 4;

  const band = avg >= 4.5 ? "B2" : avg >= 3.5 ? "B1" : avg >= 2.5 ? "A2" : "A1";
  const next = band === "A1" ? "A2" : band === "A2" ? "B1" : band === "B1" ? "B2" : "B2+";

  return {
    band,
    next,
    isStub: true,
    skills: {
      listening: listeningScore,
      reading: readingScore,
      speaking: s.score,
      writing: w.score,
    },
    notes: { spoken: s.note, written: w.note },
    breakdown: { listening: l, reading: r },
    canDos: [
      `Can follow a 60-min class at ${band} with Board support`,
      `Working toward ${next}: first checkpoint after Unit 1`,
    ],
    disclaimer: "Mock estimate — real placement needs adaptive items + human-rater check (PRD ON-2).",
  };
}
