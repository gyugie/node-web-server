const express 	= require('express');
const hbs		= require('hbs');
const fs		= require('fs');

var app			= express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use( (req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('Server log', log + '\n');
	next();
});

app.use( (req, res, next) => {
	res.render('maintenance.hbs', {
		note 	: 'Will Be Right Back',
		messages: 'This App curently update'
	});
});

hbs.registerHelper('getFullYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase()
});
hbs.registerHelper('silenIt', (text) => {
	return text.toLowerCase();
});

app.get('/home', (req, res) => {
	// res.send('hallo dear');
	res.render('home.hbs', {
		pageTitle: 'About index',
		messages	: 'Whats youre mind',
		// currentYear: new Date().getFullYear(),
		user		: 'Gyugie'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		// currentYear: new Date().getFullYear(),
		user		: 'Gyugie'
	});
});

// bad send back json with errorMEssage
app.get('/bad', (req, res) => {
	res.send({
		errorMEssage:'Unable to load page'
	});
});

app.listen(3000, () => {
	console.log('run in port', 3000);
});