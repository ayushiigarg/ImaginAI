const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = require("./config/db");
const router = require("./routes/userRoutes");
const imageRouter = require("./routes/imageRoutes");

// In a serverless environment we don't listen on a port –
// Vercel will call the exported handler for each request.
// keep the PORT constant for local development if needed
const PORT = process.env.PORT || 4000;

const app = express();

// establish the database connection once
connectDb();

app.use(
  cors({
    origin: ["https://imagin-ai-delta.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/user", router);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => res.send("Hello World!"));

// export the Express app so Vercel can use it as a function
module.exports = app;
