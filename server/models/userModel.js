const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  creditBalance: {
    type: Number,
    default: 5,
  },
  resetPasswordToken: {
    type: String,
    trim: true, // Remove whitespace
    sparse: true, // Allow null/undefined values
  },
  resetPasswordExpires: {
    type: Date,
    sparse: true,
  },
});

// Add a method to check token validity
userSchema.methods.isResetTokenValid = function () {
  return (
    this.resetPasswordToken &&
    this.resetPasswordExpires &&
    this.resetPasswordExpires.getTime() > Date.now()
  );
};

module.exports = mongoose.model("User", userSchema);
