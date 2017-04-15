import UUID from "../../shared/commons/uuid";
import { sendCallback } from "../../shared/commons/ipc";
import { CREATE_CHARACTER } from "../../shared/characters/ipc-channels";
import { getConnection } from "../stories/connection";
import { run, beginTransaction, endTransaction, rollbackTransaction } from "../shared/sqlite";

export function createCharacter() {
  return new Promise((resolve, reject) => {

    const db = getConnection();

    const characterId = UUID.random().toString();
    const historyId = UUID.random().toString();

    const insertHistorySql = "INSERT INTO character_history (id, name, deleted) VALUES (?, ?, ?)";
    const insertHistoryParams = [historyId, "", 0];

    const insertCharacterSql = "INSERT INTO character (id, presence_history_id) VALUES (?, ?)";
    const insertCharacterParams = [characterId, historyId];

    run(insertHistorySql, insertHistoryParams)
      .then(() => run(insertCharacterSql, insertCharacterParams))
      .then(() => createDefaultProfile(characterId))
      .then(() => resolve(characterId))
      .catch(error => reject(error));

  });
}

const defaultProfile = [
  {
    title: "Physis",
    entries: ["Alter", "Größe", "Gewicht", "Körperbau", "Gesicht"]
  },
  {
    title: "Aussehen",
    entries: ["Haare", "Augen", "Kleidung", "Schmuck", "immer dabei"]
  },
  {
    title: "Auftreten",
    entries: ["Körperhaltung", "Charakter", "Wirkung", "Rolle"]
  },
  {
    title: "Innere Eigenschaften",
    entries: ["Charakter", "Interessen", "Abneigungen", "Moral"]
  },
  {
    title: "Zukunft",
    entries: ["Träume und Wünsche", "Ziele"]
  },
  {
    title: "Innerer Konflikt",
    entries: ["Beschreibung"]
  },
  {
    title: "Gesellschaft",
    entries: ["Herkunft", "Sprache", "Wohnort", "Beruf", "Stand"]
  }
];

export function createDefaultProfile(characterId) {
  return new Promise((resolve, reject) => {

    const db = getConnection();

    const insertGroupHistorySql = " INSERT INTO entry_group_history                 " +
                                  " (id, title, position, deleted)                  " +
                                  " VALUES (?, ?, ?, ?)                             ";
    const insertGroupSql =        " INSERT INTO entry_group                         " +
                                  " (character_id, id, presence_history_id)         " +
                                  " VALUES (?, ?, ?)                                ";

    const insertEntryHistorySql = " INSERT INTO entry_history                       " +
                                  " (id, group_id, title, value, position, deleted) " +
                                  " VALUES (?, ?, ?, ?, ?, ?)                       ";
    const insertEntrySql =        " INSERT INTO entry                               " +
                                  " (character_id, id, presence_history_id)         " +
                                  " VALUES (?, ?, ?)                                ";

    beginTransaction()
      .then(() => new Promise((resolve, reject) => {

        const insertGroupHistoryStmt = db.prepare(insertGroupHistorySql);
        const insertGroupStmt = db.prepare(insertGroupSql);
        const insertEntryHistoryStmt = db.prepare(insertEntryHistorySql);
        const insertEntryStmt = db.prepare(insertEntrySql);

        for (let index = 0; index < defaultProfile.length; index++) {
          handleGroup(characterId, defaultProfile[index], index,
            insertGroupHistoryStmt, insertGroupStmt, insertEntryHistoryStmt, insertEntryStmt,
            resolve, reject);
        }

      }))
      .then(() => endTransaction())
      .then(() => resolve())
      .catch(error => {
        rollbackTransaction()
          .then(() => reject(error))
          .catch(() => reject(error));
      });

  });
}

function handleGroup(characterId, group, position, insertGroupHistoryStmt, insertGroupStmt,
                     insertEntryHistoryStmt, insertEntryStmt, resolve, reject) {
  insertGroupHistory(insertGroupHistoryStmt, group, position)
    .then(historyId => insertGroup(insertGroupStmt, characterId, historyId))
    .then(groupId => new Promise((resolve, reject) => {
      for (let position = 0; position < group.entries.length; position++) {
        handleEntry(characterId, groupId, group.entries[position], position, insertEntryHistoryStmt,
          insertEntryStmt, resolve, reject);
      }
    }))
    .then(() => resolve())
    .catch(error => reject(error));
}

function handleEntry(characterId, groupId, entry, position, insertEntryHistoryStmt, insertEntryStmt,
                    resolve, reject) {
  insertEntryHistory(insertEntryHistoryStmt, groupId, entry, position)
    .then(historyId => insertEntry(insertEntryStmt, characterId, historyId))
    .then(() => resolve())
    .catch(error => reject(error));
}

function insertGroupHistory(statement, group, position) {
  return new Promise((resolve, reject) => {

    const historyId = UUID.random().toString();
    const params = [historyId, group.title, position, 0];

    statement.run(params, error => {
      if (error) {
        reject(error);
      } else {
        resolve(historyId);
      }
    });

  });
}

function insertGroup(statement, characterId, historyId) {
  return new Promise((resolve, reject) => {

    const groupId = UUID.random().toString();
    const params = [characterId, groupId, historyId];

    statement.run(params, error => {
      if (error) {
        reject(error);
      } else {
        resolve(groupId);
      }
    });

  });
}

function insertEntryHistory(statement, groupId, entry, position) {
  return new Promise((resolve, reject) => {

    const historyId = UUID.random().toString();
    const params = [historyId, groupId, entry, "", position, 0];

    statement.run(params, error => {
      if (error) {
        reject(error);
      } else {
        resolve(historyId);
      }
    });

  });
}

function insertEntry(statement, characterId, historyId) {
  return new Promise((resolve, reject) => {

    const entryId = UUID.random().toString();
    const params = [characterId, entryId, historyId];

    statement.run(params, error => {
      if (error) {
        reject(error);
      } else {
        resolve(entryId);
      }
    });

  });
}

export function registerCreateCharacterIpcChannel(ipcMain) {
  ipcMain.on(CREATE_CHARACTER, (event, payload) => {
    createCharacter()
      .then(characterId => sendCallback(event, payload, characterId))
      .catch(error => sendCallback(event, payload, error, false));
  });
}
