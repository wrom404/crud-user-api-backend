import mongoose from "mongoose";
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  const user = req.body;

  if (!user.name || !user.age || !user.image) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide all fields" });
  }

  const newUser = new User(user);
  try {
    await newUser.save();
    return res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find({});

  if (!users) {
    console.log("No users");
    return res.status(400).json({ success: false, msg: "NO users found" });
  }

  return res.status(200).json({ success: true, data: users });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, msg: "Invalid ID" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, msg: "Invalid ID" });
  }

  try {
    await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, msg: "User deleted successfully" });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, msg: "Invalid ID" });
  }

  try {
    const user = await User.findById(id);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};
