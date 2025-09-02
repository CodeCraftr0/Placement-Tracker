// backend/index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// connect to Mongo
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
connectDB();

// routes
const applicationsRouter = require("./routes/applications");
app.use("/api/applications", applicationsRouter);

app.get("/", (req, res) => {
  res.send("🚀 Placement Prep Tracker API is running");
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
