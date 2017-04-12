import { sendCallback } from "../../shared/commons/ipc";
import { OPEN_STORY_DIALOG } from "../../shared/stories/ipc-channels";
import { NoStoryChosenError } from "../../shared/stories/errors";
import { openStory } from "./open";

import { getMainWindow } from "../main-window";
import { dialog } from "electron";
import app from "../../shared/commons/app";

const options = {
  title: "Geschichte öffnen",
  buttonLabel: "Geschichte öffnen",
  defaultPath: app.getPath("documents"),
  filters: [
    { name: "Geschichte", extensions: ["story"] },
    { name: "Alle Dateien", extensions: ["*"] }
  ],
  properties: ["openFile", "createDirectory"]
};

export function openStoryDialog() {
  return new Promise((resolve, reject) => {

    dialog.showOpenDialog(getMainWindow(), options, (paths) => {

      if (paths) {
        resolve(paths[0]);
      } else {
        reject(new NoStoryChosenError());
      }

    });

  });
}

export function registerOpenStoryDialogIpcChannel(ipcMain) {
  ipcMain.on(OPEN_STORY_DIALOG, (event, payload) => {
    openStoryDialog()
    .then(file => sendCallback(event, payload, file))
    .catch(error => sendCallback(event, payload, error, false));
  });
}
