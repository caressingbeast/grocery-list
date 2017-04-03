// server.js

// SET UP
// =============================================
var bodyParser     = require('body-parser');
var express        = require('express');
var app            = express();
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var port           = process.env.PORT || 3000;

// CONFIGURATION
// =============================================
mongoose.connect(process.env.DATABASE_URL);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

// routes
require('./app/routes')(app);

// START SERVER (node server.js)
// =============================================
app.listen(port);
console.log('App listening on port ' + port);
