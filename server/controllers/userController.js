const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const razorpay = require("razorpay");
const transactionModel = require("../models/transactionModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { name: newUser.name },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist. Please sign up first." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Invalid password. Please try again." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: { name: user.name },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset Request",
      text: `Click the link below to reset your password: \n\n ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ message: "Email could not be sent" });
      }
      res.status(200).json({ message: "Password reset link sent to email" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is missing" });
    }

    if (!newPassword) {
      return res.status(400).json({ message: "Please provide a new password" });
    }

    // Find user with matching token and check that the token hasn't expired
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password before saving
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// User Credits
const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    res.json({ credits: user.creditBalance, name: user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Payment Integration
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const userData = await userModel.findById(userId);
    if (!userId || !planId) {
      return res.json({ success: false, message: "Please fill in all fields" });
    }
    let credits, plan, amount, date;
    switch (planId) {
      case "Starter":
        plan = "Starter";
        credits = 100;
        amount = 10;
        break;
      case "Pro":
        plan = "Pro";
        credits = 500;
        amount = 50;
        break;
      case "Enterprise":
        plan = "Enterprise";
        credits = 2500;
        amount = 200;
        break;
      default:
        return res.json({ success: false, message: "Invalid plan" });
    }
    date = Date.now();
    const transactionData = {
      userId,
      plan,
      credits,
      amount,
      date,
    };
    const newTransaction = await transactionModel.create(transactionData);
    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
      return res.json({ success: true, order });
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const transactionData = await transactionModel.findById(
        orderInfo.receipt
      );
      if (transactionData.payment) {
        return res.json({ success: false, message: "Payment already done" });
      }
      const userData = await userModel.findById(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, { creditBalance });
      await transactionModel.findByIdAndUpdate(
        transactionData._id,
        { payment: true },
        { new: true }
      );
      res.json({ success: true, message: "Credits Added" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
};
