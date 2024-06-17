const express = require("express");

const {
  getDoctor,
  getDoctors,
  deleteDoctor,
  updateDoctor,
  addPatientAccess,
  verifyDoctor,
  uploadProfileImage,
  getPatientsWithAccess,
  upload
} = require("../controllers/doctorController");

const router = express.Router();

// Get all doctors
router.get("/", getDoctors);

// Get a doctor
router.get("/:id", getDoctor);

// Delete a doctor
// router.delete("/:id", deleteDoctor);

// Update a doctor
router.put("/:id", updateDoctor);

// Add patient access to doctor
router.patch("/addPatientAccess/:id", addPatientAccess);

// Verify a doctor
router.patch("/verifyDoctor/:id", verifyDoctor);

// Upload profile image
router.post("/:id", upload.single('image'), uploadProfileImage);

// Get patients with access
router.get("/getPatientsWithAccess/:id", getPatientsWithAccess);

module.exports = router;
