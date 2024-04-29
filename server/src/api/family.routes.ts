import { Router } from "express";
import { Family } from "../models/familty";
const router = Router();
import { v4 as uuidv4 } from 'uuid';

// Register a new family
router.post("/register", async (req, res) => {
  try {
    const { email, familyName, password } = req.body;

    const existingEmail = await Family.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingFamilyName = await Family.findOne({ familyName });
    if (existingFamilyName) {
      return res.status(400).json({ message: "Family name already exists" });
    }
    const uniqueCode = uuidv4();

    const newFamily = new Family({
      email,
      familyName,
      password,
      uniqueCode
    });

    await newFamily.save();

    return res
      .status(201)
      .json({ message: "Family registered successfully", family: newFamily });
  } catch (error) {
    console.error("Error registering family:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const familyId = req.params.id;

    const family = await Family.findById(familyId);

    if (!family) {
      return res.status(404).json({ message: "Family not found" });
    }

    return res.status(200).json({ family });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

export default router;
