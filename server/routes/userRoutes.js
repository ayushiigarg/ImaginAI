const express = require("express");
const {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/credits", auth, userCredits);
router.post("/pay-razor", auth, paymentRazorpay);
router.post("/verify-razor", verifyRazorpay);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
