const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database successfully");
  } catch (err) {
    console.log("Error connecting to Database:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
