import UUID from "../../shared/commons/uuid";
import { sendCallback } from "../../shared/commons/ipc";
import { CREATE_CHARACTER } from "../../shared/characters/ipc-channels";
import { getConnection } from "../stories/connection";

export function createCharacter() {
  return new Promise((resolve, reject) => {

    const db = getConnection();

    const characterId = UUID.random().toString();
    const historyId = UUID.random().toString();
    
    db.run("INSERT INTO character_history (id, name, deleted) VALUES (?, ?, ?)",
      [historyId, "", 0], (error) => {

      if (error) {
        reject(error);
        return;
      }

      db.run("INSERT INTO character (id, presence_history_id) VALUES (?, ?)",
        [characterId, historyId], (error) => {

          if (error) {
            reject(error);
          } else {
            resolve(characterId);
          }

        });

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
