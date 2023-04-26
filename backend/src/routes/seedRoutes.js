import express from "express";
import Product from "../models/productModel.js";
const seedRouter = express.Router();
import data from "../../data.js";
import User from "../models/userModel.js";

seedRouter.get("/", async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
  // console.log(createdProducts);
  await User.remove({});
  const createduser = await User.insertMany(data.users);
  res.send(createduser);
});

export default seedRouter;
