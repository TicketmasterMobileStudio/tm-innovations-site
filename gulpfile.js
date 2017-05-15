'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () =>
  gulp.src('scss/main.scss')
    .pipe(sass({
        includePaths: [
          'bower_components/foundation-sites/scss'
        ]
      }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
      }))
    .pipe(gulp.dest('_site/assets/css'))
);

gulp.task('js', () =>
  gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/what-input/dist/what-input.min.js',
      'bower_components/foundation-sites/dist/js/foundation.min.js'
    ])
    .pipe(gulp.dest('_site/assets/js'))
);

gulp.task('watch', ['sass'], () => {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});

gulp.task('default', ['sass', 'js']);