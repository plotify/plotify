import { getConnection } from "../stories/connection";
import ChangeType from "../../shared/characters/change-type";
import { getTypeTable, getTypeHistoryTable, Queue } from "./changes-sequence";

import { sendCallback } from "../../shared/commons/ipc";
import {
  CAN_REDO_CHARACTER_CHANGE,
  REDO_CHARACTER_CHANGE
} from "../../shared/characters/ipc-channels";

export function canRedoCharacterChange(id) {
  return new Promise((resolve, reject) => {

    if (!id) {
      throw new Error("No character id was passed.");
    }

    getFutureStackTop(id)
      .then(entry => resolve(entry !== null))
      .catch(error => reject(error));

  });
}

export function redoCharacterChange(id) {
  return new Promise((resolve, reject) => {

    if (!id) {
      throw new Error("No character id was passed.");
    }

    // TODO Implementieren
    throw new Error("Unsupported operation.");

  });
}

function getFutureStackTop(characterId) {
  return new Promise((resolve, reject) => {

    const sql = " SELECT character_id AS characterId, queue, position, type, " +
                "        type_id AS typeId, history_id AS historyId          " +
                " FROM character_changes_sequence                            " +
                " WHERE character_id = ? AND queue = ? AND position = (      " +
                "   SELECT max(position)                                     " +
                "   FROM character_changes_sequence                          " +
                "   WHERE character_id = ?                                   " +
                " )                                                          ";

    getConnection().get(sql, [characterId, Queue.FUTURE, characterId], (error, row) => {

      if (error) {
        reject(error);
      } else if (row) {
        resolve(row);
      } else {
        resolve(null);
      }
    });

  });
}

export function registerRedoCharacterChangeIpcChannels(ipcMain) {
  ipcMain.on(CAN_REDO_CHARACTER_CHANGE, (event, payload) => {
    canRedoCharacterChange(payload.args)
      .then(canUndo => sendCallback(event, payload, canUndo))
      .catch(error => sendCallback(event, payload, error, false));
  });
  ipcMain.on(REDO_CHARACTER_CHANGE, (event, payload) => {
    redoCharacterChange(payload.args)
      .then(content => sendCallback(event, payload, content))
     .catch(error => sendCallback(event, payload, error, false));
  });
}
