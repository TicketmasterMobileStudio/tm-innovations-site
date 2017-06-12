'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sassLint = require('gulp-sass-lint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');
var browserSync = require('browser-sync').create();
var child = require('child_process');
var gutil = require('gulp-util');
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');


gulp.task('sass', (cb) => {
  pump([
      gulp.src('scss/**/*.scss'),
      sassLint(),
      sassLint.format(),
      sassLint.failOnError(),
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

gulp.task('jekyll', () => {
  const jekyll = child.spawn('bundle', ['exec', 'jekyll', 'build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', ['sass', 'vendor-js', 'js', 'jekyll'], () => {
  browserSync.init({
    files: ['_site/**'],
    port: 4000,
    server: {
      baseDir: '_site'
    }
  });

  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/*.js'], ['js']);
});

gulp.task('default', ['sass', 'vendor-js', 'js']);

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'assets/images/favicon-master.png',
		dest: '.',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'noChange',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#9f00a7',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#009cde',
				manifest: {
					name: 'Ticketmaster Innovations',
					display: 'browser',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'blackAndWhite',
				threshold: 80,
				themeColor: '#009cde'
			}
		},
		settings: {
			compression: 5,
			scalingAlgorithm: 'Lanczos',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
	return gulp.src(['_layouts/default.html'])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('_layouts'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});
