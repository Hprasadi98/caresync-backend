const express = require("express");
const {
  getPatients,
  getPatient,
  addDocAccess,
  deletePatient,
  updatePatient,
} = require("../controllers/patientController");

const router = express.Router();

// Get all patients
router.get("/", getPatients);

// Get a patient
router.get("/patientId", getPatient);

// Delete a patient
router.delete("/:id", deletePatient);

// update a patient
router.put("/:id", updatePatient);

// Give patient access to doctor
router.patch("/addDocAccess/:id", addDocAccess);

module.exports = router;
