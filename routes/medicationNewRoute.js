const express = require("express");
const {
  getMedicationforms,
  postMedicationForm,
} = require("../controllers/medicationNewController.js");
const router = express.Router();

//get result
router.get("/", getMedicationforms);

//post a new result
router.post("/", postMedicationForm);

module.exports = router;
