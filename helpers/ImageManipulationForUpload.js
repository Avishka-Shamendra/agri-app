const Jimp = require('jimp');

const UploadFileEdits = async (req)=>{
    const [worked,image] = await Jimp.read(req.file.buffer)
        .then(image => {
            // Do stuff with the image.

            let buffer_data ={};

            image
                .resize(600, 400)
                .quality(60);

            image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                buffer_data['node_buffer'] = buffer
            });
            return [true,buffer_data.node_buffer];

        })
        .catch(err => {
            // Handle an exception.
            return [false,err];
        });
    return [worked,image];
}

module.exports = { UploadFileEdits }