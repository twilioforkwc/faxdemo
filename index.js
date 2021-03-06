require('./server/model/user_model.js');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');

var config = require('./server/config.js');

var app = express();
var server = require('http').Server(app);
// var io = require('socket.io')(server);


if(!config.ACCOUNT_SID && !config.AUTH_TOKEN){
    console.log("Please set your AccountSid or AuthToken environment variable before proceeding.");
    process.exit(1);
}


/**
 * Setup MongoDB connection.
 */
mongoose.connect('mongodb://localhost:27017/faxdemo');
var db = mongoose.connection;

app.use(cookieParser());
app.use(expressSession({'secret': config.SECRET}));

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Open the DB connection.
 */
db.once('open', function (err) {
    if(err){
        console.log("Error Opening the DB Connection: ", err);
        return;
    }
    app.use(expressSession({
        secret: config.SECRET,
        cookie: {maxAge: 60 * 60 * 1000},
        store: new mongoStore({
            db: mongoose.connection.db,
            collection: 'sessions'
        })
    }));
    var port = config.PORT || 5151;
    server.listen(port);
    console.log("Magic happening on port " + port);
});

db.on('error', console.error.bind(console, 'Connection Error:'));

var router = express.Router();

var users = require('./server/controllers/users.js');
var fax = require('./server/controllers/fax.js');

router.route('/fax/receive').post(fax.receive);
router.route('/fax/receiveAction').post(fax.receiveAction);

/**
 * Test for 200 response.  Useful when setting up Authy callback.
 */
router.route('/test').post(function(req, res){
    return res.status(200).send({"connected": true});
});

/**
 * Prefix all router calls with 'api'
 */
app.use('/api', router);
app.use('/', express.static(__dirname + '/public'));
