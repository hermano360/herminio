var express = require('express'),
	aboutFields = require('./lib/aboutFields.js');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// static middleware allows you to designate 1 or more
// directories as containing static resources that are simply
// delivered to client without any special handling.
// this is where you put images, CSS files, client JS files
app.use(express.static(__dirname + '/public'));


app.get('/', function(req,res){
	res.render('home');
});
app.get('/about', function(req,res){
	res.render('about',{ 
		interest:aboutFields.getItem('interests'), 
		project: aboutFields.getItem('projects'), 
		skill:aboutFields.getItem('skills')
	});
});
app.get('/contact', function(req,res){
	res.render('contact');
});

// custom 404 page
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

// custom 500 page
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500).render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
})