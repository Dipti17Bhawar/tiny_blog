import User from "../models/User.js";

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
      password,
    });

    await newUser.save();

    console.log("Signup User:", newUser);

    res.json({
      success: true,
      message: "Signup Successful",
      data: newUser,
    });
  } catch (err) {
    console.log(err);

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
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.json({
        success: false,
        message: "Incorrect Password",
      });
    }

    console.log("Login User:", user);

    res.json({
      success: true,
      message: "Login Successful",
      data: user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};