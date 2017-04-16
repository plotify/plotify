import { ipcRenderer } from "electron";
import UUID from "./uuid";

const callbackChannelPrefix = "channel-";

export function sendToModel(channel, args) {
  return new Promise((resolve, reject) => {

    const callbackChannel = callbackChannelPrefix + UUID.random().toString();

    ipcRenderer.once(callbackChannel, (event, message) => {
      if (message.successful) {
        resolve(message.result);
      } else {
        reject(message.result);
      }
    });

    ipcRenderer.send(channel, {
      callbackChannel: callbackChannel,
      args: args || {}
    });

  });
}

export function sendCallback(originEvent, originPayload, result = undefined, successful = true) {
  try {
    originEvent.sender.send(originPayload.callbackChannel, {
      successful: successful,
      result: result
    });
  } catch (error) {
    if (error.message !== "Object has been destroyed") {
      console.log("Could not send callback: ", error);
    }
  }
}
