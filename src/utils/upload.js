const multer = require("multer")
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderPath = path.join(__dirname, "../uploads");
        cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        const aviableExtensions = [".jpg", ".jpeg", ".png", ".svg", ".webp"];
        const dotIndex = file.originalname.lastIndexOf(".")
        const ext = file.originalname.slice(dotIndex);

        if (!aviableExtensions.includes(ext)) {
            return cb(new Error("Invalid file type. Only jpg, jpeg, png, svg and webp are allowed."), false);
        }

        const filename = file.originalname.slice(0, dotIndex);
        cb(null, filename + "_" + Date.now() + ext);
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }
});


module.exports = upload
