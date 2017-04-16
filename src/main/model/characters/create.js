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

    beginTransaction()
      .then(() => run(insertHistorySql, insertHistoryParams))
      .then(() => run(insertCharacterSql, insertCharacterParams))
      .then(() => createDefaultProfile(characterId))
      .then(() => endTransaction())
      .then(() => resolve(characterId))
      .catch(error => {
        rollbackTransaction()
          .then(() => reject(error))
          .catch(() => reject(error));
      });

  });
}

const defaultProfile = [
  {
    title: "Name",
    entries: ["Namensbedeutung", "Weitere Namen"]
  },
  {
    title: "Physis",
    entries: ["Alter", "Größe", "Geschlecht", "Gewicht", "Gestalt & Körperbau", "Gesundheit",
              "Besondere körperliche Merkmale"]
  },
  {
    title: "Aussehen",
    entries: ["Gesicht", "Augen", "Haare", "Bart", "Kleidung", "Schmuck",
              "Besondere äußerliche Merkmale"]
  },
  {
    title: "Auftreten",
    entries: ["Ausstrahlung", "Körperhaltung", "Stimme", "Immer dabei"]
  },
  {
    title: "Gesellschaft",
    entries: ["Herkunft", "Sprache", "Wohnort", "Beruf", "Stand"]
  },
  {
    title: "Innere Eigenschaften",
    entries: ["Charakter", "Interessen", "Abneigungen", "Moral", "Träume & Wünsche", "Ziele",
              "Innerer Konflikt"]
  },
  {
    title: "Veränderungen",
    entries: ["Kindheit", "Jugend", "Erwachsenenalter", "Hohes Alter"]
  },
  {
    title: "Sonstiges",
    entries: ["Fähigkeiten", "Anmerkungen"]
  }
];

export function createDefaultProfile(characterId) {
  return new Promise((resolve, reject) => {

    let promises = [];

    for (let position = 0; position < defaultProfile.length; position++) {
      const group = defaultProfile[position];
      promises.push(handleGroup(characterId, group.title, group.entries, position));
    }

    Promise.all(promises)
      .then(() => resolve())
      .catch(error => reject(error));

  });
}

function handleGroup(characterId, title, entries, position) {
  return new Promise((resolve, reject) => {
    insertGroupHistory(title, entries, position)
      .then(historyId => insertGroup(characterId, historyId))
      .then(groupId => handleEntries(characterId, groupId, entries))
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

function insertGroupHistory(title, entries, position) {
  return new Promise((resolve, reject) => {

    const historyId = UUID.random().toString();

    const sql = " INSERT INTO entry_group_history " +
                " (id, title, position, deleted)  " +
                " VALUES (?, ?, ?, ?)             ";
    const params = [historyId, title, position, 0];

    getConnection().run(sql, params, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(historyId);
      }
    });

  });
}

function insertGroup(characterId, historyId) {
  return new Promise((resolve, reject) => {

    const id = UUID.random().toString();

    const sql = " INSERT INTO entry_group                 " +
                " (character_id, id, presence_history_id) " +
                " VALUES (?, ?, ?)                        ";
    const params = [characterId, id, historyId];

    getConnection().run(sql, params, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(id);
      }
    });

  });
}

function handleEntries(characterId, groupId, entries) {
  return new Promise((resolve, reject) => {

    let promises = [];

    for (let position = 0; position < entries.length; position++) {
      const title = entries[position];
      promises.push(handleEntry(characterId, groupId, title, position));
    }

    Promise.all(promises)
      .then(() => resolve())
      .catch(error => reject(error));

  });
}

function handleEntry(characterId, groupId, title, position) {
  return new Promise((resolve, reject) => {
    insertEntryHistory(groupId, title, position)
      .then(historyId => insertEntry(characterId, historyId))
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

function insertEntryHistory(groupId, title, position) {
  return new Promise((resolve, reject) => {

    const historyId = UUID.random().toString();

    const sql = " INSERT INTO entry_history                       " +
                " (id, group_id, title, value, position, deleted) " +
                " VALUES (?, ?, ?, ?, ?, ?)                       ";
    const params = [historyId, groupId, title, "", position, 0];

    getConnection().run(sql, params, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(historyId);
      }
    });

  });
}

function insertEntry(characterId, historyId) {
  return new Promise((resolve, reject) => {

    const id = UUID.random().toString();

    const sql = " INSERT INTO entry                       " +
                " (character_id, id, presence_history_id) " +
                " VALUES (?, ?, ?)                        ";
    const params = [characterId, id, historyId];

    getConnection().run(sql, params, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
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
