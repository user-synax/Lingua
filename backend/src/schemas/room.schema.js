import { z } from "zod";

export const tokenSchema = z.object({
  body: z.object({
    roomName: z
      .string()
      .trim()
      .min(3, "Room name at least 3 chars")
      .max(64)
      .regex(/^[a-zA-Z0-9_-]+$/, "Alphanumeric, _ or - only"),
    participantName: z.string().trim().min(1).max(64).optional(),
  }),
});

export const createRoomSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3)
      .max(64)
      .regex(/^[a-zA-Z0-9_-]+$/, "Alphanumeric, _ or - only")
      .optional(),
  }),
});
