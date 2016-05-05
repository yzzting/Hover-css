'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var autoprefixer = require('autoprefixer');
var gls = require('gulp-live-server');
var server = gls.static('dist', 8000);
var ghPages = require('gulp-gh-pages');
var sassLint = require('gulp-sass-lint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass-lint', function () {
  gulp.src('scss/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('jade', function() {
    return gulp.src('./template/jade/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['sass','jade'],function() {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./template/jade/index.jade',['jade']);
});

gulp.task('deploy', function () {
    return gulp.src('site/**/*')
        .pipe(ghPages());
});

// 监视 Sass 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default',['jade','sass','serve','sass-lint']);
