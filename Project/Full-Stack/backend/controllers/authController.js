import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ firstName, lastName, email, password, role });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all users (only for job-posters)
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "job-poster") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update user profile (only job-seekers allowed)
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Restrict access to job-seeker role
    if (req.user.role !== "job-seeker") {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only job-seekers can update profile" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { phone, location, education, experience, skills } = req.body;

    user.phone = phone || user.phone;
    user.location = location || user.location;
    user.education = education || user.education;
    user.experience = experience || user.experience;
    user.skills = skills || user.skills;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        location: updatedUser.location,
        education: updatedUser.education,
        experience: updatedUser.experience,
        skills: updatedUser.skills,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout user (for completeness)
export const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
