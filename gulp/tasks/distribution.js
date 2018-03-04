import { appendFile, close, mkdir, open, readFile } from 'fs-extra'
import { basename, dirname, join } from 'path'

import { build } from 'electron-builder'
import gulp from 'gulp'
import licenseCheckerDirect from 'license-checker'
import paths from '../paths'

//
// Generate dependencies licenses file
//

const ownLicenseFile = './LICENSE'
const dependenciesLicenseFile = join(paths.build.dist, 'LICENSES.dependencies.txt')
const robotoLicenseFile = './src/frontend/static/fonts/roboto-license.txt'

const options = Object.freeze({ encoding: 'utf-8' })
const separator = '\n\n--------------------------------------------------------------------------\n\n'

const generateDependenciesLicensesFile = async () => {
  console.log('Generate dependencies licenses file...')
  await createDependenciesLicenseFile()
  await addRobotoLicense()
  await addDependenciesLicenses()
  console.log('Dependencies licenses file generated.')
}

const createDependenciesLicenseFile = async () => {
  await mkdir(dirname(dependenciesLicenseFile))
  const fd = await open(dependenciesLicenseFile, 'w')
  await close(fd)
}

const addRobotoLicense = async () => {
  const robotoLicense = await readFile(robotoLicenseFile, options)
  await appendFile(dependenciesLicenseFile, robotoLicense, options)
}

const addDependenciesLicenses = async () => {
  const dependencies = await licenseChecker({ start: paths.root })

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

    await appendFile(dependenciesLicenseFile, header + content)
  }
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
// Distribution
//

const config = {
  appId: 'org.plotify',
  copyright: 'Copyright © 2017-2018 Sebastian Schmidt & Jasper Meyer',
  directories: {
    app: paths.build.app,
    output: paths.build.dist,
    buildResources: paths.distribution
  },
  extraFiles: [
    {
      from: ownLicenseFile,
      to: basename(ownLicenseFile)
    },
    {
      from: dependenciesLicenseFile,
      to: basename(dependenciesLicenseFile)
    }
  ],

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
    icon: './mac/icon.icns',
    fileAssociations: {
      ext: 'story',
      name: 'Plotify Geschichte',
      icon: './mac/icon.icns',
      role: 'Editor'
    }
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
  return generateDependenciesLicensesFile()
    .then(() => build(getPlatformConfig()))
})
