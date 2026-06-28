import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";

import { signupUser, loginUser } from "./controllers/user.js";

import {
  postBlogs,
  getBlogs,
  getBlogForSlug,
  putBlogs,
  patchPublishBlog,
} from "./controllers/blog.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

// ================= JWT Middleware =================

const jwtCheck = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authorization.split(" ")[1];

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.currentUser = decodedToken;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

// ==================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running...",
  });
});

// User Routes
app.post("/signup", signupUser);
app.post("/login", loginUser);

// Blog Routes
app.get("/blogs", getBlogs);
app.get("/blogs/:slug", getBlogForSlug);


// Protected Routes
app.post("/blogs", jwtCheck, postBlogs);
app.put("/blogs/:slug", jwtCheck, putBlogs);
app.patch("/blogs/:slug/publish", jwtCheck, patchPublishBlog);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});