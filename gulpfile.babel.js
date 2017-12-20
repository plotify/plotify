import 'babel-polyfill'

import gulp from './gulp'
import sequence from 'run-sequence'

gulp.task('default', () => {
  sequence('preparation', 'compile', 'assets', 'electron')
})

gulp.task('test', () => {
  sequence('preparation', 'tests')
})

gulp.task('coverage', () => {
  sequence('preparation', 'test-coverage')
})

gulp.task('dev:frontend', () => {
  sequence('preparation', 'tests', 'compile', 'assets', 'development-frontend')
})

gulp.task('dev:backend', () => {
  sequence('preparation', 'development-backend')
})

gulp.task('dist', () => {
  sequence('preparation', 'tests', 'compile', 'assets', 'distribution')
})
