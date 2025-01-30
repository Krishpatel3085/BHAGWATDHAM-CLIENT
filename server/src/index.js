const express = require("express");
const mongoose = require("mongoose");
const { admin_router } = require("./Routes/admin");
const { event_router } = require("./Routes/event");
const { exam_router } = require("./Routes/exam");
const { teacher_router } = require("./Routes/teacher");
const { student_router } = require("./Routes/student");
const { lecture_router } = require("./Routes/lecture");
const { marksheet_router } = require("./Routes/marksheet");
const { TempleGallery_router } = require("./Routes/gallery");
const { GalleryPage_router } = require("./Routes/galleryPage");
const dotenv = require('dotenv');
const cors = require("cors");

const app = express()
app.use(express.json())
app.use(cors());
dotenv.config()
const aws = require('aws-sdk')


aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

app.use('/user', admin_router)
app.use('/Event', event_router)
app.use('/Exam', exam_router)
app.use('/teacher', teacher_router)
app.use('/student', student_router)
app.use('/lecture', lecture_router)
app.use('/marksheet', marksheet_router)
app.use('/TempleGallery', TempleGallery_router)
app.use('/GalleryPage', GalleryPage_router)

app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to MongoDB Succefully")
    console.log(`server Started on http//localhost:${process.env.PORT}/`)
}) 