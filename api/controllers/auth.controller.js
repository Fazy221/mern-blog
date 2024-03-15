import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      password === "" ||
      email === ""
    )
      next(
        errorHandler(
          400,
          "Something wrong when signing up with this email, username or password"
        )
      );
    const hashedPassword = bcryptjs.hashSync(password, 8);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    // res.send(newUser);
    res.status(200).json({ message: "User created successfully!" });
  } catch (err) {
    next(err);
  }
};

export { signup };
