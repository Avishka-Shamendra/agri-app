const FileService = require('../services/fileService');
const { defaultLogger } = require('../config/logger');
const logger = defaultLogger('image-controller');


class ImageController{
    static async addPostImage(req, res){
        try{
            await FileService.uploadPostImage(req.file,req.params.post_id);
            res.redirect(`/farmer/post/${req.params.post_id}?success=Added Image Successfully`)
        }catch (e) {
            logger.error(e);
            res.redirect(`/farmer/post/${req.params.post_id}?error=${e}`);
        }
    }
    
}

module.exports = ImageController;