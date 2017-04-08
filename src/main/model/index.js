import { ipcMain } from "electron";

import registerStoryIpcChannels from "./stories";
import registerCharactersIpcChannels from "./characters";

registerStoryIpcChannels(ipcMain);
registerCharactersIpcChannels(ipcMain);
