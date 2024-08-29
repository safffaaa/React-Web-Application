const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware");
const { upload } = require("../config/multer");
const jwt_key =
  "c766024a3ee3b82bffa1fe4ae62953f161ce71f186c74dcafec6815940a19efb7215240fcd7537df0afd6994c7b5bfbeec9f64b2c95de25498758019e525375b";

// Example route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username, status: true
    });
    if (user) {
      const pasMatch = await bcrypt.compare(password, user.password);
      if (pasMatch) {
        const token = jwt.sign({ user }, jwt_key, {
          expiresIn: "1hr",
        });
        res.status(200).json({ success: true, token, role: user.role });
      } else {
        res.status(403).json({ success: false, error: "Password not match" });
      }
    } else {
      res.status(404).json({ success: false, error: "User not found!" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/signUp", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({
      username,
      email,
    });
    if (existingUser) {
      console.log("User not registered", existingUser);
      return res.status(403).json({ error: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("User registered", user);

    return res.status(201).json(user);
  } catch (error) {
    res.json(error);
  }
});

router.get("/Profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User Not Fount" });
    }
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

router.post(
  "/editProfile",
  verifyToken,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const { username } = req.body;
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const existingUser = await User.findOne({ username: username });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(405).json({ error: "Username already exists" });
      }
      user.username = username;
      console.log(req.file);

      if (req.file) {
        user.profilePic = req.file.path;
      }
      await user.save();
      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post("/changePass", verifyToken, async (req, res) => {
  try {
    const { Old_Password, New_Password } = req.body;

    const user = await User.findById(req.userId);
    if(!user){
      return res.status(404).json({error : "user not found"})
    }
    const verifypass = await bcrypt.compare(Old_Password,user.password)

    if(!verifypass){
      return res.status(400).json({error : "Incorrect Old Password"})
    }

    const hash = await bcrypt.hash(New_Password,10)

    if(Old_Password === New_Password){
      return res.status(405).json({error : "New password is Same to old Password"})
    }

    user.password = hash
    await user.save()
    res.status(200).json({data:"Password Changed Successfully"})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
