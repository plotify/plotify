const gulp = require('gulp')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const cache = require('gulp-cached')
const spawn = require('child_process').spawn
const sequence = require('run-sequence')

const path = {
  src: './src',
  frontend: './src/frontend',
  build: './build'
}

gulp.task('clean', () => {
  return gulp
    .src(path.build, {read: false})
    .pipe(clean())
})

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

gulp.task('assets', () => {
  return gulp
    .src(path.src + '/**/*.{html,css,sql,png,jpg,jpeg,ico,svg,eot,ttf,woff,woff2,otf}')
    .pipe(cache('assets', { optimizeMemory: true }))
    .pipe(gulp.dest(path.build))
})

gulp.task('package-json', () => {
  return gulp
    .src('./package.json')
    .pipe(gulp.dest(path.build))
})

gulp.task('electron', (callback) => {
  const process = spawn('electron', [path.build + '/electron/main.js'])
  process.stdout.on('data', (data) => console.log(data.toString()))
  process.stderr.on('data', (data) => console.log(data.toString()))
})

gulp.task('watch-frontend', () => {
  gulp.watch(path.frontend + '/**/*.*', ['compile', 'assets'])
})

gulp.task('default', () => {
  sequence('clean', 'compile', 'assets', 'package-json', 'watch-frontend', 'electron')
})
