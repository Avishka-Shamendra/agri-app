const db = require("./../config/db");

const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

const Image = sequelize.define("image", {
    post_id: {
       type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    data: {
        type: DataTypes.BLOB,
    },
});

//SELECT encode(data, 'base64') FROM image where id = 145

class ImageClass{
    static  async addpost_img(details){
        const [img] =await db`
            INSERT
        `
    }

    static async retrievePostImage(post_id){
        const [img] = await db`
            SELECT encode(data, 'base64') from images
            WHERE post_id=${post_id}
        `;
        return img;
    }


}


module.exports = {
    Image:Image,
    ImageClass:ImageClass
};