var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

// compile project
gulp.task('compile', function() {
  return browserify({
      basedir: '.',
      debug: true,
      entries: ['src/game.ts'],
      cache: {},
      packageCache: {}
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('game.js'))
  .pipe(gulp.dest("dist"));
});

// copy babylon.js to dist
gulp.task('copy', function () {
  return gulp.src(['node_modules/babylonjs/dist/preview release/babylon.js', 'node_modules/handjs/hand.min.js'])
    .pipe(gulp.dest('dist'));
})

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });

  // Watch for file changes
  gulp.watch(['src/*.ts'], {cwd: '.'}, ['compile', reload]);
});

// Build project
gulp.task('build', ['copy', 'compile']);

// Start Server, recompile and reload browser on file change
gulp.task('default', ['build', 'serve']);
