import cache from 'gulp-cached'
import gulp from 'gulp'
import paths from '../paths'

gulp.task('assets', ['static-files', 'package-json', 'license-file'])

gulp.task('static-files', () => {
  return gulp
    .src(paths.src + '/**/*.{html,css,sql,png,jpg,jpeg,gif,ico,svg,icns,eot,ttf,woff,woff2,otf}')
    .pipe(cache('static-files', { optimizeMemory: true }))
    .pipe(gulp.dest(paths.build.app))
})

gulp.task('package-json', () => {
  return gulp
    .src(paths.packageJson)
    .pipe(gulp.dest(paths.build.app))
})

gulp.task('license-file', () => {
  return gulp
    .src(paths.licenseFile)
    .pipe(gulp.dest(paths.build.app))
})
