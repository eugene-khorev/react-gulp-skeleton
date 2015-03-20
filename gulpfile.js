var gulp = require('gulp');
var sync = require('browser-sync');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var csso = require('gulp-csso');
var swig = require('gulp-swig');
var htmlmin = require('gulp-htmlmin');
var watch = require('gulp-watch');

gulp.task('clean-styles', function () {
  return gulp.src(['./dist/css/*.css', './build/css/*.css'], {
      read: false
    })
    .pipe(clean());
});

gulp.task('clean-scripts', function () {
  return gulp.src(['./dist/js/*.js', './build/js/*.js'], {
      read: false
    })
    .pipe(clean());
});

gulp.task('clean-templates', function () {
  return gulp.src(['./build/*.html', './dist/*.html'], {
      read: false
    })
    .pipe(clean());
});

gulp.task('styles', ['clean-styles'], function (cb) {
  var task = gulp.src(['./src/css/*.css'])
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./build/css'));

  if (!debug) {
    task.pipe(csso())
      .pipe(gulp.dest('./dist/css'))
  }

  return task.pipe(sync.reload({
    stream: true
  }));
});

gulp.task('tags', ['clean-scripts'], function (cb) {
  return gulp.src(['./src/jsx/**/*.jsx'])
    .pipe(react())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('scripts', ['tags'], function (cb) {
  var task = gulp.src(['./node_modules/reflux/dist/reflux.js', './node_modules/react/dist/react.js', './src/js/actions/*.js', './src/js/stores/*.js', './build/js/**/*.js', './src/js/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./build/js'));

  if (!debug) {
    task.pipe(uglify())
      .pipe(gulp.dest('./dist/js'))
  }

  return task.pipe(sync.reload({
    stream: true
  }));
});

gulp.task('templates', ['clean-templates', 'scripts'], function (cb) {
  var opts = {
    load_json: true,
    json_path: './src/json/',
    defaults: {
      cache: false,
      locals: {
        name: 'World'
      }
    }
  };

  var task = gulp.src(['./src/swig/*.swig'])
    .pipe(swig(opts))
    .pipe(gulp.dest('./build'));

  if (!debug) {
    task.pipe(htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeEmptyAttributes: true,
        collapseBooleanAttributes: true,
      }))
      .pipe(gulp.dest('./dist'))
  }

  return task.pipe(sync.reload({
    stream: true
  }));
});

gulp.task('serve', ['styles', 'scripts', 'templates'], function (cb) {
  sync({
    server: debug ? './build' : './dist'
  });

  watch(['./src/css/*.css'], function (event) {
    gulp.start('styles');
  });

  watch(['./src/js/*.js', './src/jsx/*.jsx', './src/json/*.json', './src/swig/layouts/*.swig', './src/swig/partials/*.swig', './src/swig/*.swig'], function (event) {
    gulp.start('templates');
  });
});

gulp.task('debug', function (event) {
  debug = true;
  gulp.start('serve');
});

gulp.task('default', function (event) {
  debug = false;
  gulp.start('serve');
});

// default value (DO NOT CHANGE)
var debug = false;
