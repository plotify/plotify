import { registerFindCharactersIpcChannel } from "./find";

export default function registerCharactersIpcChannels(ipcMain) {
  registerFindCharactersIpcChannel(ipcMain);
}
