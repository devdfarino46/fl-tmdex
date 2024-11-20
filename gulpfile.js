const gulp = require('gulp'); // task runner
const browserSync = require('browser-sync').create(); // server
const sass = require('gulp-sass')(require('sass')); // compile sass to css
const autoprefixer = require('gulp-autoprefixer'); // add vendor prefixes to CSS rules
const cleanCSS = require('gulp-clean-css'); // minify css
const rename = require('gulp-rename'); // rename files
const ttfToWoff2 = require('gulp-ttf2woff2'); // convert ttf to woff2
const imageMin = require('gulp-imagemin'); // minify images
const webp = require('gulp-webp'); // convert images to webp
const sourceMaps = require('gulp-sourcemaps'); // generate source maps
const notify = require('gulp-notify'); // notifications
const plumber = require('gulp-plumber'); // error handling
const webpack = require('webpack-stream'); // webpack
const babel = require('gulp-babel'); // babel
const sassGlob = require('gulp-sass-glob'); // globbing for sass]
const fileInclude = require('gulp-file-include'); // file include


// Browsersync init
function _bs() {
    browserSync.init({
        // proxy: 'localhost/',
        // port: 80,
        server: './',
        open: false
    });
}

// Whatching
function _whatching() {
    gulp.watch(['html/**/*.html'], _html);
    gulp.watch('scss/**/*.scss', _sass);
    gulp.watch(['js-src/**/*.js'], _js);
}

function _html() {
    return gulp.src(['html/*.html'])
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./'))
      .pipe(browserSync.stream());
}

// SCSS to CSS
function _sass() {
    return gulp.src(["scss/**/*.scss"])
      .pipe(plumber({
        errorHandler: notify.onError({
          title: "SCSS Error",
          message: "Error: <%= error.message %>"
        })
      }))
      .pipe(sourceMaps.init())
      .pipe(sassGlob())
      .pipe(sass({
        
      }))
      .pipe(autoprefixer())
      .pipe(cleanCSS({
          compatibility: 'ie9'
      }))
      .pipe(rename({suffix: '.min'}))
      .pipe(sourceMaps.write('.'))
      .pipe(gulp.dest("css"))
      .pipe(browserSync.stream());
}

function _js() {
  return gulp.src('js-src/**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "JS Error",
        message: "Error: <%= error.message %>"
      })
    }))
    .pipe(sourceMaps.init())
    .pipe(babel())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.stream());
}

function _ttfToWoff2() {
    return gulp.src('fonts/**/*.ttf')
        .pipe(ttfToWoff2())
        .pipe(gulp.dest('fonts'));
}

function _imageMin() {
    return gulp.src('img/**/*.+(png|jpeg|jpg|gif|svg)')
        .pipe(imageMin({verbose: true}))
        .pipe(gulp.dest('img'));
}

function _webp() {
    return gulp.src('img/**/*.+(png|jpeg|jpg)')
        .pipe(webp())
        .pipe(gulp.dest('img'));
}

exports.default = gulp.series(
    _sass,
    _js,
    gulp.parallel(
      _bs,
      _whatching
    )
);

exports.ttfToWoff2 = _ttfToWoff2;
exports.imageMin = _imageMin;
exports.webp = _webp;
exports.css = _sass;
exports.js = _js;
exports.html = _html;