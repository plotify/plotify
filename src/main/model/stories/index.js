import { registerCreateStoryIpcChannel } from "./create";
import { registerOpenStoryIpcChannel } from "./open";
import { registerCloseStoryIpcChannel } from "./close";

export default function registerStoryIpcChannels(ipcMain) {
  registerCreateStoryIpcChannel(ipcMain);
  registerOpenStoryIpcChannel(ipcMain);
  registerCloseStoryIpcChannel(ipcMain);
}
