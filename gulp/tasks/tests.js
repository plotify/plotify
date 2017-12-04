import executeBinary from '../execute-binary'
import gulp from 'gulp'

const jestOptions = [
  '--colors'
]

const coverageOptions = [
  '--coverage',
  '--collectCoverageFrom=src/**/*.js',
  ...jestOptions
]

gulp.task('tests', () => {
  return executeBinary('jest', jestOptions)
})

gulp.task('tests-without-exit', () => {
  executeBinary('jest', jestOptions)
})

gulp.task('test-coverage', () => {
  return executeBinary('jest', coverageOptions)
})
