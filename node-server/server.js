var express = require('express'),
    exphbs = require('express3-handlebars'),
    async = require('async'),
    mysql = require('mysql'),
    app, hbs, client;

// Create a MySQL connection
client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'database'
});

// Use Handlebars
hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main'
});

// Create the app
app = express();
app.configure(function () {
    // App uses GZIP
    app.use(express.compress());

    // Set Handlebars as the engine
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');

    // Use Express to handle the requests
    app.use(express.bodyParser());

    // Set the router
    app.use(app.router);

    // Client-side app resides in ./public
    app.use(express.static('./public'));

    // Views reside in ./views
    app.set('views', './views');

    // Beter error handling by Express
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

// Routes definieren
require('./routes/api.js')(app);
require('./routes/pages.js')(app);

// Server runs on port 3000
app.listen(3000);
