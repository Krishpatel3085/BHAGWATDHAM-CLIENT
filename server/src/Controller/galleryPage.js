const GalleryPageSchema = require('../Model/gallery')
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
const uploadGalleryPage = async (req, res) => {
    try {
        const { ImageName, ImageSubject, Imageyear } = req.body
        const Img = `https://${BUCKET_NAME}.s3.amazonaws.com/${req.file.key}`

        console.log("Data Fetch", req.body)
        console.log("Img Fetch", Img)
        const gallery = await GalleryPageSchema.create({
            ImageName: ImageName,
            ImageSubject: ImageSubject,
            Img: Img,
            Imageyear: Imageyear,
        })

        res.status(200).json({ message: 'Image uploaded successfully', gallery })
        console.log("Image Created successfully", gallery)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


// Get All Images
const getAllGalleryPages = async (req, res) => {
    try {
        const galleries = await GalleryPageSchema.find({})
        res.status(200).json({ message: 'All images fetched successfully', galleries })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


// Update Image (Text & Image)
const updateGalleryPage = async (req, res) => {
    try {
        const { ImageName, ImageSubject, Imageyear } = req.body;
        const id = req.params.id;
        console.log(" id ", id)
        console.log('Received update data:', req.body);

        const existingGallery = await GalleryPageSchema.findById(id);

        if (!existingGallery) {
            return res.status(404).json({ message: 'Image not found' });
        }

        let updatedImg = existingGallery.Img;
        const oldImageKey = existingGallery.Img ? existingGallery.Img.split(`${BUCKET_NAME}.s3.amazonaws.com/`)[1] : null;

        if (req.file) {
            // Delete old image if it exists
            if (oldImageKey) {
                await s3.deleteObject({
                    Bucket: BUCKET_NAME,
                    Key: oldImageKey,
                }).promise();
            }

            // Store the new image URL
            updatedImg = `https://${BUCKET_NAME}.s3.amazonaws.com/${req.file.key}`;
        }

        // Update the gallery with new details
        const updatedGallery = await GalleryPageSchema.findByIdAndUpdate(id,
            { ImageName, ImageSubject, Imageyear, Img: updatedImg },
            { new: true }
        );

        res.status(200).json({ message: 'Image updated successfully', gallery: updatedGallery });
        console.log("Image Updated Successfully:", updatedGallery);

    } catch (error) {
        console.error("Error updating image:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Delete Image (from DB & AWS S3)
const deleteGalleryPage = async (req, res) => {
    try {
        const { id } = req.params;
        const gallery = await GalleryPageSchema.findById(id);
        if (!gallery) {
            return res.status(404).json({ message: 'Image not found' });
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
        await GalleryPageSchema.findByIdAndDelete(id);

        res.status(200).json({ message: 'Image deleted successfully' });
        console.log("Image Deleted successfully", gallery);

    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { uploadGalleryPage, upload, getAllGalleryPages, updateGalleryPage,deleteGalleryPage }