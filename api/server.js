/**
 * Initiation de Express
 */

let express = require('express')
let app = express()


/**
 * Modules de Securité d'une API (logs, XSS securité etc...)
 */
let cors = require('cors');
let bodyParser = require('body-parser');
let logger = require('morgan');
let helmet = require('helmet');
let passport = require('passport');
app.use(logger('dev'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'hK34B23B4HJ', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(cors());
logger('tiny')
app.use(helmet());


/**
 * Module RethinkDb
 */
let r = require('rethinkdb');



// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());




/**
 * Erreur 500 sortie en JSON
 */
app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({ error: error.message });
});




/**
 * 
    host: the host to connect to (default localhost).
    port: the port to connect on (default 28015).
    db: the default database (default test).
    user: the user account to connect as (default admin).
    password: the password for the user account to connect as (default '', empty).
    timeout: timeout period in seconds for the connection to be opened (default 20).
 */
let connection = r.connect({
    db: "test"
}).then((connection) => { // une fois qu'il a effectuer une connexion



    app.get('/', (req, res) => {
        r.table('users').filter({ enable: true }).pluck('id', 'username', 'name', 'email', 'phone', 'picture', 'registered', { 'address': { 'city': true } }).limit(3).run(connection, (err, cursor) => {
            if (err) throw err;

            cursor.toArray((err, result) => {
                if (err) throw err;
                res.json(result)
            });
        });

    });


    app.get('/inactive', (req, res) => {
        r.table('users').filter({ enable: false }).pluck('id', 'username', 'name', 'email', 'phone', 'picture', 'registered', { 'address': { 'city': true } }).limit(3).run(connection, (err, cursor) => {
            if (err) throw err;

            cursor.toArray((err, result) => {
                if (err) throw err;
                res.json(result)
            });
        });

    });

    app.get('/more/:limit', (req, res) => {

        let limit = parseInt(req.params.limit);

        r.table('users').filter({ enable: true }).pluck('id', 'username', 'name', 'email', 'phone', 'picture', 'registered', { 'address': { 'city': true } }).limit(limit).run(connection, (err, cursor) => {
            if (err) throw err;

            cursor.toArray((err, result) => {
                if (err) throw err;
                res.json(result)
            });
        });

    });


    app.get('/detail/:id', (req, res) => {

        let id = parseInt(req.params.id);

        r.table('users').get(id).run(connection, (err, result) => {
            if (err) throw err;
            res.json(result)
        });

    });


    app.delete('/remove/:id', (req, res) => {

        let id = parseInt(req.params.id);

        r.table('users').get(id).delete().run(connection, (err, result) => {
            if (err) throw err;
            r.table('users').filter({ enable: true }).pluck('id', 'username', 'name', 'email', 'phone', 'picture', 'registered', { 'address': { 'city': true } }).limit(3).run(connection, (err, cursor) => {
                if (err) throw err;

                cursor.toArray((err, result) => {
                    if (err) throw err;
                    res.json(result)
                });
            });
        });

    });

    app.post('/update', (req, res) => {

        let id = parseInt(req.body.id);

        r.table('users').get(id).update(req.body).run(connection, (err, result) => {
            if (err) throw err;
            res.json(result)
        });

    });




});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})