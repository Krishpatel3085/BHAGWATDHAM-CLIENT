const express = require("express");
const mongoose = require("mongoose");
const { admin_router } = require("./Routes/admin");
const { event_router } = require("./Routes/event");
const dotenv = require('dotenv');
const cors = require("cors");

const app = express()
app.use(express.json())
app.use(cors());
dotenv.config()

app.use('/user', admin_router)
app.use('/Event', event_router )

app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to MongoDB Succefully")
    console.log(`server Started on http//localhost:${process.env.PORT}/`)
}) 