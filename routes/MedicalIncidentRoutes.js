const express = require("express");
const router = express.Router();
const {
  createTestMedicalIncident,
  GetTestMedicalIncident,
} = require("../controllers/medicalIncidentController");

const {
  createSymptomMedicalIncident,
} = require("../controllers/medicalIncidentSymptomController");
//post a new symptom
router.post("/", createSymptomMedicalIncident);

// //post a new test
router.post("/", createTestMedicalIncident);
//Get a test
router.get("/", GetTestMedicalIncident);




module.exports = router;
