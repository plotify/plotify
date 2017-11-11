import { ipcRenderer } from 'electron'
import uuid from 'uuid/v4'
import { getStore } from './store'

const callbackChannelPrefix = 'callback/'

export const request = (name, args) => {
  return new Promise((resolve, reject) => {
    const callbackChannel = createCallbackChannel(resolve, reject)
    sendRequest(name, args, callbackChannel)
  })
}

const createCallbackChannel = (resolve, reject) => {
  const callbackChannel = callbackChannelPrefix + uuid()

  ipcRenderer.once(callbackChannel, (event, message) => {
    if (message.successful) {
      resolve(message.payload)
    } else {
      reject(message.payload)
    }
  })

  return callbackChannel
}

const sendRequest = (name, args, callbackChannel) => {
  ipcRenderer.send(name, {
    callbackChannel: callbackChannel,
    args: args || {}
  })
}

export const eventHandler = (name, handler) => {
  ipcRenderer.on(name, (event, payload) => {
    handler(getStore().dispatch, payload)
  })
}
