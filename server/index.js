import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { signupUser, loginUser } from "./controllers/user.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running...",
  });
});

// Use controller functions
app.post("/signup", signupUser);
app.post("/login", loginUser);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});