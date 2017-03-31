var aboutFields = require('../lib/aboutFields.js');
var expect = require('chai').expect;

suite('Make sure you are getting values on the about page', function(){
	test('getItem() should return project if given that input', function(){
		expect(typeof aboutFields.getItem('projects') === 'string');
	});

	test('getItem() should return skill if given that input', function(){
		expect(typeof aboutFields.getItem('skills') === 'string');
	});

	test('getItem() should return interest if given that input', function(){
		expect(typeof aboutFields.getItem('interests') === 'string');
	});

})