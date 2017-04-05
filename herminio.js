var express = require('express'),
	aboutFields = require('./lib/aboutFields.js'),
	portfolio = require('./lib/portfolio.js'),
	fs = require('fs');

var app = express();



// set up handlebars view engine
var handlebars = require('express-handlebars')
	.create({
		defaultLayout:'main',
    	helpers: {
        	section: function(name, options){
           		if(!this._sections) this._sections = {};
            	this._sections[name] = options.fn(this);
            	return null;
        	}
    	}
    });
    
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

var tours = [
				{id:0,name:'Hood River', price:99.99},
				{id:1,name:'Wabash River', price:199.99},
				{id:2,name:'Los Angeles River', price:299.99}
			];

// static middleware allows you to designate 1 or more
// directories as containing static resources that are simply
// delivered to client without any special handling.
// this is where you put images, CSS files, client JS files
app.use(express.static(__dirname + '/public'));

app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});
app.use(function(req,res,next){
	res.locals.portfolio = portfolio;
	next();
});


app.get('/', function(req,res){
	res.render('home', {
		pageTestScript: '/qa/tests-home.js'
	});
});



app.get('/about', function(req,res){
	res.render('about',{ 
		interest:aboutFields.getItem('interests'), 
		project: aboutFields.getItem('projects'), 
		skill:aboutFields.getItem('skills'),
		pageTestScript: '/qa/tests-about.js'
	});
});

app.get('/contact', function(req,res){
	res.render('contact', {
		pageTestScript: '/qa/tests-contact.js'
	});
});

app.get('/portfolio', function(req,res){
	res.render('portfolio',{
		portfolio:portfolio //.getPortfolio()
	});
});

app.get('/tour', function(req,res,next){
	res.json(tours);
});

app.get('/tour/:id', function(req,res,next){
	var returnArray = tours.filter(function(element){ return element.id === parseInt(req.params.id);});
	if(returnArray.length){
		res.json(tours.filter(function(element){ return element.id === parseInt(req.params.id);})[0]);
	} else {
		next();
	}
});


app.use(express.static('public'));

// custom 500 page
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500).render('500');
});

// custom 404 page
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});