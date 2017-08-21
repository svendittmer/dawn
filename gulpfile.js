var gulp = require('gulp');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// compile project
gulp.task('compile', function() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});

// copy babylon.js to dist
gulp.task('copy', function () {
  return gulp.src('node_modules/babylonjs/dist/preview release/babylon.js')
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
