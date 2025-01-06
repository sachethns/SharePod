import AWS from 'aws-sdk';
import { File } from '../models/file.models.js';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read', // set ACL as needed
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 1024 }, // adjust file size limit as needed
});

const uploadFiles = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  // File object with S3 URL
  const fileObj = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
    path: req.file.location, // S3 file URL
  };
  const SERVER_URL = process.env.SERVER_URL;

  try {
    const file = await File.create(fileObj);
    res.status(200).json({
      msg: "File Uploaded Successfully",
      path: file.path, // Direct S3 link
      data: file,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    file.downloadedContent++;
    await file.save();

    // Initiate file download from S3
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.path.split('/').slice(1).join('/'), // Extract key from path
    };

    const fileStream = s3.getObject(s3Params).createReadStream();
    res.attachment(file.name);
    fileStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { uploadFiles, downloadFile };
