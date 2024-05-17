const mongoose = require("mongoose");
const Patient = require("../models/Patient");

//get all Patients
const getPatients = async (req, res) => {
  const Patients = await Patient.find({}).sort({ createdAt: -1 });
  // console.log(Patients);
  res.status(200).json(Patients);
};

//get a single Patient
const getPatient = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid patient ID" });
  }

  const patient = await Patient.findById(id);

  if (!patient) {
    return res.status(404).json({ error: "No such patient" });
  }
  // console.log(patient);
  res.status(200).json(patient);
};

const addDocAccess = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body.docID);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such patient" });
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.docID)) {
    return res.status(404).json({ error: "No such doctor" });
  }

  const patient = await Patient.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: { accessDoctors: req.body.docID },
    }
  );
  res.status(200).json(patient);
};

// delete a patient
const deletePatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such patient" });
  }

  console.log(id);
  const patient = await Patient.findOneAndDelete({ _id: id });

  if (!patient) {
    return res.status(400).json({ error: "No such patient" });
  }
  res.status(200).json({ message: "Patient deleted" });
};

const updatePatient = async (req, res) => {

  const { id } = req.params;
  const newData = req.body;
  try {
    // Find the patient by ID and update their information
    const updatedPatient = await Patient.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Optionally, you can perform additional operations or validation here

    // Send the updated patient object in the response
    // console.log(updatedPatient);
    res.json(updatedPatient);
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = {
  getPatients,
  getPatient,
  deletePatient,
  addDocAccess,
  updatePatient,
 
};
