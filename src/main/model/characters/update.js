import UUID from "../../shared/commons/uuid";
import { sendCallback } from "../../shared/commons/ipc";
import { UPDATE_CHARACTER } from "../../shared/characters/ipc-channels";
import { getConnection } from "../stories/connection";

export function updateCharacter(id, name, deleted) {
  return new Promise((resolve, reject) => {

    const db = getConnection();

    const historyId = UUID.random().toString();

    db.run("INSERT INTO character_history (id, name, deleted) VALUES (?, ?, ?)",
      [historyId, name, deleted ? 1 : 0], (error) => {

      if (error) {
        reject(error);
        return;
      }

      db.run("UPDATE character SET presence_history_id = ? WHERE id = ?",
        [historyId, id], (error) => {

        if (error) {
          reject(error);
        } else {
          resolve();
        }

      });

    });

  });
}

export function registerUpdateCharacterIpcChannel(ipcMain) {
  ipcMain.on(UPDATE_CHARACTER, (event, payload) => {
    updateCharacter(
      payload.args.id,
      payload.args.name,
      payload.args.deleted
    ).then(() => sendCallback(event, payload))
     .catch(error => sendCallback(event, payload, error, false));
  });
}
