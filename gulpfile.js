const gulp = require('gulp')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const cache = require('gulp-cached')
const spawn = require('child_process').spawn
const sequence = require('run-sequence')
const checkDependencies = require('check-dependencies')
const builder = require('electron-builder')
const path = require('path')
const fs = require('fs-extra')
const licenseCheckerDirect = require('license-checker')

//
// Recommended tasks
//

gulp.task('default', () => {
  sequence('preparation', 'tests', 'compile', 'assets', 'electron')
})

gulp.task('test', () => {
  sequence('preparation', 'tests')
})

gulp.task('coverage', () => {
  sequence('preparation', 'test-coverage')
})

gulp.task('dev:frontend', () => {
  sequence('preparation', 'tests', 'compile', 'assets', 'development-frontend')
})

gulp.task('dev:backend', () => {
  sequence('preparation', 'development-backend')
})

gulp.task('dist:linux', () => {
  sequence('preparation', 'tests', 'compile', 'assets', 'build-linux-installer')
})

gulp.task('dist:mac', () => {
  sequence('preparation', 'tests', 'compile', 'assets', 'build-mac-installer')
})

gulp.task('dist:win', () => {
  sequence('preparation', 'tests', 'compile', 'assets', 'build-win-installer')
})

// 0. Constants and helper functions
// 1. Preparation
// 2. Execute tests
// 3. Compile
// 4. Copy assets
// 5. Prepare distribution
// 6. Distribution
// 7. Development

//
// 0. Constants and helper functions
//

const paths = {
  src: './src',
  frontend: './src/frontend',
  backend: './src/backend',
  distribution: './distribution',
  build: {
    root: './build',
    app: './build/app',
    dist: './build/dist'
  },
  packageJson: './package.json',
  bin: './node_modules/.bin'
}

const storyMimeType = 'application/org.plotify.story'

const bin = (name) => {
  let executable = name
  if (process.platform === 'win32') {
    executable += '.cmd'
  }
  return path.join(paths.bin, executable)
}

const executeBinary = (name, args) => {
  return new Promise((resolve, reject) => {
    const child = spawn(bin(name), args)

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(code)
      }
    })

    child.stdout.on('data', (data) => process.stdout.write(data))
    child.stderr.on('data', (data) => process.stderr.write(data))
  })
}

const licenseChecker = (options) => {
  return new Promise((resolve, reject) => {
    licenseCheckerDirect.init(options, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

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
// 2. Execute tests
//

const jestOptions = [
  '--colors'
]

const coverageOptions = [
  '--coverage',
  '--collectCoverageFrom=src/**/*.js',
  ...jestOptions
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

//
// 3. Compile
//

gulp.task('compile', () => {
  const babelrc = JSON.parse(fs.readFileSync('.babelrc', 'utf-8'))
  return gulp
    .src([paths.src + '/**/*.js', '!**/*.spec.js', '!**/__mocks__/**'])
    .pipe(cache('javascript', { optimizeMemory: true }))
    .pipe(babel(babelrc))
    .pipe(gulp.dest(paths.build.app))
})

//
// 4. Copy assets
//

gulp.task('assets', ['static-files', 'package-json'])

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

//
// 5. Prepare distribution
//

const ownLicenseFile = 'LICENSE'
const dependenciesLicenseFile = 'LICENSES.dependencies.txt'
const robotoLicenseFile = 'src/frontend/static/fonts/roboto-license.txt'

const options = Object.freeze({ encoding: 'utf-8' })
const separator = '\n\n--------------------------------------------------------------------------\n\n'

const copyOwnLicenseFile = async (context) => {
  const licenseFile = path.join(context.appOutDir, ownLicenseFile)
  await fs.copy(ownLicenseFile, licenseFile)
}

const createDependenciesLicenseFile = async (context) => {
  const file = path.join(context.appOutDir, dependenciesLicenseFile)
  const fd = await fs.open(file, 'w')
  await fs.close(fd)
  return file
}

const addRobotoLicense = async (targetFile) => {
  const robotoLicense = await fs.readFile(robotoLicenseFile, options)
  await fs.appendFile(targetFile, robotoLicense, options)
}

const addDependenciesLicenses = async (targetFile) => {
  const dependencies = await licenseChecker({ start: paths.build.app })

  for (const name in dependencies) {
    const dependency = dependencies[name]

    const header = separator +
      'Package:   ' + name + '\n' +
      'Publisher: ' + dependency.publisher + '\n' +
      'License:   ' + dependency.licenses

    let content = ''
    if (dependency.licenseFile) {
      content += '\n\n'
      content += await fs.readFile(dependency.licenseFile, options)
    }

    await fs.appendFile(targetFile, header + content)
  }
}

const generateLicenseFile = async (context) => {
  console.log('Generate license files...')
  await copyOwnLicenseFile(context)
  const licenseFile = await createDependenciesLicenseFile(context)
  await addRobotoLicense(licenseFile)
  await addDependenciesLicenses(licenseFile)
  console.log('License files generated.')
}

//
// 6. Distribution
//

// TODO Filter test files (*.spec.js)
const config = {

  appId: 'org.plotify',
  directories: {
    app: paths.build.app,
    output: paths.build.dist,
    buildResources: paths.distribution
  },
  afterPack: generateLicenseFile,

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
// 7. Development
//

gulp.task('development-frontend', ['electron', 'watch-frontend'])

gulp.task('electron', (callback) => {
  return executeBinary('electron', [paths.build.app + '/electron/main.js'])
})

gulp.task('watch-frontend', () => {
  gulp.watch(paths.frontend + '/**/*.*', ['compile', 'assets'])
})

gulp.task('development-backend', ['tests-without-exit', 'watch-backend'])

gulp.task('watch-backend', () => {
  gulp.watch(paths.backend + '/**/*.*', ['tests-without-exit'])
})
