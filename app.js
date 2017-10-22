// Load in the node modules, give them variable names
var express = require('express');
var app = express();
var port = process.env.PORT || 5000

// ejs is a way to make html from static file to a template.
// This can be used to change from html to jade (now pug)
app.engine('html', require('ejs').renderFile); 

// Set the enginge to html
app.set('view engine', 'html');


app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');


app.get('/', function (req, res) {
  	res.render('index.html');
});

app.get('/triangles', function (req, res) {
  	res.render('triangles.html');
});

app.get('/shift', function (req, res) {
  	res.render('shift.html');
});

app.get('/ror', function (req, res) {
  	res.render('ror.html');
});

app.get('/drstuff', function (req, res) {
  	res.render('drstuff.html');
}); 

//heroku assigns app port randomly. DONT WORRY ABOUT IT
app.set('port', port);

// console log here actually sends to your terminal
app.listen(port, function () {
  console.log('Listening on port ', port);
});


