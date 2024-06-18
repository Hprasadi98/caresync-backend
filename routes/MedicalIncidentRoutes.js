const express = require("express");
const {
  createTestIncident
} = require("../controllers/MedicalIncidentControllers/Test-MedicalIncidentController");
const {
  createAppointmentIncident
} = require("../controllers/MedicalIncidentControllers/Appointment-MedicalIncident");
const {
  createPrescriptionIncident
} = require("../controllers/MedicalIncidentControllers/Prescription-MedicalIncident");
const {
  createSymptomIncident
} = require("../controllers/MedicalIncidentControllers/Symptom-MedicalIncident");


const router = express.Router();


//Create a new Test Incident
router.post("/testIn/create", createTestIncident);


//Create a new Appointment Incident
router.post("/AppointmentIn/create", createAppointmentIncident);

//Create a new Prescription Incident
router.post("/PrescriptionIn/create", createPrescriptionIncident);

//Create a new Symptom Incident
router.post("/symptomIn/create", createSymptomIncident);



module.exports = router;
