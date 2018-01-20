import checkDependencies from 'check-dependencies'
import del from 'del'
import gulp from 'gulp'
import paths from '../paths'

gulp.task('preparation', ['preparation:clean', 'preparation:check-dependencies'])

gulp.task('preparation:clean', () => {
  return del([
    paths.build.root,
    paths.coverage
  ])
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
