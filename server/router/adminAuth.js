const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../model/adminSchema");

// Define your secret key
const secretKey = "your_secret_key_here";

const requireAdminLogin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentication failed",
    });
  }
};

router.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid Email or Password" });
    }

    let admin = await Admin.findOne({ email });
    if (!admin) {
      // If admin not found, create a new admin
      admin = new Admin({ email, password });
      await admin.save();
    } else {
      if (req.body.password !== admin.password) {
        return res
          .status(422)
          .send({ success: false, message: "Invalid Email or Password" });
      }
    }

    const token = jwt.sign({ email: admin.email }, secretKey, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    req.session.isAdminLoggedIn = true;
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: { email: admin.email },
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: `Login Error : ${err}` });
  }
});

// Admin Profile API
router.get("/adminProfile", requireAdminLogin, async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.userData.email });
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }
    res.status(200).json({
      message: "Admin profile retrieved successfully",
      admin: {
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: `Error : ${err}` });
  }
});

module.exports = router;
