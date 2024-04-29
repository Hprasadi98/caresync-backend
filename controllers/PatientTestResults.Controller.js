const mongoose = require("mongoose");
const Patient = require("../models/Patient");

const addTestResultLink = async (req, res) => {
  try {
    const { link, patientID, name } = req.body;

    if (!link || !patientID || !name) {
      return res.status(400).json({ error: "Missing required data" });
    }
    if (!mongoose.Types.ObjectId.isValid(patientID)) {
      return res.status(400).json({ error: "Invalid patient ID" });
    }

    const patient = await Patient.findById(patientID);

    if (!patient) {
      return res.status(400).json({ error: "No such patient" });
    }

    const patientData = await Patient.findOneAndUpdate(
      { _id: patientID },
      {
        $addToSet: { testResultLinks: { link: link, TestName: name } },
      }
    );

    res.status(200).json();
  } catch (error) {
    console.error("Error posting link", error);
    res.status(400).json({ error: "Internal server error" });
  }
};

const getTestResultLinks = async (req, res) => {
  try {
    const { patientID } = req.query;
    console.log(patientID);

    if (!patientID) {
      return res.status(400).json({ error: "Missing required data" });
    }
    if (!mongoose.Types.ObjectId.isValid(patientID)) {
      return res.status(400).json({ error: "Invalid patient ID" });
    }

    const patient = await Patient.findById(patientID);

    if (!patient) {
      return res.status(400).json({ error: "No such patient" });
    }

    const patientData = await Patient.findOne({ _id: patientID });

    res.status(200).json(patientData.testResultLinks);
  } catch (error) {
    console.error("Error getting links", error);
    res.status(400).json({ error: "Internal server error" });
  }
};

const deleteTestResultLink = async (req, res) => {
  try {
    const { link } = req.body;
    const { patientID } = req.body;

    if (!link || !patientID) {
      return res.status(400).json({ error: "Missing required data" });
    }
    if (!mongoose.Types.ObjectId.isValid(patientID)) {
      return res.status(400).json({ error: "Invalid patient ID" });
    }

    const patient = await Patient.findById(patientID);

    if (!patient) {
      return res.status(400).json({ error: "No such patient" });
    }

    const patientData = await Patient.findOneAndUpdate(
      { _id: patientID },
      {
        $pull: { testResultLinks: link },
      }
    );

    res.status(200).json();
  } catch (error) {
    console.error("Error deleting link", error);
    res.status(400).json({ error: "Internal server error" });
  }
};

module.exports = {
  addTestResultLink,
  getTestResultLinks,
  deleteTestResultLink,
};
