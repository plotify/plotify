import gulp from 'gulp'
import paths from '../paths'

gulp.task('development-frontend', ['electron', 'watch-frontend'])

gulp.task('watch-frontend', () => {
  gulp.watch(paths.frontend + '/**/*.*', ['compile', 'assets'])
})
