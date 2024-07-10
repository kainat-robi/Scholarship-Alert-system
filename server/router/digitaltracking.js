// routes/hecTrackingRoutes.js
const express = require("express");
const router = express.Router();
const { HecTracking } = require("../model/digitaltrackingSchema");

// Get all Hec tracking records
router.get("/", async (req, res) => {
  try {
    const digitalTrackings = await HecTracking.find();
    res.status(200).json(digitalTrackings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Get single Hec tracking record by ID
router.get("/:id", async (req, res) => {
  try {
    const digitalTracking = await HecTracking.findById(req.params.id);
    if (!digitalTracking) {
      return res.status(404).json({ error: "Digital tracking record not found" });
    }
    res.json(digitalTracking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Create a new Hec tracking record
router.post("/", async (req, res) => {
  try {
    const digitalTracking = new HecTracking(req.body);
    await digitalTracking.save();
    res.status(201).json(digitalTracking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Update a Hec tracking record
router.put("/:id", async (req, res) => {
  try {
    const digitalTracking = await HecTracking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!digitalTracking) {
      return res.status(404).json({ error: "Digital tracking record not found" });
    }
    res.json(digitalTracking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Delete a Hec tracking record
router.delete("/:id", async (req, res) => {
  try {
    const digitalTracking = await HecTracking.findByIdAndDelete(req.params.id);
    if (!digitalTracking) {
      return res.status(404).json({ error: "Digital tracking record not found" });
    }
    res.json({ message: "Digital tracking record deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
