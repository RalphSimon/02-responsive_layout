"use strict"

var    gulp = require('gulp'),
browserSync = require('browser-sync').create(),
        del = require('del'),
       sass = require('gulp-sass'),
     prefix = require('gulp-autoprefixer'),
       csso = require('gulp-csso'),
       maps = require('gulp-sourcemaps'),
     uglify = require('gulp-uglify'),
     useref = require('gulp-useref'),
     gulpif = require('gulp-if');
// Currently unused tasks. They'll be added when this project evolves.
  //    eslint = require('gulp-eslint'),
  //  imagemin = require('gulp-imagemin'),
  //      size = require('gulp-size');

var reload = browserSync.reload;
var paths = {
  src: 'src/',
  scss: 'src/scss/',
  css: 'src/css/',
  dist: 'dist/',
  images: 'public/assets/images',
};

/*********

  DEVELOPMENT

********/

// Compile sass and generate Source Map
gulp.task('compileSass', function() {
  return gulp.src(paths.scss + 'main.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(prefix({
      browsers: ['> 5%']
    }))
    .pipe(maps.write())
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});

// This task launches a static development server and watches scss/html files
gulp.task('serve', ['compileSass'], function() {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });

  // CSS is auto-injected into the browser with browserSync.stream() in the 'compileSass' task
  gulp.watch("src/scss/**/*.scss", ['compileSass']);

  // Changes in HTML files will automatically reload the page
  gulp.watch("src/*.html").on('change', reload);
});

/*********

  DEPLOYMENT

  The following tasks are used to automate a full build workflow, handling concatenation and minification tasks.

********/

// 'Clean up' the dist folder
gulp.task("clean", function () {
  del(['dist', 'public']);
});

gulp.task("html", ["compileSass"], function () {
  return gulp.src(paths.src + '*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', csso()))
    .pipe(useref())
    .pipe(gulp.dest(paths.dist));
});

gulp.task("build", ["clean", "html"], function () {
  return gulp.src("./src/images/**", { base: 'src' } )
    .pipe(gulp.dest(paths.dist));
});

/*********

  DFAULT GULP TASK

********/

// This task is supposed to change over time. During development, it will rely on the 'serve' task.
// During deployment, their will be a 'serve:dist' task.
// For reference checkout the gulp-file of Google's Web Starter Kit

gulp.task('default', ['serve']);
