const express = require("express");
const router = express.Router();
const {
  userSignUp,
  userSignIn,
  doctorSignUp,
  doctorSignIn,
  refreshAT,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

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

// Reset Password Route
router.get("/reset/:token", resetPassword);

module.exports = router;
