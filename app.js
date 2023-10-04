const express = require("express");
const app = express();
const connectDB = require("./app/config/connectDb");
const expressFileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./app/middlewares/middleware.error");
const success = require("./app/middlewares/middleware.success");
const isAuth = require("./app/middlewares/middleware.auth");
const PORT = process.env.PORT || 5000;
const path = require("path");
connectDB();

app.use(cors());

// app.use(
//     cors({
//         origin: ["http://localhost:5178", "http://localhost:3000"],
//         credentials: true,
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//     })
// );

app.use(express.json());
app.use(expressFileUpload());
//response send path for file(kaha bata data send garne bhanne)

app.use(express.static("app/public"));
app.use("/auth", require("./app/routers/router.auth.js"));
app.use("/user", require("./app/routers/router.user.js"));
// app.use(isAuth);
app.use("/category", require("./app/routers/router.category.js"));
app.use("/book", require("./app/routers/router.book.js"));
app.use("/cart", require("./app/routers/router.cart.js"));

//always use on the last after routes
app.use(errorHandler);
app.use(success);

app.listen(process.env.PORT, () => {
    console.log(`app listening at http://127.0.0.1:${process.env.PORT}`);
});
