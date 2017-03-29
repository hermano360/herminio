var express = require('express');

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

var interests = [
	"Building software that promotes education",
	"Staying active with Crossfit, running, and hiking",
	"Enjoying art and history museums"
]

var projects = [
	'Bypass-Safer walking app',
	'Alexa-Translating and Smart Home',
	'Raspberry Pi-Various'
]

var skills = [
	'Javascript - Node, Express',
	'CSS - Bootstrap',
	'Machine Learning - Tensorflow'
]

app.get('/', function(req,res){
	res.render('home');
});
app.get('/about', function(req,res){
	var randomInterest = interests[Math.floor(Math.random()*interests.length)];
	var randomSkill = skills[Math.floor(Math.random()*skills.length)];
	var randomProject = projects[Math.floor(Math.random()*projects.length)];
	res.render('about',{ interest:randomInterest, project: randomProject, skill:randomSkill});
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