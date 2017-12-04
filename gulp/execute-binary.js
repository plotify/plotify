import { join } from 'path'
import paths from './paths'
import { spawn } from 'child_process'

const bin = (name) => {
  let executable = name
  if (process.platform === 'win32') {
    executable += '.cmd'
  }
  return join(paths.bin, executable)
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

export default executeBinary
