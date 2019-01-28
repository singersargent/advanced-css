var gulp = require('gulp');
var watch = require('gulp-watch');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');


gulp.task('watch', function() {
   browserSync.init({
      server: {
         baseDir: "app"
      }
   });

   watch('./app/index.html', function() {
      browserSync.reload();
   });

   watch('./app/sass/**/*.scss', function() {
      compileSass();
      injectCSS();
   });

});

//inject CSS intro browser via browser sync
function injectCSS() {
   return gulp.src('./app/css/style.css')
      .pipe(browserSync.stream());
}

//compile SCSS into style.css
function compileSass() {
   return gulp.src('app/sass/**/*.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(cssnano())
   .pipe(rename('style.css'))
   .pipe(gulp.dest('app/css'));
}