import { ipcMain as ipc } from "electron";
import { getConnection, setConnection } from "./connection";
import { OPEN_STORY, CLOSE_STORY } from "../../shared/stories/ipc-channels";

import sqlite3 from "sqlite3";

ipc.on(OPEN_STORY, (event, payload) => {

  const old = getConnection();

  if (old !== null) {
    old.close();
  }

  setConnection(new sqlite3.Database(":memory:"));

  event.sender.send(payload.callbackChannel, "memory");

});

ipc.on(CLOSE_STORY, (event, payload) => {

  const connection = getConnection();

  if (connection === null) {
    connection.close((error) => {
      // TODO Error handling
      event.sender.send(payload.callbackChannel);
    });
  } else {
    event.sender.send(payload.callbackChannel);
  }

});
