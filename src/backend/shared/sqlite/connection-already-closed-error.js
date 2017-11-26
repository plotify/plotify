export default class ConnectionAlreadyClosedError extends Error {
  constructor () {
    super()
    this.name = 'ConnectionAlreadyClosedError'
  }
}
