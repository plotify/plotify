const gulp = require('gulp')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const cache = require('gulp-cached')
const spawn = require('child_process').spawn
const sequence = require('run-sequence')
const checkDependencies = require('check-dependencies')
const builder = require('electron-builder')
const path = require('path')

const paths = {
  src: './src',
  frontend: './src/frontend',
  distribution: './distribution',
  build: {
    root: './build',
    app: './build/app',
    dist: './build/dist'
  },
  packageJson: './package.json'
}

const storyMimeType = 'application/org.plotify.story'

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
    .src(paths.build.root, {read: false})
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
    .src(paths.src + '/**/*.js')
    .pipe(cache('javascript', { optimizeMemory: true }))
    .pipe(babel({
      presets: ['env'],
      plugins: [
        'transform-react-jsx'
      ]
    }))
    .pipe(gulp.dest(paths.build.app))
})

//
// 3. Copy assets
//

gulp.task('assets', ['static-files', 'package-json'])

gulp.task('static-files', () => {
  return gulp
    .src(paths.src + '/**/*.{html,css,sql,png,jpg,jpeg,ico,svg,icns,eot,ttf,woff,woff2,otf}')
    .pipe(cache('static-files', { optimizeMemory: true }))
    .pipe(gulp.dest(paths.build.app))
})

gulp.task('package-json', () => {
  return gulp
    .src(paths.packageJson)
    .pipe(gulp.dest(paths.build.app))
})

//
// 4. Distribution
//

const config = {

  appId: 'org.plotify',
  directories: {
    app: paths.build.app,
    output: paths.build.dist,
    buildResources: paths.distribution
  },

  //
  // Linux
  //
  linux: {
    target: ['deb'],
    category: 'Office\nMimeType=' + storyMimeType,
    icon: './linux/icons'
  },
  deb: {
    afterInstall: path.join(paths.distribution, './linux/after-install.tpl.sh'),
    afterRemove: path.join(paths.distribution, './linux/after-remove.tpl.sh')
  },

  //
  // Mac
  //
  mac: {
    target: 'dmg',
    category: 'public.app-category.productivity',
    icon: './mac/icon.icns'
  },

  //
  // Windows
  //
  win: {
    target: 'nsis',
    icon: path.join(paths.distribution, './win/icon.ico'),
    fileAssociations: {
      ext: 'story',
      name: 'Plotify Geschichte',
      description: 'Plotify Geschichte',
      icon: path.join(paths.distribution, './win/icon.ico')
    }
  },
  nsis: {
    perMachine: true
  }

}

gulp.task('build-linux-installer', () => {
  return builder.build({
    platform: 'linux',
    x64: true,
    publish: 'never',
    config
  })
})

gulp.task('build-mac-installer', () => {
  return builder.build({
    platform: 'mac',
    x64: true,
    publish: 'never',
    config
  })
})

gulp.task('build-win-installer', () => {
  return builder.build({
    platform: 'win',
    x64: true,
    publish: 'never',
    config
  })
})

//
// A. Development
//

gulp.task('development', ['electron', 'watch-frontend'])

gulp.task('electron', (callback) => {
  const process = spawn('electron', [paths.build.app + '/electron/main.js'])
  process.stdout.on('data', (data) => console.log(data.toString()))
  process.stderr.on('data', (data) => console.log(data.toString()))
})

gulp.task('watch-frontend', () => {
  gulp.watch(paths.frontend + '/**/*.*', ['compile', 'assets'])
})

//
// B. Combined tasks
//

gulp.task('default', () => {
  sequence('preparation', 'compile', 'assets', 'development')
})

gulp.task('distribution:linux', () => {
  sequence('preparation', 'compile', 'assets', 'build-linux-installer')
})

gulp.task('distribution:mac', () => {
  sequence('preparation', 'compile', 'assets', 'build-mac-installer')
})

gulp.task('distribution:win', () => {
  sequence('preparation', 'compile', 'assets', 'build-win-installer')
})
