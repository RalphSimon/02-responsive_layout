"use strict";

var gulp = require("gulp"),
    del = require("del"),
    prefix = require("gulp-autoprefixer");

gulp.task("clean", function () {
  del(['prefixed']);
});

gulp.task('prefix', ['clean'], function () {
  return gulp.src('./css/*.css')
    .pipe(prefix({
      browsers: ["last 2 versions"]
    }))
    .pipe(gulp.dest('./prefixed'))
});
