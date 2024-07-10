const mongoose = require("mongoose");

const digitalHecTrackingSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  enrollmentNo: String,
  degreeProgram: String,
  hecScholarship: String,
  graduationYear: Number,
  scholarshipavail: String, // Added this line
});

const digitalEhsaasTrackingSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  enrollmentNo: String,
  degreeProgram: String,
  ehsaasScholarship: String, 
  graduationYear: Number,
  scholarshipavail: String, // Added this line
});

const digitalFreeshipTrackingSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  enrollmentNo: String,
  degreeProgram: String,
  freeshipScholarship: String,
  graduationYear: Number,
  scholarshipavail: String, // Added this line
});

const HecTracking = mongoose.model("HecTracking", digitalHecTrackingSchema);
const EhsaasTracking = mongoose.model("EhsaasTracking", digitalEhsaasTrackingSchema);
const FreeshipTracking = mongoose.model("FreeshipTracking", digitalFreeshipTrackingSchema);

module.exports = { HecTracking, EhsaasTracking, FreeshipTracking };
