const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const bodyParser = require('body-parser');
const pgConnect = require('connect-pg-simple');
//Kasun Branch
/* Make all variables from our .env file available in our process */
require('dotenv').config();

/* Init express */
const app = express();

/* Init helmet and CORS */
app.use(helmet({contentSecurityPolicy: false,}));

/* Set view engine */
app.set('view engine', 'ejs');

/* Setup the middlewares & configs */
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.use(session({
    store: new (pgConnect(session))({ conString: process.env.DATABASE_URL }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
}));

/* Define the static files and routes */
app.use('/assets', express.static('public/assets'));

app.use(require('./routes'));

//on deployment add logger

// const errorLogger = defaultLogger('error-handler');


// app.use((err, req, res, next) => {
//     const { query, params, body } = req;
//     errorLogger.error({ err, req: { query, params, body } });
//     res.sendStatus(500);
// });

/* Listen on the port for requests */
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server listening on port %d in %s mode', process.env.PORT, app.settings.env);
});

module.exports = app;