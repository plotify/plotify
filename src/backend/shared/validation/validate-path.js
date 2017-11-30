import { parse } from 'path'

const validatePath = (path) => {
  try {
    parse(path)
    return path
  } catch (error) {
    throw new TypeError('Invalid path: ' + path)
  }
}

export default validatePath
