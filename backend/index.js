const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ErrorHandler = require('./middlewares/errorHandler');
const authRouter = require('./routes/authRouter');
const PORT = 3000;
require('dotenv').config();

//middlwares
app.use(express.json());
app.use(express.static("content"))
app.use(express.urlencoded({extended: false}))

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
