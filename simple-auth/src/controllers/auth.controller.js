import User from "../models/user.model.js";
import genrateTokenSetCookie from "../utils/genrateToken.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fileds are Required" });
    }

    // if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ userName, email, password });
    await newUser.save();

    const token = genrateTokenSetCookie(newUser._id, res);

    res.status(201).json({
      message: "User created",
      token,
      user: {
        _id: newUser._id,
        email: newUser.email,
        userName: newUser.userName,
      },
    });
  } catch (error) {
    console.log("Error on register controller", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fileds are required" });
    }

    // if not exist user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = genrateTokenSetCookie(user._id, res);

    res.status(200).json({
      message: "logged in Successfully",
      token,
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in login controller function", error);
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      expires: new Date(0),
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Logout failed", error: error.message });
  }
};
