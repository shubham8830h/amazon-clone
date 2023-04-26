import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
const userRouter = express.Router();
import { isAuth } from "../middleware/auth.js";

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    let data = req.body;
    const { email, password } = data;
    if (!email)
      return res.status(400).send({ status: false, msg: "email is required" });

    if (!password)
      return res
        .status(400)
        .send({ status: false, msg: "password is required" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .send({ status: false, msg: "Email is Invalid Please try again !!" });

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword)
      return res.status(400).send({
        status: false,
        msg: "Password is Invalid Please try again !!",
      });

    // Creating Token Using JWT //
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      "private_key"
    );

    res.status(200).send({
      _id: user._id,
      name: user.name,
      token: token,
      isAdmin: user.isAdmin,
      email: user.email,
    });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });

    const user = await newUser.save();
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      "private_key"
    );
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      const token = jwt.sign(
        {
          userId: user._id.toString(),
        },
        "private_key"
      );
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: token,
      });
    } else {
      res.status(404).send({ message: "User Not found" });
    }
  })
);

export default userRouter;
