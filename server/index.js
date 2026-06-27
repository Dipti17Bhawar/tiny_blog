import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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



app.post("/signup", async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const user = new User(req.body);

    await user.save();

    res.json({
      success: true,
      message: "Signup Successful",
      data: user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Signup Failed",
    });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user in MongoDB and verify password

  res.json({
    success: true,
    message: "Login Successful",
  });
});



app.listen(8080, () => {
  console.log("Server running on port 8080");
  connectDB();
});