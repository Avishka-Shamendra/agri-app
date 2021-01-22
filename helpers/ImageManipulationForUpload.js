const Jimp = require('jimp');

const UploadFileEdits = async (req)=>{
    const [worked,image] = await Jimp.read(req.file.buffer)
        .then(image => {
            // Do stuff with the image.
            image
                .resize(600, 400)
                .quality(60);
            return [true,image];

        })
        .catch(err => {
            // Handle an exception.
            return [false,err];
        });
    return [worked,image];
}

module.exports = { UploadFileEdits }