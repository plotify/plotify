import executeBinary from '../execute-binary'
import gulp from 'gulp'
import paths from '../paths'

gulp.task('electron', (callback) => {
  return executeBinary('electron', [paths.build.app + '/electron/main.js'])
})
