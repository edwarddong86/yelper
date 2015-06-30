/**
 * Created by edwarddong on 6/26/15.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

gulp.task('js', function() {

  return gulp.src(['server.js', 'public/app/*.js', 'public/app/**/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/dist'));
});

gulp.task('angular', function() {
  return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(ngAnnotate())
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/dist'));
});

gulp.task('watch', function() {
    gulp.watch(['server.js', 'public/app/*.js', 'public/app/**/*.js'], ['js', 'angular']);
});

gulp.task('nodemon', function() {
    nodemon({
        script: 'server.js',
        ext: 'js html'
    })
        .on('start', ['watch'])
        .on('change', ['watch'])
        .on('restart', function() {
            console.log('Restarted');
        });
});

gulp.task('test', function() {
    return gulp.src(['tests/*.js'])
        .pipe(mocha({reporter: 'landing'}));
});

gulp.task('default', ['nodemon']);