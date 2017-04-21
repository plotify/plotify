import { sendCallback } from "../../shared/commons/ipc";
import { CREATE_CHARACTER } from "../../shared/characters/ipc-channels";
import { run, beginTransaction, endTransaction, rollbackTransaction } from "../shared/sqlite";

import UUID from "../../shared/commons/uuid";
import defaultProfile from "./default-profile";

export function registerCreateCharacterIpcChannel(ipcMain) {
  ipcMain.on(CREATE_CHARACTER, (event, payload) => {
    createCharacter()
      .then(characterId => sendCallback(event, payload, characterId))
      .catch(error => sendCallback(event, payload, error, false));
  });
}

export function createCharacter() {
  const characterId = UUID.random().toString();
  return Promise.resolve()
    .then(() => beginTransaction())
    .then(() => createEntry(characterId))
    .then(() => createDefaultProfile(characterId))
    .then(() => endTransaction(characterId))
    .catch(error => {
      console.log("Failed to create a new character:", error);
      return rollbackTransaction(error);
    });
}

function createEntry(characterId) {

  const historyId = UUID.random().toString();

  const insertHistorySql = "INSERT INTO character_history (id, name, deleted) VALUES (?, ?, ?)";
  const insertHistoryParams = [historyId, "", 0];

  const insertCharacterSql = "INSERT INTO character (id, presence_history_id) VALUES (?, ?)";
  const insertCharacterParams = [characterId, historyId];

  return Promise.resolve()
    .then(() => run(insertHistorySql, insertHistoryParams))
    .then(() => run(insertCharacterSql, insertCharacterParams));

}

function createDefaultProfile(characterId) {

  let promises = [];

  for (let position = 0; position < defaultProfile.length; position++) {
    const group = defaultProfile[position];
    promises.push(handleGroup(characterId, group.title, group.entries, position));
  }

  return Promise.all(promises).then(() => Promise.resolve(characterId));

}

function handleGroup(characterId, title, entries, position) {
  return Promise.resolve()
    .then(() => insertGroupHistory(title, entries, position))
    .then(historyId => insertGroup(characterId, historyId))
    .then(groupId => handleEntries(characterId, groupId, entries));
}

function insertGroupHistory(title, entries, position) {
  const historyId = UUID.random().toString();
  const sql = " INSERT INTO entry_group_history " +
              " (id, title, position, deleted)  " +
              " VALUES (?, ?, ?, ?)             ";
  const params = [historyId, title, position, 0];
  return run(sql, params).then(() => Promise.resolve(historyId));
}

function insertGroup(characterId, historyId) {
  const id = UUID.random().toString();
  const sql = " INSERT INTO entry_group                 " +
              " (character_id, id, presence_history_id) " +
              " VALUES (?, ?, ?)                        ";
  const params = [characterId, id, historyId];
  return run(sql, params).then(() => Promise.resolve(id));
}

function handleEntries(characterId, groupId, entries) {

  let promises = [];

  for (let position = 0; position < entries.length; position++) {
    const title = entries[position];
    promises.push(handleEntry(characterId, groupId, title, position));
  }

  return Promise.all(promises);

}

function handleEntry(characterId, groupId, title, position) {
  return Promise.resolve()
    .then(() => insertEntryHistory(groupId, title, position))
    .then(historyId => insertEntry(characterId, historyId));
}

function insertEntryHistory(groupId, title, position) {
  const historyId = UUID.random().toString();
  const sql = " INSERT INTO entry_history                       " +
              " (id, group_id, title, value, position, deleted) " +
              " VALUES (?, ?, ?, ?, ?, ?)                       ";
  const params = [historyId, groupId, title, "", position, 0];
  return run(sql, params).then(() => Promise.resolve(historyId));
}

function insertEntry(characterId, historyId) {
  const id = UUID.random().toString();
  const sql = " INSERT INTO entry                       " +
              " (character_id, id, presence_history_id) " +
              " VALUES (?, ?, ?)                        ";
  const params = [characterId, id, historyId];
  return run(sql, params);
}
