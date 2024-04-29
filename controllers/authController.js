const mongoose = require("mongoose");
require("../models/Patient");

const Patient = mongoose.model("Patient");
const Doctor = mongoose.model("Doctor");

const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");

const {
  generateRefreshToken,
} = require("../utils/TokenGenarate/generateRefreshToken");

const {
  generateAccessToken,
} = require("../utils/TokenGenarate/generateAccessToken");

const {
  refreshAccessToken,
} = require("../utils/TokenGenarate/refreshAccessGenerate");

const {
  forgotPasswordAccessToken,
} = require("../utils/TokenGenarate/forgotPasswordAccessToken");

const userSignUp = async (req, res) => {
  console.log(req.body);

  const { firstName, lastName, nic, email, password } = req.body;

  const existingUser = await Patient.findOne({ email });

  if (existingUser) {
    return res.status(400).send({ error: "Email is in use" });
  }

  try {
    const user = new Patient({ firstName, lastName, nic, email, password });
    await user.save();

    res.status(200).send();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const userSignIn = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Must provide email and password" });
  }

  const user = await Patient.findOne({ email });

  if (!user) {
    return res.status(400).send({ error: "Invalid email" });
  }

  try {
    await user.comparePassword(password);
  } catch (err) {
    return res.status(400).send({ error: "Invalid password or email" });
  }

  try {
    console.log(user._id, user.role, user.firstName, user.lastName);
    const accessToken = await generateAccessToken({
      _id: user._id,
      roles: user.role,
      fName: user.firstName,
      lName: user.lastName,
    });
    const refreshToken = await generateRefreshToken({
      _id: user._id,
      roles: user.role,
      fName: user.firstName,
      lName: user.lastName,
    });

    res.status(200).send({ accessToken, refreshToken });
  } catch (err) {
    return res.status(400).send({ error: "Server Error" });
  }
};

const doctorSignUp = async (req, res) => {
  const {
    firstName,
    lastName,
    nic,
    email,
    password,
    medicalId,
    medicalIdVerify,
  } = req.body;

  const existingDoctor = await Doctor.findOne({ email });
  if (existingDoctor) {
    return res.status(400).send({ error: "Email is in use" });
  }

  try {
    const doctor = new Doctor({
      firstName,
      lastName,
      nic,
      email,
      password,
      medicalId,
      medicalIdVerify,
    });
    await doctor.save();

    res.status(200).send("Success");
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const doctorSignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Must provide email and password" });
  }

  const doctor = await Doctor.findOne({ email });

  if (!doctor) {
    return res.status(400).send({ error: "Invalid email" });
  }
  const medicalId = doctor.medicalIdVerify;
  try {
    await doctor.comparePassword(password);
    console.log("password okay");
  } catch (err) {
    return res.status(400).send({ error: "Invalid Password" });
  }

  try {
    console.log(doctor._id, doctor.role, doctor.firstName, doctor.lastName);

    if (medicalId == false) {
      return res.status(400).send({ error: "Medical Id not verified" });
    }

    const accessToken = await generateAccessToken({
      _id: doctor._id,
      roles: doctor.role,
      fName: doctor.firstName,
      lName: doctor.lastName,
    });
    const refreshToken = await generateRefreshToken({
      _id: doctor._id,
      roles: doctor.role,
      fName: doctor.firstName,
      lName: doctor.lastName,
    });
    res.status(200).send({ accessToken, refreshToken, medicalId });
  } catch (err) {
    return res.status(400).send({ error: "Server Error" });
  }
};

const refreshAT = async (req, res) => {
  const { refreshToken } = req.body;
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(400).send({ error: "Must provide refresh token" });
  }
  // return res.status(200).send({ msg: "Success" });
  refreshAccessToken(refreshToken)
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        throw error;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ error: "Invalid refresh token" });
    });
};

//handle forgot passowrd
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email exists in the patient or doctor database
    let user = await Patient.findOne({ email });
    if (!user) {
      user = await Doctor.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }
    }

    // Generate a reset token
    const token = forgotPasswordAccessToken({ email: user.email }); // Using the utility function

    // Save the token to the user's document in the database
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send an email with a reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      // port: 587,
      // secure: false, // false for 587, true for 465, false for other ports
      auth: {
        user: "manushadananjaya999@gmail.com",
        pass: "tums mfyz lncy tmhk",
      },
    });

    const mailOptions = {
      from: 'manushadananjaya999@gmail.com',
      to: user.email,
      subject: "Password Reset",
      text:
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://${req.headers.host}/reset/${token}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email sent" });
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    console.log(token);
    
    const Token = jwt.verify(token, process.env.FORGOT_PASSWORD_TOKEN_SECRET);

    //find the user with the token using email

    let user = await Patient.findOne({ email: new Token.email }); 
    
    if (!user) {
      user = await Doctor.findOne({ email: new Token.email });
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }
    }

    //check if the token is expired

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ error: "Token expired" });
    }

    //if the token is not expired, render the reset password page
    res.render("resetPassword", { user });
  }
  catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  userSignUp,
  userSignIn,
  doctorSignUp,
  doctorSignIn,
  refreshAT,
  forgotPassword,
  resetPassword,
};
