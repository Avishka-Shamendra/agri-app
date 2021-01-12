const fs = require("fs");
const Image = require("./../models/Image");
const Errors = require('../helpers/error');

class FileService {
    static async uploadPostImage(file, post_id) {
        try {
            console.log(file);

            if (file == undefined) {
                throw new Errors.BadRequest(`You must select a file.`);
            }

            Image.create({
                post_id:post_id,
                type: file.mimetype,
                name: file.originalname,
                data: file.buffer,
            }).then((image) => {
                //console.log(image)
                return true;
            });
        } catch (error) {
            console.log(error);
            throw new Errors.BadRequest(`Error when trying upload images: ${error}`);
            //return res.send(`Error when trying upload images: ${error}`);

        }
    };

}

module.exports = FileService;