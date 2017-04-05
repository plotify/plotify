import { ipcMain as ipc } from "electron";
import { getConnection, setConnection } from "./connection";
import { OPEN_STORY } from "../../shared/stories/ipc-channels";

import sqlite3 from "sqlite3";

export function openStory(filePath) {
  return new Promise((resolve, reject) => {

    if (getConnection() !== null) {
      throw new AnotherStoryAlreadyOpenedError();
    }

    const mode = sqlite3.OPEN_READWRITE;

    const db = new sqlite3.Database(filePath, mode, (error) => {

      if (error) {
        reject(error);
      } else {
        setConnection(db);
        resolve(filePath);
      }

    });

  });
}

export class AnotherStoryAlreadyOpenedError extends Error {
  constructor() {
    super("Another story has already been opened.");
    this.name = "AnotherStoryAlreadyOpenedError";
  }
}

export function registerOpenStoryIpcChannel(ipcMain) {
  ipcMain.on(OPEN_STORY, (event, payload) => {
    openStory(payload.args).then((file) => {
      event.sender.send(payload.callbackChannel, {
        error: false,
        result: file
      });
    }).catch((error) => {
      event.sender.send(payload.callbackChannel, {
        error: true,
        result: error
      });
    });
  });
}
