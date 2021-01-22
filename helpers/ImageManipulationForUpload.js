const Jimp = require('jimp');

const UploadFileEdits = async (req)=>{
    //console.log(req.file.buffer);
    const [worked,image] = await Jimp.read(req.file.buffer)
        .then(image => {
            // Do stuff with the image.
            //console.log(image.bitmap.data)

            let buffer_data ={};

            image
                .resize(600, 400)
                .quality(60);

            image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                //console.log(buffer)
                buffer_data['node_buffer'] = buffer
                //return buffer;
            });
            //console.log('Here')
            //console.log(buffer_data.node_buffer)
            return [true,buffer_data.node_buffer];

        })
        .catch(err => {
            // Handle an exception.
            return [false,err];
        });
    return [worked,image];
}

module.exports = { UploadFileEdits }