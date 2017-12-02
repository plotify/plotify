export default class InvalidStoryFileError extends Error {
  constructor (message) {
    super(message)
    this.name = 'InvalidStoryFileError'
  }
}
