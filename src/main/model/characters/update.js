import { sendCallback } from "../../shared/commons/ipc";
import { UPDATE_CHARACTER } from "../../shared/characters/ipc-channels";
import { beginTransaction, endTransaction, rollbackTransaction, get, run } from "../shared/sqlite";
import { getTypeTable, getTypeHistoryTable } from "./changes-sequence";

import UUID from "../../shared/commons/uuid";
import addChange from "./add-change";

export function registerUpdateCharacterIpcChannel(ipcMain) {
  ipcMain.on(UPDATE_CHARACTER, (event, payload) => {
    updateCharacter(
      payload.args.characterId,
      payload.args.type,
      payload.args.typeId,
      payload.args.changes
    ).then((id) => sendCallback(event, payload, id))
     .catch(error => sendCallback(event, payload, error, false));
  });
}

export function updateCharacter(characterId, type, typeId, changes) {

  if (typeof characterId !== "string") {
    return Promise.reject(new TypeError());
  }

  return Promise.resolve()
    .then(() => beginTransaction())
    .then(() => getPresenceHistoryEntry(type, typeId))
    .then(presenceHistoryEntry => addNewHistoryEntry(presenceHistoryEntry, type, changes))
    .then(newHistoryId => addChange(typeId, characterId, type, newHistoryId))
    .then(() => endTransaction(typeId))
    .catch(error => {
      console.log("Failed to update character: ", error);
      return rollbackTransaction(error);
    });

}

function getPresenceHistoryEntry(type, typeId) {
  const sql = " SELECT h.*                                                                   " +
              " FROM " + getTypeTable(type) + " AS t, " + getTypeHistoryTable(type) + " AS h " +
              " WHERE t.id = ? AND t.presence_history_id = h.id                              ";
  const params = [typeId];
  return get(sql, params);
}

function addNewHistoryEntry(presenceHistoryEntry, type, changes) {

  const historyId = UUID.random().toString();
  const mergedChanges = Object.assign({}, presenceHistoryEntry, changes, { id: historyId });

  let sql = " INSERT INTO " + getTypeHistoryTable(type) + " (";
  let valuesSql = "";
  let params = [];

  for (let property in mergedChanges) {
    if (mergedChanges.hasOwnProperty(property)) {

      sql += property + ", ";
      valuesSql += "?, ";

      if (typeof(mergedChanges[property]) !== "boolean"){
        params.push(mergedChanges[property]);
      } else {
        params.push(mergedChanges[property] ? 1 : 0);
      }

    }
  }

  valuesSql = valuesSql.slice(0, -2);
  sql = sql.slice(0, -2) + ") VALUES (" + valuesSql + ")";

  return run(sql, params).then(() => Promise.resolve(historyId));

}
