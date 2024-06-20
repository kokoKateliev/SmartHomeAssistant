import { Router } from "express";
import { Family } from "../models/familty";
const router = Router();

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

    const newFamily = new Family({
      email,
      familyName,
      password
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
})

router.get('/', async (req, res) => {
  try {
    const families = await Family.find();
    res.json(families);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const family = await Family.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!family) {
      return res.status(404).json({ error: 'Family not found' });
    }
    res.json(family);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const family = await Family.findByIdAndDelete(req.params.id);
    if (!family) {
      return res.status(404).json({ error: 'Family not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/family/:familyId', async (req, res) => {
  const { familyId } = req.params;
  try {
    if (!familyId) {
      return res.status(400).json({ error: 'Family ID is required' });
    }
    const families = await Family.find({ familyId });
    if (families.length === 0) {
      return res.status(404).json({ error: 'No families found for this family ID' });
    }
    res.json(families);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
