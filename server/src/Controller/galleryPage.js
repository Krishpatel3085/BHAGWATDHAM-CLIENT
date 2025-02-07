const GalleryPageSchema = require('../Model/GalleryPage')
const dotenv = require('dotenv');
dotenv.config()


const aws = require('aws-sdk');
const s3 = new aws.S3();
const BUCKET_NAME = process.env.BUCKET_NAME;



// Upload Image 
const uploadGalleryPage = async (req, res) => {
    try {
        const { ImageName, ImageSubject, Imageyear } = req.body
        const Img = `https://${BUCKET_NAME}.s3.amazonaws.com/${req.file.key}`

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

module.exports = { uploadGalleryPage, getAllGalleryPages, updateGalleryPage,deleteGalleryPage }