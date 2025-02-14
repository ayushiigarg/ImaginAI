const User = require("../models/userModel");
const FormData = require("form-data");
const axios = require("axios");
const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body; // Extract userId
    const user = await User.findById(userId);
    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (user.creditBalance < 1) {
      return res.json({ success: false, message: "Insufficient Credits" });
    }
    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );
    const base64image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64image}`;
    await User.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });
    res.json({
      success: true,
      message: "Image Generated ",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.error("Generate Image Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

module.exports = { generateImage };
