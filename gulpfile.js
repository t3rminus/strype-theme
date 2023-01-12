var child = require('child_process');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpSass = require('gulp-sass')(require('sass'));

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var globby = require('globby');
var through = require('through2');
var log = require('gulplog');

// Paths
var sassPaths = [];

// Vendor JS
var vendorJS = [];

// Compile Sass into CSS
function sass() {
  return gulp.src('./src/scss/!(_*).scss')
    .pipe($.sourcemaps.init())
    .pipe(gulpSass({ includePaths: sassPaths, outputStyle: 'compressed' })
      .on('error', gulpSass.logError))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./src/css'));
}

// Combine JavaScript into one files by directory
function javascript() {
  return gulp.src('./src/js/*/')
    .pipe($.flatmap((ign, dir) => {
      var stream = through();
      stream
        .pipe(source(dir.basename))
        .pipe(buffer())
        .pipe($.sourcemaps.init({ loadMaps: true }))

        .pipe($.concat(dir.extname ? dir.basename : dir.basename + '.js'))
        .pipe($.uglify())

        .on('error', log.error)
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./src/js'));

      globby([dir.path + '/*.{js,jsx}']).then((files) => {
        browserify(files, { debug: true, ignoreMissing: true })
          .transform('babelify', { presets: ["@babel/preset-env", "@wordpress/default"] })
          .bundle()
          .pipe(stream);
      })
        .catch((err) => stream.emit('error', err));

      return stream;
    }));
}

// Get vendor files, and combine them too
function vendor() {
  /*return gulp.src(vendorJS, { allowEmpty: true })
      .pipe($.sourcemaps.init())

      .pipe($.concat('vendor.js'))
      .pipe($.uglify())
      .pipe($.rename({ suffix: '.min' }))

      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('js')); */
  return Promise.resolve();
}

gulp.task('upload', () => {
  const upload = child.spawn('hs', [ 'upload', '--src', 'src', '--dest', 'strype-test' ], { stdio: 'inherit' });
  return new Promise(function (resolve, reject) {
    upload.addListener("error", reject);
    upload.addListener("exit", resolve);
  });
});

// Watch for changes to Sass and JavaScript
function watch() {
  gulp.watch('src/scss/**/*.scss', sass);
  gulp.watch('src/js/*/**/*.js', javascript);
}

// Build the site
gulp.task('build', gulp.series(gulp.parallel(javascript, vendor), sass));
gulp.task('sass', sass);

// Build the site, and watch for file changes
gulp.task('default', gulp.series('build', watch));