import request from 'request-promise-native'

// Workaround:
// https://github.com/electron/electron/issues/1833
// https://github.com/electron/electron/issues/7083
const requestWrapper = async (params) => {
  setInterval(() => {}, 10)
  return request(params)
}

export default requestWrapper
