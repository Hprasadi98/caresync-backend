
const express = require("express");
const router = express.Router();
const {
  createTestMedicalIncident,
  GetTestMedicalIncident,
} = require("../controllers/medicalIncidentController");

const {
  createSymptomMedicalIncident,
} = require("../controllers/medicalIncidentSymptomController");

const {
  createMedicationMedicalIncident,
} = require("../controllers/medicalIncidentMedicationController");

const {
  createAppointmentMedicalIncident,
} = require("../controllers/medicalIncidentAppointmentController");



// Define a single POST route
router.post("/", (req, res, next) => {

  const type = req.body.type;

  switch (type) {

    case "symptom":
      createSymptomMedicalIncident(req, res, next);// If type is "symptom", call the first controller function
      break;

    case "test":
      createTestMedicalIncident(req, res, next);
      break;

    case "medication":
      createMedicationMedicalIncident(req, res, next);
      break;

    case "appointment":
      createAppointmentMedicalIncident(req, res, next);
      break;
  }
});

// Get a test
router.get("/", GetTestMedicalIncident);

module.exports = router;
