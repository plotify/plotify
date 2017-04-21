import { sendCallback } from "../../shared/commons/ipc";
import { FIND_CHARACTERS } from "../../shared/characters/ipc-channels";
import { all } from "../shared/sqlite";

export function registerFindCharactersIpcChannel(ipcMain) {
  ipcMain.on(FIND_CHARACTERS, (event, payload) => {
    findCharacters(payload.args.deleted, payload.args.filter)
      .then(characters => sendCallback(event, payload, characters))
      .catch(error => sendCallback(event, payload, error, false));
  });
}

export function findCharacters(deleted, filter = undefined) {

  if (typeof deleted !== "boolean") {
    return Promise.reject(
      new TypeError("No deleted flag was passed as a boolean: " + deleted));
  }

  if (filter && typeof filter !== "string") {
    return Promise.reject(new TypeError("Filter is not a string: " + filter));
  }

  const sql = "SELECT c.id AS id, h.name AS name, h.deleted AS deleted " +
              "FROM character_history AS h, character AS c " +
              "WHERE c.presence_history_id = h.id AND h.deleted = ?;";
  const params = [deleted ? 1 : 0];

  return all(sql, params).then(rows => {

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

    return Promise.resolve(result);

  });

}
