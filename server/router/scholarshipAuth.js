// const express = require("express");
const router = require("express").Router();
const Scholarships = require("../model/scholarshipModel.js");

router.post("/createscholarships", async (req, res) => {
  try {
    const {
      scholarshipName,
      deadline,
      amount,
      category,
      eligibility,
      documents,
      description,
    } = req.body;

    if (
      !scholarshipName ||
      !deadline ||
      !amount ||
      !category ||
      !eligibility ||
      !documents
    ) {
      return res
        .status(422)
        .send({ success: false, message: "Please fill all the input fields" });
    }

    const dateObj = new Date(deadline);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDateStr = dateObj.toLocaleDateString("en-US", options);

    const scholarshipExist = await Scholarships.findOne({ scholarshipName });
    if (scholarshipExist) {
      return res
        .status(200)
        .send({ success: false, message: "Scholarship Name already exists" });
    }

    const scholarship = new Scholarships({
      scholarshipName,
      deadline: formattedDateStr,
      amount,
      category,
      eligibility,
      documents,
      description,
    });
    const scholarshipRegister = await scholarship.save();

    if (scholarshipRegister) {
      return res.status(201).send({
        success: true,
        message: "Scholarship added Successfully",
        scholarshipRegister,
      });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({
      success: false,
      message: "Error ",
      error,
    });
  }
});

// Get all scholarships
router.get("/get-scholarships", async (req, res) => {
  try {
    const scholarships = await Scholarships.find({}).sort({ deadline: -1 });
    res.status(200).send({
      success: true,
      message: "All Scholarships",
      scholarships,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Details",
      error,
    });
  }
});

// Get scholarships according to category
router.get("/get-scholarships/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const scholarships = await Scholarships.find({ category }).sort({ deadline: -1 });
    res.status(200).send({
      success: true,
      message: `All ${category} Scholarships`,
      scholarships,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Details",
      error,
    });
  }
});

// Get single Scholarship information
router.get("/get-scholarship/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const scholarship = await Scholarships.findById(_id);
    if (!scholarship) {
      return res.status(404).send({
        success: false,
        message: "Scholarship not found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Scholarship",
        scholarship,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Details",
      error,
    });
  }
});

// Delete one scholarship
router.delete("/get-scholarships/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteScholarship = await Scholarships.findByIdAndDelete(_id);
    if (!deleteScholarship) {
      return res.status(404).send("This scholarship is not available");
    } else {
      res.status(200).send({
        success: true,
        message: "Scholarship Deleted",
        deleteScholarship,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting",
      error,
    });
  }
});

// Update Scholarship information
router.put("/get-scholarships/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateScholarship = await Scholarships.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateScholarship) {
      return res.status(404).send("This scholarship is not available");
    } else {
      res.status(200).send({
        success: true,
        message: "Scholarship Updated",
        updateScholarship,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating",
      error,
    });
  }
});

module.exports = router;
