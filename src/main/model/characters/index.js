import { registerFindCharactersIpcChannel } from "./find";
import { registerCreateCharacterIpcChannel } from "./create";
import { registerUpdateCharacterIpcChannel } from "./update";
import { registerUndoCharacterChangeIpcChannels } from "./undo";
import { registerRedoCharacterChangeIpcChannels } from "./redo";
import { registerGetCharacterProfileIpcChannel } from "./get-profile";

export default function registerCharactersIpcChannels(ipcMain) {
  registerFindCharactersIpcChannel(ipcMain);
  registerCreateCharacterIpcChannel(ipcMain);
  registerUpdateCharacterIpcChannel(ipcMain);
  registerUndoCharacterChangeIpcChannels(ipcMain);
  registerRedoCharacterChangeIpcChannels(ipcMain);
  registerGetCharacterProfileIpcChannel(ipcMain);
}
