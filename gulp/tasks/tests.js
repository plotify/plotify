import executeBinary from '../execute-binary'
import gulp from 'gulp'

const jestOptions = [
  '--colors'
]

const coverageConfiguration = {
  'coverageThreshold': {
    './src/**/reducer.js': {
      'branches': 100,
      'functions': 100,
      'lines': 100,
      'statements': 100
    },
    './src/**/selectors.js': {
      'branches': 100,
      'functions': 100,
      'lines': 100,
      'statements': 100
    }
  }
}

const coverageOptions = [
  ...jestOptions,
  '--coverage',
  '--collectCoverageFrom=src/**/*.js',
  '--config=' + JSON.stringify(coverageConfiguration)
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
