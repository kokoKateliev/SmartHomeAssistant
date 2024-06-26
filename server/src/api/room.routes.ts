import { Family } from "../models/familty";
import { Room, IRoom } from "../models/room";
import { Router } from "express";

const router = Router();

//get all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    if (rooms) {
      return res.status(200).json(rooms);
    }
    res.status(404).json("No rooms found");
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//get all rooms by userId
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const rooms = await Room.find({ userId: userId });
    if (rooms) {
      return res.status(200).json(rooms);
    }
    res.status(404).json("No rooms found");
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST API endpoint to save a room
router.post("", async (req, res) => {
  try {
    const { userId, name, temperature } = req.body;

    // const uExist = await Family.findById(s);
    // if (!familyExist) {
    //   return res.status(404).json({ message: "Family does not exist" });
    // }
    const room = new Room({
      name: name,
      userId: userId,
      temperature: temperature,
    });
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

router.delete("/:id", async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/family/:familyId", async (req, res) => {
  const { familyId } = req.params;
  try {
    if (!familyId) {
      return res.status(400).json({ error: "Family ID is required" });
    }
    const rooms = await Room.find({ familyId });
    if (!rooms) {
      return res
        .status(404)
        .json({ error: "No rooms found for this family ID" });
    }
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
