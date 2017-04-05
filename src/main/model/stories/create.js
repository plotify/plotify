import path from "path";
import fs from "fs";
import sqlite3 from "sqlite3";
import app from "../../shared/commons/app";
import { getConnection, setConnection } from "./connection";
import { CREATE_STORY } from "../../shared/stories/ipc-channels";

export function createNewStory() {
  return new Promise((resolve, reject) => {

    const filePath = getNewFilePath();
    const mode = sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE;

    const db = new sqlite3.Database(filePath, mode, (error) => {

      if (error) {
        reject(error);
      } else {
        db.close((error) => {
          resolve(filePath);
        });
      }

    });

  });
}

export function registerCreateStoryIpcChannel(ipcMain) {
  ipcMain.on(CREATE_STORY, (event, payload) => {
    createNewStory().then((file) => {
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

function getNewFilePath() {

  const directory = app.getPath("documents");

  let filePath;
  let counter = 0;

  do {
    counter++;
    filePath = path.join(directory, "new-story-" + counter + ".story");
  } while (fs.existsSync(filePath));

  return filePath;

}
