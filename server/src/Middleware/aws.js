const multer = require("multer");
const dotenv = require('dotenv');
dotenv.config()


const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const BUCKET_NAME = process.env.BUCKET_NAME;

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const REGION = process.env.AWS_REGION;

const s3 = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});


// Configure Multer for storing files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to Upload Image to S3
const uploadToS3 = async (file) => {
    const fileName = `${Date.now()}-${file.originalname}`;

    const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileName}`;
};

module.exports = { upload, uploadToS3, s3 };
