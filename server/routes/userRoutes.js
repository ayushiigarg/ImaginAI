const express = require("express");
const {
  registerUser,
  loginUser,
  userCredits,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/credits", auth, userCredits);

module.exports = router;
