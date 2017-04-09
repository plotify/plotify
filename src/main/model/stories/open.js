import { getConnection, setConnection } from "./connection";
import { sendCallback } from "../../shared/commons/ipc";
import { OPEN_STORY } from "../../shared/stories/ipc-channels";

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
        reject(error);
        return;
      }

      connection.get("PRAGMA user_version;", (error, row) => {

        if (error) {
          reject(error);
          return;
        }

        /* jshint -W069 */
        const userVersion = row["user_version"];

        if (userVersion > maxSupportedFileVersion) {
          reject(new UnsupportedFileVersionError(userVersion));
          return;
        }

        setConnection(connection);
        resolve(filePath);

      });

    });

  });
}

export class AnotherStoryAlreadyOpenedError extends Error {
  constructor() {
    super("Another story has already been opened.");
    this.name = "AnotherStoryAlreadyOpenedError";
  }
}

export class UnsupportedFileVersionError extends Error {

  constructor(unsupportedFileVersion) {
    super("Unsupported story version.");
    this.name = "UnsupportedStoryVersionError";
    this.maxSupportedFileVersion = maxSupportedFileVersion;
    this.unsupportedFileVersion = unsupportedFileVersion;
  }

}

export function registerOpenStoryIpcChannel(ipcMain) {
  ipcMain.on(OPEN_STORY, (event, payload) => {
    openStory(payload.args)
      .then(file => sendCallback(event, payload, file))
      .catch(error => sendCallback(event, payload, error, false));
  });
}
