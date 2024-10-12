const multer = require("multer");
const path = require("path");

// Configure storage settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in the 'uploads/' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
        console.log("Generated Filename:", filename); // Debug log
        cb(null, filename); // Correct usage: Pass 'null' as the first argument for success
    }
});

// Multer upload configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/; // Allowed file types
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extname && mimeType) {
            cb(null, true); // Accept file
        } else {
            cb(new Error("Only JPEG, JPG, and PNG images are allowed!")); // Reject file
        }
    }
});

module.exports = upload;