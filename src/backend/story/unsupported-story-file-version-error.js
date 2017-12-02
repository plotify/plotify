export default class UnsupportedStoryFileVersionError extends Error {
  constructor (message) {
    super(message)
    this.name = 'UnsupportedStoryFileVersionError'
  }
}
