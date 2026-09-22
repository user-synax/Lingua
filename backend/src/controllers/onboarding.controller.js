export async function getOnboarding(req, res) {
  res.json({ onboarding: req.user.onboarding });
}

export async function saveOnboarding(req, res, next) {
  try {
    const { target, nativeLang, goal, deadline, hours, availability, timezone, completed } = req.body;

    if (target !== undefined) req.user.onboarding.target = target;
    if (nativeLang !== undefined) req.user.onboarding.nativeLang = nativeLang;
    if (goal !== undefined) req.user.onboarding.goal = goal;
    if (deadline !== undefined) req.user.onboarding.deadline = deadline ? new Date(deadline) : null;
    if (hours !== undefined) req.user.onboarding.hours = hours;
    if (timezone !== undefined) req.user.onboarding.timezone = timezone;
    if (completed !== undefined) req.user.onboarding.completed = completed;

    if (availability !== undefined) {
      // Replace map entries
      req.user.onboarding.availability = new Map(Object.entries(availability));
    }

    await req.user.save();
    res.json({ onboarding: req.user.onboarding, user: req.user.toSafeObject() });
  } catch (err) {
    next(err);
  }
}
