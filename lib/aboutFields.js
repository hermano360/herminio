var interests = [
	"Building software that promotes education",
	"Staying active with Crossfit, running, and hiking",
	"Enjoying art and history museums"
];

var projects = [
	'Bypass-Safer walking app',
	'Alexa-Translating and Smart Home',
	'Raspberry Pi-Various'
];

var skills = [
	'Javascript - Node, Express',
	'CSS - Bootstrap',
	'Machine Learning - Tensorflow'
];

exports.getItem = function(category){
	var lookupArray;
	switch (category) {
		case 'interests':
			lookupArray = interests;
			break;
		case 'projects':
			lookupArray = projects;
			break;
		case 'skills':
			lookupArray = skills;
			break;				
	}
	var index = Math.floor(Math.random()* lookupArray.length);
	return lookupArray[index];
}