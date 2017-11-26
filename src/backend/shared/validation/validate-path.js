import { parse } from 'path'

const validatePath = (path) => {
  try {
    parse(path)
  } catch (error) {
    throw new TypeError('Invalid path: ' + path)
  }
}

export default validatePath
