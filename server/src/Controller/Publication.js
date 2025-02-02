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

// Update Image (Text & Image)
const updatePublication = async (req, res) => {
    try {
        const { Publication, PublicationName, Description, PublicationDate } = req.body;
        const id = req.params.id;
        
        console.log("Updating Publication ID:", id);
        console.log("Received Data:", req.body);

        const existingPublication = await PublicationSchema.findById(id);
        if (!existingPublication) {
            return res.status(404).json({ message: 'Publication not found' });
        }

        let updatedImg = existingPublication.Img; // Keep existing image if no new file is uploaded
        if (req.file) {
            const oldImageKey = existingPublication.Img.split(`${BUCKET_NAME}.s3.amazonaws.com/`)[1];

            // Delete the old image from S3
            if (oldImageKey) {
                await s3.deleteObject({ Bucket: BUCKET_NAME, Key: oldImageKey }).promise();
            }

            // Save the new image URL
            updatedImg = `https://${BUCKET_NAME}.s3.amazonaws.com/${req.file.key}`;
        }

        // Update database entry
        const updatedPublication = await PublicationSchema.findByIdAndUpdate(
            id,
            { Publication, PublicationName, Description, PublicationDate, Img: updatedImg },
            { new: true }
        );

        res.status(200).json({ message: 'Publication updated successfully', gallery: updatedPublication });
        console.log("Publication Updated Successfully:", updatedPublication);
    } catch (error) {
        console.error("Error updating publication:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// Delete Image (from DB & AWS S3)
const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const gallery = await PublicationSchema.findById(id);
        if (!gallery) {
            return res.status(404).json({ message: 'Publication not found' });
        }

        const imageKey = gallery.Img.split(`${BUCKET_NAME}.s3.amazonaws.com/`)[1];

        if (imageKey) {
            // Delete image from AWS S3
            await s3.deleteObject({
                Bucket: BUCKET_NAME,
                Key: imageKey,
            }).promise();
        }

        // Delete image details from DB
        await PublicationSchema.findByIdAndDelete(id);

        res.status(200).json({ message: 'Image deleted successfully' });
        console.log("Image Deleted successfully", gallery);

    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = { CreatePublication, GetPublication, upload, deletePublication, updatePublication }