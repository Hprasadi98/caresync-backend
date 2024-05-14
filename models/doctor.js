const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  medicalId: {
    type: String,
    required: true,
  },
  medicalIdVerify: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "doctor",
  },
  specialization: {
    type:String,
    default: "General"
  },
  accessPatients:{
    type: Array,
    default: []
  },
  resetPasswordOTP: {
    type: String,
  },
  resetPasswordOTPExpires: {
    type: Date,
  },
},
  { timestamps: true });

// Hash the password before saving the user model
doctorSchema.pre("save", function (next) {
  const doctor = this;
  if (!doctor.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(doctor.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      doctor.password = hash;
      next();
    });
  });
});


// Compare the password given by the user and the one in the database
doctorSchema.methods.comparePassword = function (candidatePassword) {
  const doctor = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, doctor.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

module.exports = mongoose.model("Doctor", doctorSchema);
