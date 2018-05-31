var express = require('express');
var app = express();
var port = process.env.PORT || 5000

// ejs is a way to make html from static file to a template.
app.engine('html', require('ejs').renderFile); 

// Set the enginge to html
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  	res.render('index.html');
});

app.get('/squares', function (req, res) {
  	res.render('squares.html');
});

app.get('/me', function (req, res) {
  	res.render('aboutme.html');
});

app.get('/stuff', function (req, res) {
  	res.render('stuff.html');
});

app.get('/success', function (req, res) {
  	res.render('virus.html');
});

app.get('/projects', function (req, res) {
  	res.render('projects.html');
});

app.get('/dew', function (req, res) {
  	res.render('morningdew.html');
});


app.set('port', port);
app.listen(port, function () {
  console.log('Listening on port ', port);
});