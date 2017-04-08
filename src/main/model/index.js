import { ipcMain } from "electron";

import { registerCreateStoryIpcChannel } from "./stories/create";
import { registerOpenStoryIpcChannel } from "./stories/open";
import { registerCloseStoryIpcChannel } from "./stories/close";

registerCreateStoryIpcChannel(ipcMain);
registerOpenStoryIpcChannel(ipcMain);
registerCloseStoryIpcChannel(ipcMain);
