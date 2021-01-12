const postgres = require('postgres');
const Sequelize = require("sequelize");

const sequalize = new Sequelize(
    "agri_app_db",
    "agri_app",
    "password",
    {
        host:"localhost",
        dialect:"postgres",
        operatorsAliases:false,

        pool:{
            max: 5,
            min: 0,
            acquire: 30000,
            idle:10000
        }
    });

console.log(process.env.DATABASE_URL);
const sql = postgres(process.env.DATABASE_URL);
sql.Sequelize = Sequelize;
sql.sequelize = sequalize;

module.exports = sql;