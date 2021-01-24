const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL, {ssl:false});

module.exports = sql;