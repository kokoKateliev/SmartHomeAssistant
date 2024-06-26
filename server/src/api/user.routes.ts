import { User } from "../models/user";
import { Router } from "express";
import { registerValidation, loginValidation } from "../utils/validation";
import { Family } from "../models/familty";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
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
    const users = await User.find({ familyId });
    if (!users) {
      return res
        .status(404)
        .json({ error: "No users found for this family ID" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const userExist = await User.findOne({
      email: req.body.email,
    });
    if (!userExist) return res.status(400).send("Email or Password Invalid");

    if (req.body.password !== userExist.password) {
      return res.status(400).send("Invalid Password");
    }

    res.status(200).send(userExist);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    // const { error } = registerValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({
      email: req.body.email,
    });
    if (emailExist) return res.status(400).send("Email already exists");

    let familyExist;
    if (req.body.uniqueCode) {
      familyExist = await Family.findOne({
        uniqueCode: req.body.uniqueCode,
      });
      if (!familyExist) return res.status(400).send("Family does not exist");

      // const userInFamily = await User.findOne({
      //   email: req.body.email,
      //   family: familyExist?._id,
      // });
    }

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      familyId: familyExist?.id,
    });

    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User Added Successfully", user: savedUser });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
