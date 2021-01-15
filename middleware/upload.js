const multer = require("multer");
const { UploadFileEdits } = require('../helpers/ImageManupulationForUpload')


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
        fileSize: 6*1000*1000
    },
    fileFilter: imageFilter
});

function uploadFileMiddleware(req, res, next) {
    //console.log(req.url);
    const upload = uploadFile.single('file');

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError && (req.url === '/addPost' || req.url === '/farmer/addPost' || req.url ==='farmer/addPost' )) {
            res.redirect(`/farmer/addPost?error=${err}&title=${req.body.title}&product_name=${req.body.product_name}&expected_price=${req.body.expected_price}&quantity=${req.body.quantity}&phone_num=${req.body.phone_num}&description=${req.body.description}`);
        }
        else if(err === 'filetypeError'){
            res.redirect(`/farmer/addPost?error=The File is not an Image&title=${req.body.title}&product_name=${req.body.product_name}&expected_price=${req.body.expected_price}&quantity=${req.body.quantity}&phone_num=${req.body.phone_num}&description=${req.body.description}`);
        }
        else if (err) {
            res.send(`something went wrong ${err}`);
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

//console.log('multer object created')

module.exports = uploadFileMiddleware;