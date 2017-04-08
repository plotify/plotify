import { registerFindCharactersIpcChannel } from "./find";
import { registerCreateCharacterIpcChannel } from "./create";
import { registerUpdateCharacterIpcChannel } from "./update.js";

export default function registerCharactersIpcChannels(ipcMain) {
  registerFindCharactersIpcChannel(ipcMain);
  registerCreateCharacterIpcChannel(ipcMain);
  registerUpdateCharacterIpcChannel(ipcMain);
}
