import UUID from "../../shared/commons/uuid";
import { sendCallback } from "../../shared/commons/ipc";
import { UPDATE_CHARACTER } from "../../shared/characters/ipc-channels";
import { getConnection } from "../stories/connection";
import { addChange, Type } from "./add-change";

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

      addChange(id, id, Type.CHARACTER, historyId)
        .then(() => resolve(id))
        .catch(error => reject(error));

    });

  });
}

export function registerUpdateCharacterIpcChannel(ipcMain) {
  ipcMain.on(UPDATE_CHARACTER, (event, payload) => {
    updateCharacter(
      payload.args.id,
      payload.args.name,
      payload.args.deleted
    ).then((id) => sendCallback(event, payload, id))
     .catch(error => sendCallback(event, payload, error, false));
  });
}
