const mongoose = require("mongoose");
const { Schema } = mongoose;

const MedicationSchema = new Schema(
  {
    patientID: {
      type: String,
      required: true,
    },
    addedBy: {
      type: String,
      required: true,
    },
    medicine: {
      type: String,
      required: true,
    },
    addedDate: {
      type: String,
      required: true,
    },
    pills: {
      type: Number,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    dayArray: {
      type: Array,
      required: true,
    },
    times: {
      type: Number,
      required: true,
    },
    baw: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medication", MedicationSchema);
