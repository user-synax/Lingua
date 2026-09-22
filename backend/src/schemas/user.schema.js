import { z } from "zod";

export const updateMeSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(2).max(80).optional(),
      // email change requires re-verify, disallow for now
    })
    .strict(),
});
