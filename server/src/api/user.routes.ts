import { User } from "../models/user";
import { Router } from "express";
import { registerValidation, loginValidation } from "../utils/validation";
import { Family } from "../models/familty";

const router = Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json(data);
  } catch (e) {
    console.log("Error getting users: ", e);
  }
});

// Login endpoint
router.post("/", async (req, res) => {
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

    await userExist.save();
    res.status(200).send(userExist);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({
      email: req.body.email,
    });
    if (emailExist) return res.status(400).send("Email already exists");

    const familyExist = await Family.findOne({
      uniqueCode: req.body.uniqueCode,
    });
    if (!familyExist) return res.status(400).send("Family does not exist");
    
    const userInFamily = await User.findOne({
      email: req.body.email,
      family: familyExist._id, 
    });

    // If the user already exists in the family, return an error
    if (userInFamily)
      return res.status(400).send("User already exists in the family");
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      family: familyExist,
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
