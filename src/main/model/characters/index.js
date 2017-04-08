import { registerFindCharactersIpcChannel } from "./find";
import { registerCreateCharacterIpcChannel } from "./create";

export default function registerCharactersIpcChannels(ipcMain) {
  registerFindCharactersIpcChannel(ipcMain);
  registerCreateCharacterIpcChannel(ipcMain);
}
