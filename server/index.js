import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT=process.env.PORT ||8080;

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL || process.env.MONGODB_URL;

    if (!mongoUrl) {
      throw new Error("Missing MongoDB connection string. Set MONGO_URL in .env");
    }

    console.log("Connecting to MongoDB with URI:", mongoUrl.startsWith("mongodb") ? "[REDACTED]" : mongoUrl);

    await mongoose.connect(mongoUrl);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};



app.get("/" ,(req,res) =>{
  res.json({
    success:true,
    message:"API is running.....",
  });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
  connectDB();
});