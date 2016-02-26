"use strict";

var gulp = require("gulp"),
    del = require("del"),
    prefix = require("gulp-autoprefixer");

gulp.task("clean", function () {
  del(['prefixed', 'css']);
});

gulp.task('autoprefixer', function () {
  return gulp.src('./css/*.css')
    .pipe(prefix({
      browsers: ["> 5%"]
    }))
    .pipe(gulp.dest('./prefixed'))
});
