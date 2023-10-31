const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ErrorHandler = require('./middlewares/errorHandler');
const authRouter = require('./routes/authRouter');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const accountRouter = require('./routes/accountRouter');
const PORT = 3000;
require('dotenv').config();

//middlwares
app.use(cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json());
app.use(express.static("content"))
app.use(express.urlencoded({extended: false}))


//router
app.use('/auth', authRouter);
app.use('/accounts', accountRouter);

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
