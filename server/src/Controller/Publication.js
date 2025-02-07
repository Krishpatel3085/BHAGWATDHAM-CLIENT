const PublicationSchema = require('../Model/Publication')
const dotenv = require('dotenv');
dotenv.config()

const { uploadToS3, s3 } = require('../Middleware/aws')
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.AWS_REGION;

// Upload Image 
const CreatePublication = async (req, res) => {
    try {
        if (!req.files['Img']) {
            return res.status(400).json({ message: 'Image and PDF files are required' });
        }

        const { Publication, PublicationName, Description, PublicationDate, Link } = req.body;
        const Img = req.files['Img']
            ? await uploadToS3(req.files['Img'][0])
            : null;

        const Pdf = req.files['Pdf']
            ? await uploadToS3(req.files['Pdf'][0])
            : null;

        const Publications = await PublicationSchema.create({
            Publication,
            PublicationName,
            Description,
            PublicationDate,
            Img,
            Pdf,
            Link
        });

        res.status(200).json({ message: 'Publication created successfully', Publications });
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
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// Update Image (Text & Image)
const updatePublication = async (req, res) => {
    try {
        const { Publication, PublicationName, Description, PublicationDate, Link } = req.body;
        const id = req.params.id;

        const existingPublication = await PublicationSchema.findById(id);
        if (!existingPublication) {
            return res.status(404).json({ message: 'Publication not found' });
        }

        let updatedImg = existingPublication.Img;
        let updatedPdf = existingPublication.Pdf;

        if (req.files) {
            // Update Image
            if (req.files['Img']) {
                const oldImageKey = existingPublication.Img.split(`${BUCKET_NAME}.s3.${REGION}.amazonaws.com/`)[1];
                if (oldImageKey) {
                    await s3.send(new DeleteObjectCommand({
                        Bucket: BUCKET_NAME,
                        Key: oldImageKey,
                    }));
                }
                updatedImg = await uploadToS3(req.files['Img'][0]);
            }

            // Update PDF
            if (req.files['Pdf']) {
                const oldPdfKey = existingPublication.Pdf.split(`${BUCKET_NAME}.s3.${REGION}.amazonaws.com/`)[1];
                if (oldPdfKey) {
                    await s3.send(new DeleteObjectCommand({
                        Bucket: BUCKET_NAME,
                        Key: oldPdfKey,
                    }));
                }
                updatedPdf = await uploadToS3(req.files['Pdf'][0]);
            }
        }

        const updatedPublication = await PublicationSchema.findByIdAndUpdate(
            id,
            { Publication, PublicationName, Description, PublicationDate, Link, Img: updatedImg, Pdf: updatedPdf },
            { new: true }
        );

        res.status(200).json({ message: 'Publication updated successfully', publication: updatedPublication });
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
            await s3.send(new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: imageKey,
            }));
        }

        if (pdfKey) {
            await s3.send(new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: pdfKey,
            }));
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


module.exports = { CreatePublication, GetPublication, deletePublication, updatePublication }