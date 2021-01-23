const Image = require("./../models/Image");
const Errors = require('../helpers/error');


class FileService {
    
    static async uploadPostImage(file, post_id) {

            if (file == undefined) {
                throw new Errors.BadRequest(`You must select a file.`);
            }
            const details = {
                post_id:post_id,
                type: file.mimetype,
                name: file.originalname,
                data: file.buffer,
            }

            const return_post_id = await Image.addPostImg(details);

            if(!return_post_id){
                throw new Errors.BadRequest(`Error when saving to database`);
            }
    }

}

module.exports = FileService;