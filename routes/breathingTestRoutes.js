const express = require("express");
const {
  getbreathingTestResult,
  createBreathingTestResult,
  deleteOneResult,
  deletebreathingTestResults,
} = require("../controllers/breathingTestController");

const router = express.Router();
//get all results
router.get("/", getbreathingTestResult);

//post a new result
router.post("/", createBreathingTestResult);

//delete results
router.delete("/", deletebreathingTestResults);

//delete result one by one
router.delete("/:id", deleteOneResult)

module.exports = router;
