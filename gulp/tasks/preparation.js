import checkDependencies from 'check-dependencies'
import clean from 'gulp-clean'
import gulp from 'gulp'
import paths from '../paths'

gulp.task('preparation', ['preparation:clean', 'preparation:check-dependencies'])

gulp.task('preparation:clean', () => {
  return gulp
    .src(paths.build.root, {read: false})
    .pipe(clean())
})

gulp.task('preparation:check-dependencies', () => {
  return checkDependencies().then(result => {
    if (!result.depsWereOk) {
      console.log('The following dependencies are not installed in the exact same versions that are specified in package.json:')
      result.error.forEach(message => {
        if (!message.includes('to install missing packages')) {
          console.log(' - ' + message)
        }
      })
      throw new Error('Invoke npm install to install missing packages.')
    }
  })
})
