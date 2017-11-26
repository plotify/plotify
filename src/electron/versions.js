const packageJson = require('../package.json')

const printLogo = () => {
  const logo = '\n' +
    '  _____  _       _   _  __       \n' +
    ' |  __ \\| |     | | (_)/ _|      \n' +
    ' | |__) | | ___ | |_ _| |_ _   _ \n' +
    ' |  ___/| |/ _ \\| __| |  _| | | |\n' +
    ' | |    | | (_) | |_| | | | |_| |\n' +
    ' |_|    |_|\\___/ \\__|_|_|  \\__, |\n' +
    '                            __/ |\n' +
    '                           |___/ \n'
  console.log(logo)
}

const printVersions = () => {
  const versions = '' +
    '    Plotify:   ' + packageJson.version + '\n' +
    '    Electron:  ' + process.versions.electron + '\n' +
    '    Node:      ' + process.versions.node + '\n' +
    '    Chromium:  ' + process.versions.chrome + '\n' +
    '    V8:        ' + process.versions.v8 + '\n'
  console.log(versions)
}

const printWelcomeScreen = () => {
  printLogo()
  printVersions()
}

export default printWelcomeScreen
