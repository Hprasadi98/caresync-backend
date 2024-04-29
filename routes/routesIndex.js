const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middleware/AuthMiddleware");

const PatientRoutes = require("./Patients");
const DoctorRoutes = require("./DoctorRoutes");
const authRoutes = require("./authRoutes");
const BreathingTestRoutes = require("./breathingTestRoutes");
const StepCounterTestRoutes = require("./stepCountTestRoutes");
const MedicationRoutes = require("./medicationRoutes");
const PatientHistoryRoutes = require("./patientHistoryRoutes");
const MedicalIncidentRoutes = require("./MedicalIncidentRoutes");
const ExtTestRoutes = require("./ExternalTestResult.Routes");


const PortalAuthRoutes = require("./portalAuthRoutes");


router.use("/doctors", AuthMiddleware, DoctorRoutes);
router.use("/breathingTests", AuthMiddleware, BreathingTestRoutes);
router.use("/stepCounterTests", AuthMiddleware, StepCounterTestRoutes);
router.use("/patientsHistory", AuthMiddleware, PatientHistoryRoutes);
router.use("/patients", AuthMiddleware, PatientRoutes);
router.use("/medications", AuthMiddleware, MedicationRoutes);
router.use("/medicalIncident", AuthMiddleware, MedicalIncidentRoutes);
router.use("/extTests", AuthMiddleware, ExtTestRoutes )

router.use(authRoutes);
router.use("/portal/auth", PortalAuthRoutes);

router.get("/", (req, res) => {
  res.status(200).json({ message: "CareSync Test Endpoint v1" });
});


module.exports = router;
