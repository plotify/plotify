const gulp = require('gulp')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const cache = require('gulp-cached')
const spawn = require('child_process').spawn
const sequence = require('run-sequence')
const checkDependencies = require('check-dependencies')
const builder = require('electron-builder')

const path = {
  src: './src',
  frontend: './src/frontend',
  build: {
    root: './build',
    app: './build/app',
    dist: './build/dist'
  },
  packageJson: './package.json'
}

// 1. Preparation
// 2. Compile
// 3. Copy assets
// 4. Distribution
// A. Development
// B. Combined tasks

//
// 1. Preparation
//

gulp.task('preparation', ['clean', 'check-dependencies'])

gulp.task('clean', () => {
  return gulp
    .src(path.build.root, {read: false})
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
// 2. Compile
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
    .pipe(gulp.dest(path.build.app))
})

//
// 3. Copy assets
//

gulp.task('assets', ['static-files', 'package-json'])

gulp.task('static-files', () => {
  return gulp
    .src(path.src + '/**/*.{html,css,sql,png,jpg,jpeg,ico,svg,eot,ttf,woff,woff2,otf}')
    .pipe(cache('static-files', { optimizeMemory: true }))
    .pipe(gulp.dest(path.build.app))
})

gulp.task('package-json', () => {
  return gulp
    .src(path.packageJson)
    .pipe(gulp.dest(path.build.app))
})

//
// 4. Distribution
//

const config = {
  appId: 'org.plotify',
  directories: {
    app: path.build.app,
    output: path.build.dist
  },
  linux: {
    target: 'deb',
    category: 'Office',
    icon: './app/frontend/static/app-icons'
  },
  mac: {
    category: 'public.app-category.productivity'
  },
  win: {
    // TODO Auflösung des Icons verbessern: 256x256 wurde aus 128x128 abgeleitet.
    // TODO Auflösung des Icons verbessern: Bei kleinen Darstellungen wird das Icon unter Windows schlecht dargestellt.
    icon: './build/app/frontend/static/app-icons/256x256.ico'
  }
}

gulp.task('distribution-linux', () => {
  return builder.build({
    platform: 'linux',
    x64: true,
    config
  })
})

gulp.task('distribution-win', () => {
  return builder.build({
    platform: 'win',
    x64: true,
    config
  })
})

//
// A. Development
//

gulp.task('development', ['electron', 'watch-frontend'])

gulp.task('electron', (callback) => {
  const process = spawn('electron', [path.build.app + '/electron/main.js'])
  process.stdout.on('data', (data) => console.log(data.toString()))
  process.stderr.on('data', (data) => console.log(data.toString()))
})

gulp.task('watch-frontend', () => {
  gulp.watch(path.frontend + '/**/*.*', ['compile', 'assets'])
})

//
// B. Combined tasks
//

gulp.task('default', () => {
  sequence('preparation', 'compile', 'assets', 'development')
})
