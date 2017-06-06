/**
 * Initiation de Express
 */

let express = require('express')



/**
 * Module Passport
 */
let passport = require('passport');
var Strategy = require('passport-local').Strategy;



// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy((username, password, cb) => {

    r.connect({ db: "test" }).then((connection) => {

        r.table('users').filter({ email: username }).run(connection, (err, cursor) => {
            if (err) { return cb(err); }
            // if (!cursor) { return cb(null, false); }
            cursor.toArray((err, result) => {
                if (err) throw err;
                if (result[0].password != password) { return cb(null, false); }
                return cb(null, result[0]);
            });

        });
    });
}));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    r.table('users').get(parseInt(id)).run(connection, (err, result) => {
        if (err) { return cb(err); }
        cb(null, result);
    });
});


let app = express()


/**
 * Modules de Securité d'une API (logs, XSS securité etc...)
 */
let cors = require('cors');
let bodyParser = require('body-parser');
let logger = require('morgan');
let helmet = require('helmet');
app.use(logger('dev'));
app.use(require('cookie-parser')());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'HIU3H24I3I456BH4J3HJ536JVJH34BJ53YGUY34GYU5G', resave: false, saveUninitialized: false }));

app.use(bodyParser.json());
app.use(cors());
logger('tiny')
// app.use(helmet());


/**
 * Module RethinkDb
 */
let r = require('rethinkdb');



// Initialize Passport and restore authentication state, if any, from the
// session.
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
        // require('connect-ensure-login').ensureLoggedIn(), 
        var sess = req.session
        if (!sess.views) {
            sess.views = 1
        } else {
            sess.views++;
        }

        console.log(sess.views);

        console.log(req.user)
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


    app.get('/login',
        function (req, res) {
            res.status(403);
            res.json('Non connecté');
        });

    app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });

    app.get('/logout',
        function (req, res) {
            req.logout();
            res.redirect('/');
        });


    app.post('/auth', (req, res) => {

        let user = req.body;

        res.json(req.user);

        // https://github.com/jaredhanson/passport-http


    });


    app.get('/detail/:id', (req, res) => {

        let id = parseInt(req.params.id);

        r.table('users').get(id).run(connection, (err, result) => {
            if (err) throw err;
            res.json(result)
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