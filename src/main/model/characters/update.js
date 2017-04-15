import UUID from "../../shared/commons/uuid";
import { sendCallback } from "../../shared/commons/ipc";
import { UPDATE_CHARACTER } from "../../shared/characters/ipc-channels";
import ChangeType from "../../shared/characters/change-type";
import { getTypeTable, getTypeHistoryTable } from "./changes-sequence";
import { getConnection } from "../stories/connection";
import { addChange } from "./add-change";

export function updateCharacter(characterId, type, typeId, changes) {
  return new Promise((resolve, reject) => {

    const db = getConnection();

    const historyId = UUID.random().toString();

    let sql = " INSERT INTO " + getTypeHistoryTable(type) + " (id, ";
    let valuesSql = "?, ";
    let params = [historyId];

    for (let property in changes) {
      if (changes.hasOwnProperty(property)) {
        sql += property + ", ";
        valuesSql += "?, ";

        if (typeof(changes[property]) !== "boolean"){
          params.push(changes[property]);
        } else {
          params.push(changes[property] ? 1 : 0);
        }

      }
    }

    valuesSql = valuesSql.slice(0, -2);
    sql = sql.slice(0, -2) + ") VALUES (" + valuesSql + ")";

    db.run(sql, params, (err) => {

      if (err) {
        reject(err);
        return;
      }

      addChange(typeId, characterId, type, historyId)
        .then(() => resolve(typeId))
        .catch(error => reject(error));

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
