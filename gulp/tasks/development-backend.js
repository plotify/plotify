import gulp from 'gulp'
import paths from '../paths'

gulp.task('development-backend', ['tests-without-exit', 'watch-backend'])

gulp.task('watch-backend', () => {
  gulp.watch(paths.backend + '/**/*.*', ['tests-without-exit'])
})
