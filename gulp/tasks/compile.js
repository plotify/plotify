import babel from 'gulp-babel'
import cache from 'gulp-cached'
import gulp from 'gulp'
import paths from '../paths'
import { readFileSync } from 'fs-extra'

gulp.task('compile', () => {
  const babelrc = JSON.parse(readFileSync('.babelrc', 'utf-8'))
  return gulp
    .src([paths.src + '/**/*.js', '!**/*.spec.js', '!**/__mocks__/**'])
    .pipe(cache('javascript', { optimizeMemory: true }))
    .pipe(babel(babelrc))
    .pipe(gulp.dest(paths.build.app))
})
