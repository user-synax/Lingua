import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { saveOnboardingSchema } from "../schemas/onboarding.schema.js";
import { getOnboarding, saveOnboarding } from "../controllers/onboarding.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/", getOnboarding);
router.put("/", validate(saveOnboardingSchema), saveOnboarding);
router.patch("/", validate(saveOnboardingSchema), saveOnboarding);

export default router;
