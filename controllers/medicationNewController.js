const addMedication = require("../models/medicationNewModel");

//get results
const getMedicationforms = async (req, res) => {
  const addmedications = await addMedication.find({}).sort({ createdAt: -1 });
  res.status(200).json(addmedications);
};

//post result
const postMedicationForm = async (req, res) => {
  const { by, medicine, date, pills, days, times, baw, description } = req.body;

  //add doc to db
  try {
    const addmedications = await addMedication.create({
      by,
      medicine,
      date,
      pills,
      days,
      times,
      baw,
      description,
    });
    res.status(200).json(addmedications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getMedicationforms,
  postMedicationForm,
};
