'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');

gulp.task('sass', (cb) => {
  pump([
      gulp.src('scss/main.scss'),
      sourcemaps.init(),
        sass({includePaths: ['bower_components/foundation-sites/scss']}).on('error', sass.logError),
        autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']}),
        cleanCSS(),
        rename({suffix: '.min'}),
      sourcemaps.write('.'),
      gulp.dest('assets/css')
    ],
    cb
  );
});

gulp.task('vendor-js', (cb) => {
  pump([
      gulp.src([
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/what-input/dist/what-input.min.js',
          'bower_components/foundation-sites/dist/js/foundation.min.js',
          'bower_components/svg-injector/dist/svg-injector.min.js'
        ]),
      gulp.dest('assets/js/vendor')
    ],
    cb
  );
});

gulp.task('js', (cb) => {
  pump([
      gulp.src('js/*.js'),
      sourcemaps.init(),
        uglify(),
        rename({suffix: '.min'}),
      sourcemaps.write('.'),
      gulp.dest('assets/js')
    ],
    cb
  );
});

gulp.task('watch', ['default'], () => {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/*.js'], ['js']);
});

gulp.task('default', ['sass', 'vendor-js', 'js']);
