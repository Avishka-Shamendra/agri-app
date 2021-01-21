const multer = require("multer");
const { UploadFileEdits } = require('../helpers/ImageManipulationForUpload')


const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("filetypeError", false);
    }
};

function fileError(err, next) {
    console.log('error', err);
    next(err);
}

const storage = multer.memoryStorage();

const uploadFile = multer({
    storage: storage,
    limits: {
       fileSize: 5*1000*1000
    },
    fileFilter: imageFilter
});

function uploadFileMiddleware(req, res, next) {
    //console.log(req.url);
    const upload = uploadFile.single('imgFile');

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError && (req.url === '/farmer/addPostImage')) {
            res.redirect(`/farmer/post/${req.params.post_id}?error=${err}`);
        }
        else if(err === 'filetypeError'){
            res.redirect(`/farmer/post/${req.params.post_id}?error=The File is not an Image`);
        }
        else if (err) {
            res.redirect(`/farmer/post/${req.params.post_id}?error=${err}`);
        }else {
            // Everything went fine.
            const {worked,image} = UploadFileEdits(req);
            if(worked){
                req.file.buffer = image;
            }
            //console.log(req.file.buffer)
            next()
        }
    })
}


module.exports = uploadFileMiddleware;