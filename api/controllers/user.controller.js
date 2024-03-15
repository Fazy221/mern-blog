import User from "../model/user.model.js";

const getUsers = async (req, res) => {
  try {
    res.status(200).json({ message: "API working fine" });
  } catch (err) {
    res.status(500).json({ message: "Error when finding users" });
  }
};

export { getUsers };
