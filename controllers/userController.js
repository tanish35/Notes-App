import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import requireAuth from "../middleware/requireAuth.js";
async function signUp(req, res) {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  const hashedPassword = bcrypt.hashSync(password, 8);
  if (userExists) {
    res.sendStatus(418);
    return;
  }
  const user = await User.create({ email, password: hashedPassword });
  res.json(user);
}

async function signIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.sendStatus(404);
    return;
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    res.sendStatus(401);
    return;
  }
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
  const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);
  res.cookie("Authorization", token, {
    expires: new Date(exp),
    secure: false,
    useHttpOnly: true,
    sameSite: "lax",
  });
  res.json(user);
}

function signOut(req, res) {
  res.clearCookie("Authorization");
  res.sendStatus(200);
}

function checkAuth(req, res) {
  res.sendStatus(200);
}

export { signUp, signIn, signOut, checkAuth };
