import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import path from "path";

// Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Set up multer to use S3 as storage
const upload = multer({
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1 GB max file size
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read", // Files will be publicly accessible
    contentType: multerS3.AUTO_CONTENT_TYPE, // Auto set content type based on file extension
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      // Using original file name for S3 storage
      cb(null, `uploads/${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);

    // Allowed file extensions
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4" &&
      ext !== ".avi" &&
      ext !== ".mov" &&
      ext !== ".mkv" &&
      ext !== ".MKV" &&
      ext !== ".mk3d" &&
      ext !== ".mks" &&
      ext !== ".pdf" &&
      ext !== ".mka"
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }

    cb(null, true);
  },
});

export default upload;
