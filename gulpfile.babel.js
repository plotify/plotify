import 'babel-polyfill'

import gulp from './gulp'
import sequence from 'run-sequence'

gulp.task('default', () => {
  sequence('preparation', 'lint', 'compile', 'assets', 'electron')
})

gulp.task('test', () => {
  sequence('preparation', 'lint', 'tests')
})

gulp.task('coverage', () => {
  sequence('preparation', 'lint', 'test-coverage')
})

gulp.task('dev:frontend', () => {
  sequence('preparation', 'lint', 'tests', 'compile', 'assets', 'development-frontend')
})

gulp.task('dev:backend', () => {
  sequence('preparation', 'lint', 'development-backend')
})

gulp.task('dist', () => {
  sequence('preparation', 'lint', 'tests', 'compile', 'assets', 'distribution')
})
