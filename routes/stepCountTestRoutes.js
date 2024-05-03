const express = require("express");
const {
  getStepCounterTestResult,
  createStepCountResult,
  deleteStepCounterTestResult,
  deleteOneStepCountResult,
} = require("../controllers/stepCountController");

const router = express.Router();

//get all results
router.get("/", getStepCounterTestResult);

//post a new result
router.post("/", createStepCountResult);

//delete results
router.delete("/", deleteStepCounterTestResult);

//delete one result
router.delete("/:id", deleteOneStepCountResult);

module.exports = router;
