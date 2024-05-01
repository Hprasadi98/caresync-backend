const addMedication = require("../models/medicationNewModel");

//get results
const getMedicationforms = async (req, res) => {
  const addmedication = await addMedication.find({}).sort({ createdAt: -1 });
  res.status(200).json(addmedication);
};


//post result
const postMedicationForm = async (req, res) => {
  const {
    by,
    medicine,
    date,
    pills,
    days,
    times,
    baw,
    description,
  } = req.body;

  //add doc to db
  try {
  const addmedication = await addMedication.create({
      by,
      medicine,
      date,
      pills,
      days,
      times,
      baw,
      description,
    });
    res.status(200).json(addmedication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

model.export = {
  getMedicationforms,
  postMedicationForm,
};
