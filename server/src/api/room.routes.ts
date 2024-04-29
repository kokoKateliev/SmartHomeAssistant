import { Family } from "../models/familty";
import { Room ,IRoom} from "../models/room";
import { Router } from "express";

const router = Router();

// POST API endpoint to save a room
router.post("/", async (req, res) => {
  try {
    const { name, familyId } = req.body;

    const familyExist = await Family.findById(familyId);
    if (!familyExist) {
      return res.status(404).json({ message: "Family does not exist" });
    }
    const room = new Room({ name, familyId });
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET API endpoint to retrieve a room by its ID
router.get("/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const updates: Partial<IRoom> = req.body;
    const updatedRoom = await Room.findByIdAndUpdate(roomId, updates, {
      new: true,
    });
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(updatedRoom);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
