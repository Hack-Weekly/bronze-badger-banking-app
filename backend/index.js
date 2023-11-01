const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ErrorHandler = require('./middlewares/errorHandler');
const authRouter = require('./routes/authRouter');
const transferRouter = require('./routes/transferRouter');
const transactionRouter = require('./routes/transactionRouter');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const accountRouter = require('./routes/accountRouter');
const PORT = 3000;
require('dotenv').config();

//middlwares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json());
app.use(express.static("content"))
app.use(express.urlencoded({extended: false}))


//router
app.use('/auth', authRouter);
app.use('/accounts', accountRouter);
app.use('/transfer', transferRouter);
app.use('/transactions', transactionRouter)

//error handler middleware
app.use(ErrorHandler);

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    app.listen(PORT, ()=> {
        console.log("connected to db & server is running")
    })
})
.catch((error)=> {
    console.log(error)
})
