var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var config = require('./gulp.config')();
 
gulp.task('copy', function(){
  gulp.src(config.HTML)
    .pipe(gulp.dest(config.DEST));
});
 
gulp.task('replaceHTMLsrc', function(){
  gulp.src(config.HTML)
    .pipe(htmlreplace({
      'js': 'src/' + config.OUT
    }))
    .pipe(gulp.dest(config.DEST));
});
 
gulp.task('watch', ['replaceHTMLsrc'], function() {
  // gulp.watch(config.HTML, ['copy']);
  gulp.watch(config.HTML, ['replaceHTMLsrc']);
 
  var watcher  = watchify(browserify({
    entries: [config.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));
 
  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(config.OUT))
      .pipe(gulp.dest(config.DEST_SRC));
      console.log('Updated');
  })
    .bundle()
    .pipe(source(config.OUT))
    .pipe(gulp.dest(config.DEST_SRC));
});
 
gulp.task('build', function(){
  browserify({
    entries: [config.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(config.MINIFIED_OUT))
    .pipe(streamify(uglify(config.MINIFIED_OUT)))
    .pipe(gulp.dest(config.DEST_BUILD));
});
 
gulp.task('replaceHTML', function(){
  gulp.src(config.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + config.MINIFIED_OUT
    }))
    .pipe(gulp.dest(config.DEST));
});
 
gulp.task('production', ['replaceHTML', 'build']);
 
gulp.task('default', ['watch']);