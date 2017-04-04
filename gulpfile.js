var gulp = require('gulp'),
	gutil = require('gulp-util'),
	mocha = require('gulp-mocha'),
	concat = require('gulp-concat'),
	shell = require('gulp-shell'),
	jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload'),
	nodemon = require('gulp-nodemon');

var jsSources = [
	'qa/tests-*.js',
	'public/qa/tests-*.js',
	'herminio.js',
	'gulpfile.js'
	];

var viewSources = ['views/*.handlebars', 'views/layouts/*.handlebars'];

gulp.task('log', function(){
	gutil.log('Workflows are awesome');
});


// very simple to set up coffee script automation

gulp.task('links', shell.task([
	'linkchecker http://localhost:3000'
	],{ignoreErrors: true}));

gulp.task('mocha', function () {
    return gulp.src(['qa/tests-*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec', ui: 'tdd' }))
        .on('error', gutil.log);
});

gulp.task('jshint', function(){
	return gulp.src(jsSources)
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});

gulp.task('watch', function(){
	gulp.watch(jsSources, ['mocha']);
});

gulp.task('nodemon', function(){
	nodemon({
		script: 'herminio.js',
		ext: 'js'
	}).on('restart', function(){
		gulp.src(viewSources)
			.pipe(livereload());
	});
});

gulp.task('default',['log','links','mocha','jshint','nodemon']);