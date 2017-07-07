var gulp = require('gulp');
var uglifycss = require('gulp-uglifycss'); // to minify files
var concat = require('gulp-concat');
var minify = require('gulp-minify'); // minify js
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var less = require('gulp-less');

gulp.task('connect', function() { // ok
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('app-styles', function() { // ok
  return gulp.src("src/styles/**/*.less")
    .pipe(less())
    .pipe(uglifycss())
    .pipe(gulp.dest("build/styles"))
    .pipe(connect.reload());
});

gulp.task('app-scripts', function() { // ok
  return gulp.src("src/js/*.js")
    .pipe(concat("all.js"))
    .pipe(minify())
    .pipe(gulp.dest("build/js"))
    .pipe(connect.reload());
});

gulp.task('watch', function () { // ok
  var appStyles = ['app-styles'];
  var appScripts = ['app-scripts'];
  // var index = ['index'];

  gulp.watch('src/styles/**/*.less', appStyles);
  gulp.watch('src/js/*.js', appScripts);
  // gulp.watch('src/index.html', index);
});

gulp.task('default', ['connect', 'watch']);