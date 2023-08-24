const express = require('express');
const app = express();
const connectDB = require('./app/config/connectDb');
require('dotenv').config();
const errorHandler = require('./app/middlewares/middleware.error');
const success = require('./app/middlewares/middleware.success');
connectDB();

app.use(express.json());
app.use('/user', require('./app/routers/router.user.js'));
app.use('/category', require('./app/routers/router.category.js'));
app.use('/book', require('./app/routers/router.book.js'));

//always use on the last after routes
app.use(errorHandler);
app.use(success);

app.listen(process.env.PORT, () => {
    console.log(`app listening at http://127.0.0.1:${process.env.PORT}`);
});
