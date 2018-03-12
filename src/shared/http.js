import { concat } from 'simple-get'

export const get = async (url) => {
  return new Promise((resolve, reject) => {
    // Workaround:
    // https://github.com/electron/electron/issues/1833
    // https://github.com/electron/electron/issues/7083
    setInterval(() => {}, 10)

    concat(url, (error, result, data) => {
      if (error) {
        reject(error)
      }

      if (result.statusCode < 200 || result.statusCode > 299) {
        reject(new Error('HTTP status code: ' + result.statusCode))
      }

      resolve(data)
    })
  })
}
