const express = require("express");
const { generateImage } = require("../controllers/imageController");
const auth = require("../middlewares/auth");
const imageRouter = express.Router();
imageRouter.post("/generate-image", auth, generateImage);
module.exports = imageRouter;
