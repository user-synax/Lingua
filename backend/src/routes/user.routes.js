import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { updateMeSchema } from "../schemas/user.schema.js";
import { getMe, patchMe, deleteMe } from "../controllers/user.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/me", getMe);
router.patch("/me", validate(updateMeSchema), patchMe);
router.delete("/me", deleteMe);

export default router;
