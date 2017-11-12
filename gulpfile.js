const gulp = require('gulp')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const cache = require('gulp-cached')
const spawn = require('child_process').spawn
const sequence = require('run-sequence')
const checkDependencies = require('check-dependencies')

const path = {
  src: './src',
  frontend: './src/frontend',
  build: './build',
  packageJson: './package.json'
}

//
// Preparation
//

gulp.task('preparation', ['clean', 'check-dependencies'])

gulp.task('clean', () => {
  return gulp
    .src(path.build, {read: false})
    .pipe(clean())
})

gulp.task('check-dependencies', () => {
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

//
// Compile
//

gulp.task('compile', () => {
  return gulp
    .src(path.src + '/**/*.js')
    .pipe(cache('javascript', { optimizeMemory: true }))
    .pipe(babel({
      presets: ['env'],
      plugins: [
        'transform-react-jsx'
      ]
    }))
    .pipe(gulp.dest(path.build))
})

//
// Assets
//

gulp.task('assets', ['static-files', 'package-json'])

gulp.task('static-files', () => {
  return gulp
    .src(path.src + '/**/*.{html,css,sql,png,jpg,jpeg,ico,svg,eot,ttf,woff,woff2,otf}')
    .pipe(cache('static-files', { optimizeMemory: true }))
    .pipe(gulp.dest(path.build))
})

gulp.task('package-json', () => {
  return gulp
    .src(path.packageJson)
    .pipe(gulp.dest(path.build))
})

//
// Development
//

gulp.task('development', ['electron', 'watch-frontend'])

gulp.task('electron', (callback) => {
  const process = spawn('electron', [path.build + '/electron/main.js'])
  process.stdout.on('data', (data) => console.log(data.toString()))
  process.stderr.on('data', (data) => console.log(data.toString()))
})

gulp.task('watch-frontend', () => {
  gulp.watch(path.frontend + '/**/*.*', ['compile', 'assets'])
})

//
// Combined tasks
//

gulp.task('default', () => {
  sequence('preparation', 'compile', 'assets', 'development')
})
