// PRD ON-3 / §6 / §13 planning heuristic — frontend-only, no backend.
// A CEFR level takes ~100–200+ hours. This is a blunt estimate to tell the
// learner plainly whether goal × deadline × hours adds up. Not a promise.

export const HOURS_PER_LEVEL = { low: 100, central: 150, high: 200 };

// Hours already banked per mock placement band (blunt, central-guess only).
// A1 = from scratch. Kept small + floored so we never promise zero work.
export const START_CREDITS = { A1: 0, A2: 100, B1: 200, B2: 280, "B2+": 300 };

// Central hour estimates per goal (from-scratch-ish bands, tuned later with data).
// Range shown to learner as low–high so we never promise precision.
export const GOAL_ESTIMATES = {
  career: { target: "B2", needCentral: 320, needLow: 220, needHigh: 420, blurb: "Work-ready B2" },
  exam: { target: "B2+", needCentral: 300, needLow: 200, needHigh: 400, blurb: "Exam speaking score" },
  family: { target: "B1", needCentral: 180, needLow: 120, needHigh: 240, blurb: "Family conversation" },
  relocation: { target: "B1+", needCentral: 200, needLow: 140, needHigh: 280, blurb: "Daily life from day one" },
  travel: { target: "A2–B1", needCentral: 150, needLow: 100, needHigh: 200, blurb: "Deep travel conversation" },
};

export function weeksUntil(deadlineISO, nowMs = Date.now()) {
  if (!deadlineISO) return null;
  const t = new Date(deadlineISO).getTime();
  if (Number.isNaN(t)) return null;
  const days = Math.ceil((t - nowMs) / (1000 * 60 * 60 * 24));
  if (days <= 0) return 0;
  return Math.ceil(days / 7);
}

// Pure: { goal, hoursPerWeek, deadline, startingBand } -> verdict object.
// tone: "fit" | "tight" | "off" | "no-deadline"
// startingBand is the mock placement band (A1–B2+). Unknown/missing = from scratch.
export function realityCheck({ goal, hoursPerWeek, deadline, startingBand = null, nowMs = Date.now() }) {
  const g = GOAL_ESTIMATES[goal] || GOAL_ESTIMATES.career;
  const hrs = Math.max(1, Number(hoursPerWeek) || 0);
  const credit = START_CREDITS[startingBand] || 0;
  // Remaining work after banked hours. Floored so every goal still needs real study.
  const needCentral = Math.max(40, g.needCentral - credit);
  const needLow = Math.max(30, g.needLow - credit);
  const needHigh = Math.max(60, g.needHigh - credit);
  const weeksAvail = weeksUntil(deadline, nowMs);

  if (weeksAvail === null) {
    const months = needCentral / hrs / 4.33;
    return {
      ...g,
      needCentral,
      needLow,
      needHigh,
      goalId: goal,
      startingBand,
      hoursPerWeek: hrs,
      weeksAvail: null,
      projected: null,
      fits: null,
      tone: "no-deadline",
      neededWeekly: null,
      monthsAtPace: Math.round(months * 10) / 10,
      message: `No deadline set. At ${hrs}h/week, ${g.blurb} (${g.target}, ~${needLow}–${needHigh}h${startingBand ? ` from ${startingBand}` : ""}) takes roughly ${Math.round(months)} months. Set a date and we’ll hold you to it.`,
    };
  }

  if (weeksAvail === 0) {
    return {
      ...g,
      needCentral,
      needLow,
      needHigh,
      goalId: goal,
      startingBand,
      hoursPerWeek: hrs,
      weeksAvail: 0,
      projected: 0,
      fits: false,
      tone: "off",
      neededWeekly: needCentral,
      monthsAtPace: null,
      message: "That deadline has passed. Pick a new date and we’ll rebuild the math.",
    };
  }

  const projected = Math.round(hrs * weeksAvail);
  const neededWeekly = Math.ceil(needCentral / weeksAvail);
  const fits = projected >= needCentral;
  const tight = !fits && projected >= needLow;
  const tone = fits ? "fit" : tight ? "tight" : "off";
  const message = fits
    ? `Adds up. ${projected}h projected vs ~${needLow}–${needHigh}h needed for ${g.blurb} (${g.target}${startingBand ? ` from ${startingBand}` : ""}). Keep the ${hrs}h/week and you’re on track.`
    : `Doesn’t add up yet. ${projected}h projected in ${weeksAvail} weeks vs ~${needLow}–${needHigh}h needed for ${g.blurb} (${g.target}${startingBand ? ` from ${startingBand}` : ""}). You’d need ~${neededWeekly}h/week, or more time — or override and go anyway.`;

  return {
    ...g,
    needCentral,
    needLow,
    needHigh,
    goalId: goal,
    startingBand,
    hoursPerWeek: hrs,
    weeksAvail,
    projected,
    fits,
    tone,
    neededWeekly,
    monthsAtPace: null,
    gapHours: Math.max(0, needCentral - projected),
    message,
  };
}
