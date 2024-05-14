const express = require("express");
const router = express.Router();
const {
  userSignUp,
  userSignIn,
  doctorSignUp,
  doctorSignIn,
  refreshAT,
  forgotPassword,
  verifyOTP,
  resetPassword,
  resendOTP,
} = require("../controllers/authController");
const { verify } = require("jsonwebtoken");

// Patient Sign-up
router.post("/signup", userSignUp);

// Patient Sign-in
router.post("/signin", userSignIn);

// Doctor Sign-up
router.post("/doctors/signup", doctorSignUp);

// Doctor Sign-in
router.post("/doctors/signin", doctorSignIn);

// Refresh Access Token
router.post("/refreshAT", refreshAT);

// Forgot Password
router.post("/forgotPassword", forgotPassword);

//otp verification
router.post("/verifyOTP", verifyOTP);

//password reset
router.post("/resetPassword", resetPassword);

//resend OTP
router.post("/resendOTP", resendOTP);

module.exports = router;
