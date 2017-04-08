import path from "path";
import fs from "fs";
import sqlite3 from "sqlite3";
import app from "../../shared/commons/app";
import { getConnection, setConnection } from "./connection";
import { sendCallback } from "../../shared/commons/ipc";
import { CREATE_STORY } from "../../shared/stories/ipc-channels";

const newStorySqlStatements = loadNewStorySqlStatements();

export function createNewStory() {
  return new Promise((resolve, reject) => {

    const filePath = getNewFilePath();
    const mode = sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE;

    const db = new sqlite3.Database(filePath, mode, (error) => {

      if (!error) {
        db.exec(newStorySqlStatements);
        db.close((error) => {
          resolve(filePath);
        });
      } else {
        reject(error);
      }

    });

  });
}

function loadNewStorySqlStatements() {
  const file = path.join(__dirname, "new-story.sql");
  return fs.readFileSync(file, "utf-8").toString();
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

export function registerCreateStoryIpcChannel(ipcMain) {
  ipcMain.on(CREATE_STORY, (event, payload) => {
    createNewStory()
      .then(file => sendCallback(event, payload, file))
      .catch(error => sendCallback(event, payload, error, false));
  });
}
