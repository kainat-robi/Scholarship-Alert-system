const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/userSchemaa");

const JWT_SECRET = "your_secret_key";

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(422).send({ success: false, message: "Please fill all the input fields" });
    }

    if (password !== confirmPassword) {
      return res.status(422).send({ success: false, message: "Password and confirm password do not match" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).send({ success: false, message: "Email already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).send({ success: true, message: "User Registered Successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send({ success: false, message: "Error in Registration" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(404).send({ success: false, message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).send({ success: true, message: "Login Successful", token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send({ success: false, message: "Login Error" });
  }
});

// Example protected route
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    res.status(200).send({ success: true, message: "User Profile", user });
  } catch (error) {
    console.error("Error in getting user profile:", error);
    res.status(500).send({ success: false, message: "Error in getting user profile" });
  }
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).send({ success: false, message: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ success: false, message: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = router;
