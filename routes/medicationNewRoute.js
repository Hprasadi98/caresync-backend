const express = require("express");
const {
  getMedicationform,
  postMedicationForm
} = require("../controllers/medicationNewController.js");
const router = express.Router();

//get result
router.get("/", getMedicationform);

//post a new result
router.post("/", postMedicationForm);

module.exports = router;
