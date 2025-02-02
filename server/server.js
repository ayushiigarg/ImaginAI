const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const router = require("./routes/userRoutes");

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

connectDb();
app.use(express.json());
app.use(cors());

app.use("/api/user", router);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
