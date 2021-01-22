const Jimp = require('jimp');

const UploadFileEdits =async (req)=>{
    const {worked,image} = await Jimp.read(req.file.buffer)
        .then(image => {
            // Do stuff with the image.
            image
                .quality(60)
                .resize(600, 400);
            return true,image;
        })
        .catch(err => {
            // Handle an exception.
            return false,err;
        });

    return worked,image;
}

module.exports = { UploadFileEdits }