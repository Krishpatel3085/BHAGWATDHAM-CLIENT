const TempleGallerySchema = require('../Model/gallery')
const dotenv = require('dotenv');
dotenv.config()

const { uploadToS3, s3 } = require('../Middleware/aws')
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const BUCKET_NAME = process.env.BUCKET_NAME;


// Upload Image 
const uploadTempleGallery = async (req, res) => {
    try {
        const { ImageName, ImageSubject } = req.body
        // const Img = `https://${BUCKET_NAME}.s3.amazonaws.com/${req.file.key}`
        const Img = await uploadToS3(req.file);

        const gallery = await TempleGallerySchema.create({
            ImageName: ImageName,
            ImageSubject: ImageSubject,
            Img: Img,
        })

        res.status(200).json({ message: 'Image uploaded successfully', gallery })
        console.log("Image Created successfully", gallery)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


// Get All Images
const getAllTempleGallery = async (req, res) => {
    try {
        const galleries = await TempleGallerySchema.find({})
        res.status(200).json({ message: 'All images fetched successfully', galleries })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


// Update Image (Text & Image)
const updateTempleGallery = async (req, res) => {
    try {
        const { ImageName, ImageSubject } = req.body;
        const id = req.params.id;

        const existingGallery = await TempleGallerySchema.findById(id);

        if (!existingGallery) {
            return res.status(404).json({ message: 'Image not found' });
        }

        let updatedImg = existingGallery.Img;
        const oldImageKey = existingGallery.Img ? existingGallery.Img.split(`${BUCKET_NAME}.s3.amazonaws.com/`)[1] : null;


        if (req.file) {
            if (oldImageKey) {
                await s3.send(new DeleteObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: oldImageKey,
                }));
            }

            updatedImg = await uploadToS3(req.file);
        }


        // Update the gallery with new details
        const updatedGallery = await TempleGallerySchema.findByIdAndUpdate(id,
            { ImageName, ImageSubject, Img: updatedImg },
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
const deleteTempleGallery = async (req, res) => {
    try {
        const { id } = req.params;
        const gallery = await TempleGallerySchema.findById(id);
        if (!gallery) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const imageKey = gallery.Img.split(`${BUCKET_NAME}.s3.amazonaws.com/`)[1];

        if (imageKey) {
            await s3.send(new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: imageKey,
            }));
        }

        // Delete image details from DB
        await TempleGallerySchema.findByIdAndDelete(id);

        res.status(200).json({ message: 'Image deleted successfully' });
        console.log("Image Deleted successfully", gallery);

    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { uploadTempleGallery, getAllTempleGallery, updateTempleGallery, deleteTempleGallery }