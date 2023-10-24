const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ErrorHandler = require('./middlewares/errorHandler');
const authRouter = require('./routes/authRouter');
const cookieParser = require("cookie-parser");
const cors = require("cors")
const PORT = 3000;
require('dotenv').config();

//middlwares
app.use(cors())
app.use(express.json());
app.use(express.static("content"))
app.use(express.urlencoded({extended: false}))

app.use(cookieParser())

//router
app.use('/auth', authRouter);

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
