import { Router } from "express";
import { Device, IDevice } from "../models/device";

const router = Router();

// POST API endpoint to save a device
router.post("/", async (req, res) => {
  try {
    const { name, room } = req.body;
    const device = new Device({ name, room });
    const savedDevice = await device.save();
    res.status(201).json(savedDevice);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET API endpoint to retrieve a device by its ID
router.get("/:deviceId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const device = await Device.findById(deviceId);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(200).json(device);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT API endpoint to update a device by its ID
router.put("/:deviceId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const updates: Partial<IDevice> = req.body; // Partial type for partial updates
    const updatedDevice = await Device.findByIdAndUpdate(deviceId, updates, {
      new: true,
    });
    if (!updatedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(200).json(updatedDevice);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
