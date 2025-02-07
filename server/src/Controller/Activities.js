const ActivitiesSchema = require('../Model/Activities')
const dotenv = require('dotenv');
dotenv.config()

const aws = require('aws-sdk');
const s3 = new aws.S3();
const BUCKET_NAME = process.env.BUCKET_NAME;

// Upload Image 
const CreateActivities = async (req, res) => {
    try {
        const { ActivitiesName, ActivitiesSubject, ActivitiesDate, ActivitiesTime, ActivitiesDescription } = req.body
        const Img = `https://${BUCKET_NAME}.s3.amazonaws.com/${req.file.key}`

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
        const updatedGallery = await ActivitiesSchema.findByIdAndUpdate(id,
            { ActivitiesName, ActivitiesSubject, ActivitiesDate, ActivitiesTime, ActivitiesDescription, Img: updatedImg  },
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
            // Delete image from AWS S3
            await s3.deleteObject({
                Bucket: BUCKET_NAME,
                Key: imageKey,
            }).promise();
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
