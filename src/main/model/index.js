import { ipcMain } from "electron";

import { registerCreateStoryIpcChannel } from "./stories/create";
import { registerOpenStoryIpcChannel } from "./stories/open";

registerCreateStoryIpcChannel(ipcMain);
registerOpenStoryIpcChannel(ipcMain);
