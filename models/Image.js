const db = require("./../config/db");

const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

const Image = sequelize.define("image", {
    uid: {
       type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    data: {
        type: DataTypes.BLOB("long"),
    },
});


module.exports = Image;