import { sendCallback } from "../../shared/commons/ipc";
import { FIND_CHARACTERS } from "../../shared/characters/ipc-channels";
import { getConnection } from "../stories/connection";

export function findCharacters(deleted, filter = undefined) {
  return new Promise((resolve, reject) => {

    const db = getConnection();
    const sql = "SELECT c.id AS id, h.name AS name, h.deleted AS deleted " +
                "FROM character_history AS h, character AS c " +
                "WHERE c.presence_history_id = h.id AND h.deleted = ?;";

    db.all(sql, [deleted ? 1 : 0], (error, rows) => {

      if (error) {
        reject(error);
        return;
      }

      let result = rows.map(row => { return {
        id: row.id,
        name: row.name,
        deleted: row.deleted
      };});

      if (filter) {
        filter = filter.toLowerCase();
        result = result.filter(character => {
          return character.name.toLowerCase().includes(filter);
        });
      }

      resolve(result);

    });

  });
}

export function registerFindCharactersIpcChannel(ipcMain) {
  ipcMain.on(FIND_CHARACTERS, (event, payload) => {
    findCharacters(payload.args.deleted, payload.args.filter)
      .then(characters => sendCallback(event, payload, characters))
      .catch(error => sendCallback(event, payload, error, false));
  });
}
