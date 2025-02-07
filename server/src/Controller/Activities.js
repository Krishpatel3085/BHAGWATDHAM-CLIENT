const ActivitiesSchema = require('../Model/Activities')
const dotenv = require('dotenv');
dotenv.config()

// const s3 = require('../Middleware/aws')
const { uploadToS3, s3 } = require('../Middleware/aws')
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const BUCKET_NAME = process.env.BUCKET_NAME;

// Upload Image 
const CreateActivities = async (req, res) => {
    try {
        const { ActivitiesName, ActivitiesSubject, ActivitiesDate, ActivitiesTime, ActivitiesDescription } = req.body
        const Img = await uploadToS3(req.file);

        const activities = await ActivitiesSchema.create({
            ActivitiesName: ActivitiesName,
            ActivitiesSubject: ActivitiesSubject,
            ActivitiesDate: ActivitiesDate,
            ActivitiesTime: ActivitiesTime,
            ActivitiesDescription: ActivitiesDescription,
            Img: Img,
        })

        res.status(200).json({ message: 'Image uploaded successfully', activities })
        console.log("Image Created successfully", activities)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


// Fetch All Activities
const FetchAllActivities = async (req, res) => {
    try {
        const activities = await ActivitiesSchema.find({})
        res.status(200).json({ message: 'All images fetched successfully', activities })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const updateTActivities = async (req, res) => {
    try {
        const { ActivitiesName, ActivitiesSubject, ActivitiesDate, ActivitiesTime, ActivitiesDescription } = req.body
        const id = req.params.id;

        const existingGallery = await ActivitiesSchema.findById(id);

        if (!existingGallery) {
            return res.status(404).json({ message: 'Activities not found' });
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
        const updatedGallery = await ActivitiesSchema.findByIdAndUpdate(id,
            { ActivitiesName, ActivitiesSubject, ActivitiesDate, ActivitiesTime, ActivitiesDescription, Img: updatedImg },
            { new: true }
        );

        res.status(200).json({ message: 'Image updated successfully', gallery: updatedGallery });
        console.log("Image Updated Successfully:", updatedGallery);

    } catch (error) {
        console.error("Error updating image:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const deleteTempleActivities = async (req, res) => {
    try {
        const { id } = req.params;
        const gallery = await ActivitiesSchema.findById(id);
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
        await ActivitiesSchema.findByIdAndDelete(id);

        res.status(200).json({ message: 'Image deleted successfully' });
        console.log("Image Deleted successfully", gallery);

    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { CreateActivities, FetchAllActivities, updateTActivities, deleteTempleActivities }
