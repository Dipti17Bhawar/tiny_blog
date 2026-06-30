import User from "../models/User.js";
import md5 from "md5";
import jwt from "jsonwebtoken";

const hashPassword = (password) => md5(password);

const isPasswordValid = (storedPassword, inputPassword) => {
  const hashedInput = hashPassword(inputPassword);
  return storedPassword === hashedInput || storedPassword === inputPassword;
};

// Signup
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new User({
      name,
      email,
      password: hashPassword(password),
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Signup Successful",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!isPasswordValid(user.password, password)) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    if (user.password !== hashPassword(password) && user.password === password) {
      user.password = hashPassword(password);
      await user.save();
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};