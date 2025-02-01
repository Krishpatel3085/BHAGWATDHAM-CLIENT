const PublicationSchema = require('../Model/Publication')
const multer = require("multer");
const dotenv = require('dotenv');
dotenv.config()


const aws = require('aws-sdk');
const multers3 = require('multer-s3')
const BUCKET_NAME = process.env.BUCKET_NAME;
const s3 = new aws.S3();

const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldname: file.fieldname })
        },
        key: function (req, file, cb) {
            cb(null, file.originalname);
        },
    })
})

// Upload Image 
const CreatePublication = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'File is required' });
        }

        const { Publication, PublicationName, Description, PublicationDate } = req.body;
        const Img = `https://${BUCKET_NAME}.s3.amazonaws.com/${req.file.key}`;

        console.log("Data Fetch", req.body);
        console.log("Img Fetch", Img);

        const Publications = await PublicationSchema.create({
            Publication,
            PublicationName,
            Description,
            PublicationDate,
            Img,
        });

        res.status(200).json({ message: 'Image uploaded successfully', Publications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get Publications
const GetPublication = async (req, res) => {
    try {
        const Publications = await PublicationSchema.find()
        res.status(200).json({ message: 'Publications fetched successfully', Publications })
        console.log("Publications fetched successfully", Publications)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = { CreatePublication, GetPublication, upload }