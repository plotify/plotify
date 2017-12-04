import { appendFile, close, copy, open, readFile } from 'fs-extra'

import { build } from 'electron-builder'
import gulp from 'gulp'
import { join } from 'path'
import licenseCheckerDirect from 'license-checker'
import paths from '../paths'

//
// Generate license file
//

const ownLicenseFile = 'LICENSE'
const dependenciesLicenseFile = 'LICENSES.dependencies.txt'
const robotoLicenseFile = 'src/frontend/static/fonts/roboto-license.txt'

const options = Object.freeze({ encoding: 'utf-8' })
const separator = '\n\n--------------------------------------------------------------------------\n\n'

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

const copyOwnLicenseFile = async (context) => {
  const licenseFile = join(context.appOutDir, ownLicenseFile)
  await copy(ownLicenseFile, licenseFile)
}

const createDependenciesLicenseFile = async (context) => {
  const file = join(context.appOutDir, dependenciesLicenseFile)
  const fd = await open(file, 'w')
  await close(fd)
  return file
}

const addRobotoLicense = async (targetFile) => {
  const robotoLicense = await readFile(robotoLicenseFile, options)
  await appendFile(targetFile, robotoLicense, options)
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
      content += await readFile(dependency.licenseFile, options)
    }

    await appendFile(targetFile, header + content)
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
// Distribution
//

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
    category: 'Office\nMimeType=application/org.plotify.story',
    icon: './linux/icons'
  },
  deb: {
    afterInstall: join(paths.distribution, './linux/after-install.tpl.sh'),
    afterRemove: join(paths.distribution, './linux/after-remove.tpl.sh')
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
    icon: join(paths.distribution, './win/icon.ico'),
    fileAssociations: {
      ext: 'story',
      name: 'Plotify Geschichte',
      description: 'Plotify Geschichte',
      icon: join(paths.distribution, './win/icon.ico')
    }
  },
  nsis: {
    perMachine: true
  }

}

const linuxConfig = {
  platform: 'linux',
  x64: true,
  publish: 'never',
  config
}

const macConfig = {
  platform: 'mac',
  x64: true,
  publish: 'never',
  config
}

const winConfig = {
  platform: 'win',
  x64: true,
  publish: 'never',
  config
}

const getPlatformConfig = () => {
  switch (process.platform) {
    case 'linux':
      return linuxConfig
    case 'darwin':
      return macConfig
    case 'win32':
      return winConfig
    default:
      throw new Error('Unsupported platform: ' + process.platform)
  }
}

gulp.task('distribution', () => {
  return build(getPlatformConfig())
})
