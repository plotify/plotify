import { ipcRenderer } from "electron";
import UUID from "./uuid";

const callbackChannelPrefix = "channel-";

export function sendMessageToMain(channel, callback, ...args) {

  const callbackChannel = callbackChannelPrefix + UUID.random().toString();
  ipcRenderer.once(callbackChannel, callback);

  ipcRenderer.send(channel, {
    callbackChannel: callbackChannel,
    args: args
  });

}
