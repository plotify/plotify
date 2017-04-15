import { registerFindCharactersIpcChannel } from "./find";
import { registerCreateCharacterIpcChannel } from "./create";
import { registerUpdateCharacterIpcChannel } from "./update";
import { registerUndoCharacterChangeIpcChannels } from "./undo";
import { registerRedoCharacterChangeIpcChannels } from "./redo";

export default function registerCharactersIpcChannels(ipcMain) {
  registerFindCharactersIpcChannel(ipcMain);
  registerCreateCharacterIpcChannel(ipcMain);
  registerUpdateCharacterIpcChannel(ipcMain);
  registerUndoCharacterChangeIpcChannels(ipcMain);
  registerRedoCharacterChangeIpcChannels(ipcMain);
}
