import { z } from "zod";

const targetLanguages = ["de", "es", "fr", "ja", "pt", "en", "it", "ko"];
const nativeLanguages = ["English", "Hindi", "Spanish", "French", "German", "Portuguese", "Japanese", "Korean", "Italian"];
const goals = ["career", "exam", "family", "relocation", "travel"];

export const saveOnboardingSchema = z.object({
  body: z.object({
    target: z.enum(targetLanguages).nullable().optional(),
    nativeLang: z.enum(nativeLanguages).nullable().optional(),
    goal: z.enum(goals).nullable().optional(),
    deadline: z.string().nullable().optional().refine((v) => {
      if (!v) return true;
      const d = new Date(v);
      return !isNaN(d.getTime());
    }, "Invalid date"),
    hours: z.number().int().min(3).max(15).nullable().optional(),
    availability: z.record(z.boolean()).optional(), // e.g. {"Mon-eve": true}
    timezone: z.string().min(1).max(64).optional(),
    completed: z.boolean().optional(),
  }),
});
