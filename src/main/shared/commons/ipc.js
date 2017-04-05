import { ipcRenderer } from "electron";
import UUID from "./uuid";

const callbackChannelPrefix = "channel-";

export function sendToModel(channel, args) {
  return new Promise((resolve, reject) => {

    const callbackChannel = callbackChannelPrefix + UUID.random().toString();

    ipcRenderer.once(callbackChannel, (event, message) => {
      if (message.error) {
        reject(message.result);
      } else {
        resolve(message.result);
      }
    });

    ipcRenderer.send(channel, {
      callbackChannel: callbackChannel,
      args: args
    });

  });
}
