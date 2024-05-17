const express = require("express");
const router = express.Router();
const {
  createTestMedicalIncident,
  GetTestMedicalIncident,
} = require("../controllers/medicalIncidentController");

 

// //post a new test
router.post("/", createTestMedicalIncident);

//Get a test
router.get("/", GetTestMedicalIncident);




module.exports = router;
