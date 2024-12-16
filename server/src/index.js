const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

const app = express()
dotenv.config()

app.get("/test", (req, res) => {
    res.json({
        msg: "server is working"
    }).status(200)
})

app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to MongoDB Succefully")
    console.log(`server Started on http//localhost:${process.env.PORT}/`)
}) 