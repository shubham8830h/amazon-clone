import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
// import orderRouter from "./routes/orderRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log("mongoDb is connected..."))
  .catch((err) => console.log(err));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Backend is running on ${port}`);
});
