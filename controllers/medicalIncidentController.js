const TestMedicalIncident = require('../models/medicalIncidentTestModel');
const mongoose = require('mongoose');

// Create a new medical incident
const createTestMedicalIncident = async (req, res) => {
  const {incidentType, date,testType, testProvider} = req.body;
  
  try {
    // Create a new test medical incident document
    const testMedicalIncident = await TestMedicalIncident.create({incidentType, date ,testType,testProvider});

    // Respond with the created test medical incident
    res.status(200).json(testMedicalIncident);
  } catch (error) {
    // If an error occurs during creation, respond with the error message
    res.status(400).json({ error: error.message });
  }
};



const GetTestMedicalIncident = async (req, res) => {
  try {
    console.log("Fetching tests");
    const Tests = await TestMedicalIncident.find({}).sort({ createdAt: -1 });;
    // .sort({
    //   createdAt: -1,
    // });
    console.log(Tests);
    res.status(200).json(Tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTestMedicalIncident,GetTestMedicalIncident
};
