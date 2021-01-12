const multer = require("multer");

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

const storage = multer.memoryStorage();

const uploadFile = multer({
    storage: storage,
    fileFilter: imageFilter
});

//console.log('multer object created')

module.exports = uploadFile;