import { getConnection, setConnection } from "./connection";
import { sendCallback } from "../../shared/commons/ipc";
import { OPEN_STORY } from "../../shared/stories/ipc-channels";
import {
  AnotherStoryAlreadyOpenedError,
  UnsupportedFileVersionError
} from "../../shared/stories/errors";

import sqlite3 from "sqlite3";

export const maxSupportedFileVersion = 1;

export function openStory(filePath) {
  return new Promise((resolve, reject) => {

    if (getConnection() !== null) {
      throw new AnotherStoryAlreadyOpenedError();
    }

    const mode = sqlite3.OPEN_READWRITE;

    const connection = new sqlite3.Database(filePath, mode, (error) => {

      if (error) {
        console.log("Could not open story: Open connection failed:", error);
        reject(error);
        return;
      }

      connection.get("PRAGMA user_version;", (error, row) => {

        if (error) {
          console.log("Could not open story: Check user_version failed:", error);
          reject(error);
          return;
        }

        /* jshint -W069 */
        const userVersion = row["user_version"];

        if (userVersion > maxSupportedFileVersion) {
          reject(new UnsupportedFileVersionError(maxSupportedFileVersion, userVersion));
          return;
        }

        setConnection(connection);
        resolve(filePath);

      });

    });

  });
}



export function registerOpenStoryIpcChannel(ipcMain) {
  ipcMain.on(OPEN_STORY, (event, payload) => {
    openStory(payload.args)
      .then(file => sendCallback(event, payload, file))
      .catch(error => sendCallback(event, payload, error, false));
  });
}
