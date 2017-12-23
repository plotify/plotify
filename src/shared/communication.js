import uuid from 'uuid/v4'

const responseChannelPrefix = 'response/'

export const requestBase = (sender, receiver, name, payload) => {
  return new Promise((resolve, reject) => {
    const responseChannel = createResponseChannel(receiver, resolve, reject)
    sendRequest(sender, name, payload, responseChannel)
  })
}

const createResponseChannel = (receiver, resolve, reject) => {
  const responseChannel = responseChannelPrefix + uuid()

  receiver.once(responseChannel, (_, response) => {
    if (response.successful) {
      resolve(response.payload)
    } else {
      reject(response.payload)
    }
  })

  return responseChannel
}

const sendRequest = (sender, name, payload, responseChannel) => {
  sender.send(name, {
    responseChannel,
    payload
  })
}

export const requestHandlerBase = (receiver, name, handler) => {
  receiver.on(name, (event, request) => receiverHandler(handler, event, request))
}

export const requestHandlerOnceBase = (receiver, name, handler) => {
  receiver.once(name, (event, request) => receiverHandler(handler, event, request))
}

const receiverHandler = (handler, event, request) => {
  const { payload, responseChannel } = request
  callHandler(handler, event.sender, payload)
    .then(payload => sendResponse(event.sender, responseChannel, payload, true))
    .catch(payload => sendResponse(event.sender, responseChannel, payload, false))
}

const callHandler = (handler, sender, payload) => {
  return new Promise((resolve, reject) => {
    handler(resolve, reject, sender, payload)
  })
}

const sendResponse = (sender, responseChannel, payload, successful) => {
  sender.send(responseChannel, {
    successful,
    payload
  })
}
