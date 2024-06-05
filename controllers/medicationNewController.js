const { response } = require("express");
const Medication = require("../models/Medication.Model");

//get all medication of a patient
const getMedicationforms = async (req, res) => {
  const { id } = req.params;
  // console.log("ID:",id);
  const medicationData = await Medication.find({
    patientID: id,
  }).sort({ createdAt: -1 });
  res.status(200).json(medicationData);
};

//post medication
const postMedicationForm = async (req, res) => {
  const {
    userID,
    addedBy,
    medicine,
    addedDate,
    pills,
    days,
    dayArray,
    times,
    baw,
    description,
  } = req.body;

  console.log(req.body);
  console.log("userID", userID);

  //add doc to db
  try {
    const medicationData = await Medication.create({
      patientID: userID,
      addedBy,
      medicine,
      addedDate,
      pills,
      days,
      dayArray,
      times,
      baw,
      description,
    });
    res.status(200).json(medicationData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//delete one
const deleteOneMedication = (req, res, next) => {
  const { id } = req.params;
  Medication.deleteOne({ _id: id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//get medication for a specific day
const getMedicationforDay = async (req, res) => {
  const { date } = req.params;
  Medication.find({ dayArray: date })
    .sort({ createdAt: -1 })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//update medication
const updateMedication = async (req, res, next) => {
  const { id } = req.params;
  const {
    medicine,
    addedDate,
    pills,
    days,
    dayArray,
    times,
    baw,
    description,
  } = req.body;
  Medication.updateOne(
    { _id: id },
    {
      $set: {
        medicine: medicine,
        addedDate: addedDate,
        pills: pills,
        days: days,
        dayArray: dayArray,
        times: times,
        baw: baw,
        description: description,
      },
    }
  )
    .then((response) => {
      console.log(id);
      res.json({ response });
    })
    .then((data) => console.log(data))
    .catch((error) => {
      res.json({ error });
    });
};

module.exports = {
  getMedicationforms,
  postMedicationForm,
  deleteOneMedication,
  getMedicationforDay,
  updateMedication,
};
