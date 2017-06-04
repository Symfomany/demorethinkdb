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
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
logger('tiny')
app.use(helmet());

/**
 * Module RethinkDb
 */
let r = require('rethinkdb');


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



    app.post('/auth', (req, res) => {

        let user = res.body.user;
        console.log(user);

        // https://github.com/jaredhanson/passport-http

        passport.use(new BasicStrategy(
            function (userid, password, done) {
                let isUser = r.table('users').filter({ email: user.email, password: user.password }).isEmpty();
                User.findOne({ username: userid }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    if (!user.verifyPassword(password)) { return done(null, false); }
                    return done(null, user);
                });
            }
        ));

    });


    app.get('/detail/:id', (req, res) => {

        let id = parseInt(req.params.id);

        r.table('users').get(id).run(connection, (err, result) => {
            if (err) throw err;
            res.json(result)
        });

    });





});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})