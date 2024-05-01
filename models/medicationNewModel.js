const mongoose = require("mongoose");
const { Schema } = mongoose;

const MedicationNewSchema = new Schema(
  {
    by:{
        type:String,
        required:true,
    },
    medicine:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    pills:{
        type:Number,
        required:true,
    },
    days:{
        type:Number,
        required:true,
    },
    times:{
        type:Number,
        required:true,
    },
    baw:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("addmedication", MedicationNewSchema);
