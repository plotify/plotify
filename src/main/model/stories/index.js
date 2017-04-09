import { registerCreateStoryIpcChannel } from "./create";
import { registerOpenStoryIpcChannel } from "./open";
import { registerOpenStoryDialogIpcChannel } from "./open-dialog";
import { registerCloseStoryIpcChannel } from "./close";

export default function registerStoryIpcChannels(ipcMain) {
  registerCreateStoryIpcChannel(ipcMain);
  registerOpenStoryIpcChannel(ipcMain);
  registerOpenStoryDialogIpcChannel(ipcMain);
  registerCloseStoryIpcChannel(ipcMain);
}
