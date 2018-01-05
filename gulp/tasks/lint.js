import executeBinary from '../execute-binary'
import gulp from 'gulp'

gulp.task('lint', () => {
  return executeBinary('standard')
})
