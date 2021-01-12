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


module.exports = Image;