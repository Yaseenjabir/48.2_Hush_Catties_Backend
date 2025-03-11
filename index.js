const express = require("express");
const Router = require("./Routes/userRoute");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const productRouter = require("./Routes/productRoute");
const ReviewRouter = require("./Routes/reviewRoute");
const CartRouter = require("./Routes/cartRoute");
const AddressRouter = require("./Routes/addressRoute");
const errorMiddleware = require("./middleware/errorMiddleware");

require("dotenv").config();
connectDB();

const PORT = process.env.PORT;
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Make sure this is set correctly
    credentials: true, // Allow cookies
  })
);

console.log("Hell oworld");

app.use(express.json());
app.use("/api/user", Router);
app.use("/api/product", productRouter);
app.use("/api/review", ReviewRouter);
app.use("/api/cart", CartRouter);
app.use("/api/address", AddressRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json({ msg: "Hello world" });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
