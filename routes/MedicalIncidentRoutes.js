// const express = require("express");
// const router = express.Router();
// const {
//   createTestMedicalIncident,
//   GetTestMedicalIncident,
// } = require("../controllers/medicalIncidentController");



// // //post a new test
// router.post("/", createTestMedicalIncident);

// //Get a test
// router.get("/", GetTestMedicalIncident);




// module.exports = router;



const express = require("express");
const router = express.Router();
const {
  createTestMedicalIncident,
  GetTestMedicalIncident,
} = require("../controllers/medicalIncidentController");

const {
  createSymptomMedicalIncident,
} = require("../controllers/medicalIncidentSymptomController");

// Define a single POST route
router.post("/", (req, res, next) => {
  // Check condition based on request parameter or body property
  const condition = req.body.type === "symptom"; // Example condition based on request body

  if (condition) {
    // If condition is true, call the first controller function
    createSymptomMedicalIncident(req, res, next);
  } else {
    // If condition is false, call the second controller function
    createTestMedicalIncident(req, res, next);
  }
});

// Get a test
router.get("/", GetTestMedicalIncident);

module.exports = router;