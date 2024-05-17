const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicalIncidentSchema = new Schema(
  {
    //medical record data
    recordName: {
      type: String,
    },
    recordDescription: {
      type: String,
    },

    incident: {
      type: [
        {
          incidentType: {
            type: String,
          },
          date: {
            type: Date,
          },
          testType: {
            type: String,
          },
          testProvider: {
            type: String,
          },
        },
        {
          incidentType: {
            type: String,
          },
          date: {
            type: Date,
          },
          symptomType: {
            type: String,
          },
          // symptomDescription: {
          //   type: String,
          // },



        },]
    },


    // //Symptom Modal data



    // frequency: {
    //   type: String,
    // },
    // severity: {
    //   type: String,
    // },
    // duration: {
    //   type: String,
    // },
    // //medication modal data
    // medi_name: {
    //   type: String,
    // },
    // dosage: {
    //   type: String,
    // },
    // medi_Frequency: {
    //   type: String,
    // },

    // //appointment modal data
    // purpose: {
    //   type: String,
    // },
    // health_pro_name: {
    //   type: String,
    // },
    // health_pro_contact: {
    //   type: String,
    // },
  },
  { timestamps: true }
);


module.exports = mongoose.model("MedicalIncident", MedicalIncidentSchema);



