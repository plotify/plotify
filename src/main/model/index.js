import { ipcMain } from "electron";

import { registerCreateStoryIpcChannel } from "./stories/create";

registerCreateStoryIpcChannel(ipcMain);
