'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var gls = require('gulp-live-server');
var sassLint = require('gulp-sass-lint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass-lint', function() {
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

gulp.task('watch', ['sass', 'jade'], function() {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./scss/**/**/*.scss', ['sass']);
    gulp.watch('./template/jade/index.jade', ['jade']);
    gulp.watch('./template/jade/**/*.jade', ['jade']);
});

gulp.task('build', ['jade', 'sass']);

gulp.task('deploy', ['build'], function() {
    return gulp.src('dist/**/*')
        .pipe(ghPages());
});

gulp.task('serve', ['sass', 'jade'], function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
    gulp.watch('./scss/main.scss', ['sass']);
    gulp.watch('./scss/effects/*.scss', ['sass']);
    gulp.watch('./scss/effects/**/*.scss', ['sass']);
    gulp.watch('./scss/page/*.scss', ['sass']);
    gulp.watch('./template/jade/index.jade', ['jade']);
    gulp.watch('./template/jade/**/*.jade', ['jade']);
});

gulp.task('default', ['jade', 'sass', 'serve', 'sass-lint']);
