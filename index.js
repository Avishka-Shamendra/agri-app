const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const pgConnect = require('connect-pg-simple');
const helmet = require('helmet');
const Ouch = require('ouch');
const errorPageHandler = require('./helpers/errorPageRender');

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
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },// 7 days
}));

/* Define the static files and routes */
app.use('/assets', express.static('public/assets'));
app.use(require('./routes'));

app.get('*', (req, res) => {
    res.status(404).render('404');
});


app.use((err, req, res,next) => {
    (new Ouch()).pushHandler(new Ouch.handlers.CallbackHandler((next, exception,
        inspector, run, request, response) => {
        errorPageHandler.errorResponse(response, 'Internal Server Error', 500);
    }))
        .handleException(err, req, res,
            () => {
                console.log(`Error occurred: ${err}`);
            });
});

/* Listen on the port for requests */
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server listening on port %d in %s mode', process.env.PORT, app.settings.env);
});

module.exports = app;