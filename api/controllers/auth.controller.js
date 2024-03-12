import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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
      res.status(400).json({
        message:
          "Something wrong when signing up with this email, username or password",
      });
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

const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne(username);
    if (!user) res.status(401).json({ message: "User not found!" });
    const passwordCheck = bcryptjs.compareSync(password, user.password);
    if (!passwordCheck)
      res.status(401).json({ message: "Password not proper!" });
    const expiry = Date.now() + 1000 * 60 * 60 * 30 * 24;
    const token = jwt.sign({ sub: user._id }, process.env.SECRET_KEY);
    res.cookie("Authorization", token, {
      expires: new Date(expiry),
      sameSite: true,
      httpOnly: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Error when signing in " + err });
  }
};
export { signup, signin };
