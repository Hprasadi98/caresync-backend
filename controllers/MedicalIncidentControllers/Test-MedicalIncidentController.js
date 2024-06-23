const TestMedicalIncident = require("../../models/MedicalIncidentModels/Test-IncidentModel");
const MedicalRecord = require("../../models/medicalRecord");
const mongoose = require("mongoose");

const createTestIncident = async (req, res) => {
  try {
    const {
      recordID,
      testType,
      provider,
      description,
      testDate,
      result,
      resultLink,
    } = req.body;

    // *Validation
    if (!recordID || !testType || !provider || !testDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the recordID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(recordID)) {
      return res.status(400).json({ error: "Invalid record ID" });
    }

    // Check if a document with the provided recordID exists
    const currentRecord = await MedicalRecord.findOne({
      _id: recordID,
    });

    if (!currentRecord) {
      return res.status(400).json({ error: "Record does not exist" });
    }

    const currentTestIncident = new TestMedicalIncident({
      recordID,
      testType,
      provider,
      description,
      testDate,
      result,
      resultLink,
    });

    // Save the updated incident document
    await currentTestIncident.save();

    // Add the incident to the record
    currentRecord.incidents.testIncidents.push(currentTestIncident._id);
    await currentRecord.save();

    res.status(200).json({ message: "Incident saved successfully" });
  } catch (error) {
    console.error("Error saving incident:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTestIncident = async (req, res) => {
  try {
    const { incidentID, recordID } = req.params;

    // Check if the incidentID and recordID are valid ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(incidentID) ||
      !mongoose.Types.ObjectId.isValid(recordID)
    ) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    // Find and remove the test incident
    const incident = await TestMedicalIncident.findByIdAndDelete(incidentID);
    if (!incident) {
      return res.status(404).json({ error: "Incident not found" });
    }

    // Remove the incident reference from the medical record
    const record = await MedicalRecord.findById(recordID);
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    record.incidents.testIncidents.pull(incidentID);
    await record.save();

    res.status(200).json({ message: "Incident deleted successfully" });
  } catch (error) {
    console.error("Error deleting incident:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTestIncident,
  deleteTestIncident,
};
