const express = require("express");
const Router = require("./Routes/userRoute");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser"); // Import body-parser
const cookieParser = require("cookie-parser");
const productRouter = require("./Routes/productRoute");
const ReviewRouter = require("./Routes/reviewRoute");
const CartRouter = require("./Routes/cartRoute");
const AddressRouter = require("./Routes/addressRoute");
const PaymentRouter = require("./Routes/paymentRoute");
const WishlistRouter = require("./Routes/wishlistRoute");
const OrderRouter = require("./Routes/orderRoute");
const ShippoRouter = require("./Routes/shippoRoute");

const errorMiddleware = require("./middleware/errorMiddleware");

require("dotenv").config();
connectDB();

const PORT = process.env.PORT;
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Make sure this is set correctly
    credentials: true, // Allow cookies
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204, // Respond with 204 No Content for preflight requests
  })
);
app.use("/api/payment/webhook", bodyParser.raw({ type: "application/json" }));

app.use(express.json());

app.use("/api/user", Router);
app.use("/api/product", productRouter);
app.use("/api/review", ReviewRouter);
app.use("/api/cart", CartRouter);
app.use("/api/address", AddressRouter);
app.use("/api/payment", PaymentRouter);
app.use("/api/wishlist", WishlistRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/shippo", ShippoRouter);

console.log("Hello world");

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json({ msg: "Hello world" });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
