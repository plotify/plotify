import { ipcMain } from "electron";
import {
  ADD_CHARACTER,
  CHANGE_CHARACTER_NAME,
  SELECT_ALL_CHARACTERS
} from "./ipc-channels";

import UUID from "../../commons/uuid";

import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");
// db.close();

db.run("CREATE TABLE characters (id TEXT, name TEXT)");

ipcMain.on(ADD_CHARACTER, (event, payload) => {

  const id = UUID.random().toString();
  const params = [id, ""];

  db.run("INSERT INTO characters VALUES (?, ?)", params, (error) => {
    // TODO Handle error
    event.sender.send(payload.callbackChannel, id);
  });

});

ipcMain.on(CHANGE_CHARACTER_NAME, (event, payload) => {

  const id = payload.args.id;
  const name = payload.args.name;
  const params = [name, id];

  db.run("UPDATE characters SET name = ? WHERE id = ?", params, (error) => {
    // TODO Handle error
    event.sender.send(payload.callbackChannel);
  });

});

ipcMain.on(SELECT_ALL_CHARACTERS, (event, payload) => {

  let result = [];

  db.each("SELECT id, name FROM characters", (error, row) => {
    // TODO Handle error
    result.push({ id: row.id, name: row.name });
  });

  event.sender.send(payload.callbackChannel, result);

});
