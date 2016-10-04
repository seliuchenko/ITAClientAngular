var gulp = require('gulp');
var connect = require('gulp-connect');

//sources watched for livereload
var htmlSources =['app/*.html'];
var cssSources = ['app/*.css'];
var jsSources = ['app/*.js'];
var jsonSources = ['app/*.json'];
var allSources = htmlSources.concat(cssSources).concat(jsSources).concat(jsonSources);

//local-server
gulp.task('server', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port:8081
  });
});

//livereload
gulp.task('livereload', function() {
  gulp.src(allSources)
      .pipe(connect.reload());
});

//watch the file changes to trigger livereload
gulp.task('watch', function() {
  gulp.watch(allSources, ['livereload']);
});

//gulp default
gulp.task('default', ['server', 'livereload', 'watch']);