import { Router } from "express";
import User from "../models/user.js";
import { genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password, nickname, gender } = req.body;

    // validate info
    if (!username || !password || !gender)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (typeof username != "string" || typeof password != "string")
      return res
        .status(400)
        .json({ msg: "All fields must be of type string." });
    if (gender !== "male" && gender !== "female")
      return res
        .status(400)
        .json({ msg: `404 gender "${gender}" doesn't exist .` });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be atleast 6 characters long." });
    if (await User.findOne({ username }))
      return res.status(400).json({ msg: "Username already taken." });

    // password hash
    const passwordHash = await hash(
      password + process.env.PEPPER,
      await genSalt()
    );

    // uploaded to db
    const newUser = new User({ username, passwordHash, nickname, gender });
    const uploadedUser = await newUser.save();

    // jwt sign in token
    const token = jwt.sign(
      { userId: uploadedUser.__id },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (err) {
    console.error("rip " + err.message);
    res.status(500).json({ errorMsg: err.message });
  }
});

export default router;
