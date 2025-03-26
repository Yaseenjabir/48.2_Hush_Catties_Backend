const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Database is connected"));
  } catch (error) {
    console.log("Error connecting database : ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
