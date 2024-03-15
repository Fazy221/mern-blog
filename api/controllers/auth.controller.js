import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "")
    next(errorHandler(401, "Fill all the required information!"));
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Password not correct!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export { signup, signin };
