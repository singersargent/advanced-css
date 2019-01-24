var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();


gulp.task('watch', function() {
   browserSync.init({
      server: {
         baseDir: "source"
      }
   });

   watch('./source/index.html', function() {
      browserSync.reload();
   });

   watch('./source/css/style.css', function() {
      injectCSS();
   });

});

function injectCSS() {
   return gulp.src('./source/css/style.css')
      .pipe(browserSync.stream());
}

