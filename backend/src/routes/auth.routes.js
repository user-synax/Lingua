import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { signupSchema, loginSchema, verifySchema, forgotSchema, resetSchema } from "../schemas/auth.schema.js";
import {
  signup,
  verify,
  resendCode,
  login,
  refresh,
  logout,
  me,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { z } from "zod";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/verify", validate(verifySchema), verify);
router.post("/resend-code", validate(z.object({ body: z.object({ email: z.string().email() }) })), resendCode);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.post("/forgot-password", validate(forgotSchema), forgotPassword);
router.post("/reset-password", validate(resetSchema), resetPassword);

export default router;
