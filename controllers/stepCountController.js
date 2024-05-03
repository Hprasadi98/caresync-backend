const stepCount = require("../models/MediTestingModels/stepCountModel");

//get results
const getStepCounterTestResult = async (req, res) => {
  const stepCountResult = await stepCount
    .find({ pID: 212 })
    .sort({ createdAt: -1 });
  res.status(200).json(stepCountResult);
};

//post result
const createStepCountResult = async (req, res) => {
  const { pID, date, stopwatchTime, steps, distance, calories } = req.body;

  //add doc to db
  try {
    const stepCounter = await stepCount.create({
      pID,
      date,
      stopwatchTime,
      steps,
      distance,
      calories,
    });
    res.status(200).json(stepCounter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete results
const deleteStepCounterTestResult = async (req, res) => {
  const deleteResult = await stepCount.deleteMany({});
  res.status(200).json(deleteResult);
};

//delete one result
const deleteOneStepCountResult = (req, res, next) => {
  const { id } = req.params;
  stepCount
    .deleteOne({ _id: id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

module.exports = {
  getStepCounterTestResult,
  createStepCountResult,
  deleteStepCounterTestResult,
  deleteOneStepCountResult,
};
