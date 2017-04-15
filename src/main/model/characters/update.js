import UUID from "../../shared/commons/uuid";
import { sendCallback } from "../../shared/commons/ipc";
import { UPDATE_CHARACTER } from "../../shared/characters/ipc-channels";
import ChangeType from "../../shared/characters/change-type";
import { getTypeTable, getTypeHistoryTable } from "./changes-sequence";
import { getConnection } from "../stories/connection";
import { addChange } from "./add-change";

export function updateCharacter(characterId, type, typeId, changes) {
  return new Promise((resolve, reject) => {
    getPresenceHistoryEntry(type, typeId)
      .then(presenceHistoryEntry => addNewHistoryEntry(presenceHistoryEntry, type, changes))
      .then(newHistoryId => addChange(typeId, characterId, type, newHistoryId))
      .then(() => resolve(typeId))
      .catch(error => reject(error));
  });
}

function getPresenceHistoryEntry(type, typeId) {
  return new Promise((resolve, reject) => {

    const sql = " SELECT h.*                                                                   " +
                " FROM " + getTypeTable(type) + " AS t, " + getTypeHistoryTable(type) + " AS h " +
                " WHERE t.id = ? AND t.presence_history_id = h.id                              ";
    const params = [typeId];

    getConnection().get(sql, params, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });

  });
}

function addNewHistoryEntry(presenceHistoryEntry, type, changes) {
  return new Promise((resolve, reject) => {

    const historyId = UUID.random().toString();
    const mergedChanges = Object.assign({}, presenceHistoryEntry, changes, { id: historyId });

    const db = getConnection();

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

    db.run(sql, params, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(historyId);
      }
    });

  });
}

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
