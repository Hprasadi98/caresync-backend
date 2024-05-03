const { response } = require("express");
const breathingTest = require("../models/MediTestingModels/breathingTestModel.js");

//get results
const getbreathingTestResult = async (req, res) => {
  const breathingResults = await breathingTest
    .find({ pID: 212 })
    .sort({ createdAt: -1 });
  res.status(200).json(breathingResults);
};

//post result
const createBreathingTestResult = async (req, res) => {
  const { pID, date, systime, stopwatchTime } = req.body;

  //add doc to db
  try {
    const breathing = await breathingTest.create({
      pID,
      date,
      systime,
      stopwatchTime,
    });
    res.status(200).json(breathing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete results
const deletebreathingTestResults = async (req, res) => {
  const deleteResults = await breathingTest.deleteMany({});
  res.status(200).json(deleteResults);
};

//delete one
const deleteOneResult = (req, res, next) => {
  const { id } = req.params;
  breathingTest
    .deleteOne({ _id: id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

module.exports = {
  getbreathingTestResult,
  createBreathingTestResult,
  deleteOneResult,
  deletebreathingTestResults,
};
