var gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	shell = require('gulp-shell');

gulp.task('log', function(){
	gutil.log('Workflows are awesome');
});

// very simple to set up coffee script automation

gulp.task('links', shell.task([
	'linkchecker http://localhost:3000'
	],{ignoreErrors: true}));

gulp.task('default',['log','links']);