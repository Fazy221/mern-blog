import User from "../model/user.model.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) res.status(400).json({ message: "No user found!" });
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: "Error when finding users" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) res.status(400).json({ message: "Id not found!" });
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error when deleting user!" });
  }
};
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) res.status(400).json({ message: "Id not found!" });
    const { username, email, password } = req.body;
    await User.findByIdAndUpdate(id, { username, email, password });
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error when updating user" });
  }
};
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await User.create({ username, email, password });
    res.status(200).json({ message: "User created successfuly" });
  } catch (err) {
    res.status(500).json({ message: "Error when creating user " + err });
  }
};
export { getUsers, deleteUser, updateUser, createUser };
