const fs = require("fs");
const Image = require("./../models/Image").Image;
const ImageClass = require("./../models/Image").ImageClass;
const Errors = require('../helpers/error');
const {img_add_keyword} = require('../helpers/image_helper');


class FileService {
    static async retrievePostImage(post_id){
        try {
            if(post_id == undefined) {
                throw new Errors.BadRequest(`Internal Server Error. post_id is undefined`);
            }
            const image_b64 = await ImageClass.retrievePostImage(post_id);
            const image = img_add_keyword(image_b64);
            return image;
        }catch (e){
            throw new Errors.BadRequest(`Error when trying download image: ${error}`);
        }
    }


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
    }

    static async uploadPostImage_manual(file, post_id) {
        try {
            console.log(file);

            if (file == undefined) {
                throw new Errors.BadRequest(`You must select a file.`);
            }
            const details = {
                post_id:post_id,
                type: file.mimetype,
                name: file.originalname,
                data: file.buffer,
            }

            const img_id = await ImageClass.addpost_img(details);

            if(!img_id){
                throw new Errors.BadRequest(`Error when saving to database`);
            }

        } catch (error) {
            console.log(error);
            throw new Errors.BadRequest(`Error when trying upload images: ${error}`);
            //return res.send(`Error when trying upload images: ${error}`);

        }
    }

}

module.exports = FileService;