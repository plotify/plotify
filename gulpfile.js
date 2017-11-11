const gulp = require('gulp')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const spawn = require('child_process').spawn
const sequence = require('run-sequence')

const path = {
  src: './src',
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
    .pipe(gulp.dest(path.build))
})

gulp.task('electron', (callback) => {
  const process = spawn('electron', [path.build + '/electron/main.js'])
  process.stdout.on('data', (data) => console.log(data.toString()))
  process.stderr.on('data', (data) => console.log(data.toString()))
})

gulp.task('default', () => {
  sequence('clean', 'compile', 'assets', 'electron')
})
