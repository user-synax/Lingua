import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { tokenSchema, createRoomSchema } from "../schemas/room.schema.js";
import { createRoom, listRooms, getRoom, token } from "../controllers/rooms.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/", listRooms);
router.post("/", validate(createRoomSchema), createRoom);
router.get("/:name", getRoom);
router.post("/token", validate(tokenSchema), token);

export default router;
