var gulp = require('gulp');
var uglifycss = require('gulp-uglifycss'); // to minify files
var concat = require('gulp-concat');
var minify = require('gulp-minify'); // minify js
var watch = require('gulp-watch');
var connect = require('gulp-connect');

var less = require('gulp-less');

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('app-styles', function() {
  return gulp.src("src/styles/**/*.less")
    .pipe(less())
    .pipe(uglifycss())
    .pipe(gulp.dest("build/styles"));
    // .pipe(connect.reload());
});

gulp.task('app-scripts', function() {
  return gulp.src("src/js/*.js")
    .pipe(concat("all.js"))
    .pipe(minify())
    .pipe(gulp.dest("build/js"))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  var appStyles = ['app-styles'];
  var appScripts = ['app-scripts'];
  // var index = ['index'];

  gulp.watch('src/styles/**/*.scss', appStyles);
  gulp.watch('src/js/*.js', appScripts);
  // gulp.watch('src/index.html', index);
});

gulp.task('default', ['connect', 'watch']);