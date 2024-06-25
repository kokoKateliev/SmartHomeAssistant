import { Router } from "express";
import { Family } from "../models/familty";
import { User } from "../models/user";
const router = Router();

// Register a new family
router.post("/register", async (req, res) => {
  try {
    const { familyName } = req.body;

    const newFamily = new Family({
      familyName,
        });

    await newFamily.save();

    return res
      .status(201)
      .json({ message: "Family registered successfully", family: newFamily, id: newFamily.id });
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


// Get user's family
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('family');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user.familyId);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.put('/:familyId/join', async (req, res) => {
  const { familyId } = req.params;
  const { userId } = req.body;

  try {
    const family = await Family.findById(familyId);
    const user = await User.findById(userId);

    if (!family || !user) {
      return res.status(404).json({ msg: 'Family or User not found' });
    }

    family.users.push(user._id);
    user.familyId = family._id;

    await family.save();
    await user.save();

    res.json(family);
  } catch (error) {
    res.status(500).send('Server error');
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

export default router;
