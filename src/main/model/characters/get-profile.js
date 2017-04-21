import { sendCallback } from "../../shared/commons/ipc";
import { GET_CHARACTER_PROFILE } from "../../shared/characters/ipc-channels";
import { all } from "../shared/sqlite";

export function registerGetCharacterProfileIpcChannel(ipcMain) {
  ipcMain.on(GET_CHARACTER_PROFILE, (event, payload) => {
    getCharacterProfile(payload.args)
      .then(profile => sendCallback(event, payload, profile))
      .catch(error => sendCallback(event, payload, error, false));
  });
}

export function getCharacterProfile(characterId) {

  if (typeof characterId !== "string") {
    return Promise.reject(new TypeError("No character id was passed as a string: " + characterId));
  }

  const sql = " SELECT g.id, h.title, h.deleted                           " +
              " FROM entry_group AS g, entry_group_history AS h           " +
              " WHERE g.character_id = ? AND g.presence_history_id = h.id " +
              " ORDER BY h.position ASC                                   ";
  const params = [characterId];

  return all(sql, params).then(rows => {

    let promises = [];

    rows.forEach(row => {
      promises.push(getGroupWithEntries(characterId, row));
    });

    return Promise.all(promises);

  });

}

function getGroupWithEntries(characterId, groupRow) {

  const sql = " SELECT e.id, h.title, h.value, h.deleted                      " +
              " FROM entry AS e, entry_history AS h                           " +
              " WHERE e.character_id = ? AND e.presence_history_id = h.id AND " +
              "       h.group_id = ?                                          " +
              " ORDER BY h.position ASC                                       ";
  const params = [characterId, groupRow.id];

  return all(sql, params).then(rows => {

    let entries = [];

    rows.forEach(row => {
      const entry = {
        id: row.id,
        title: row.title,
        value: row.value,
        deleted: row.deleted
      };
      entries.push(entry);
    });

    const group = {
      id : groupRow.id,
      title: groupRow.title,
      deleted: groupRow.deleted,
      entries: entries
    };

    return Promise.resolve(group);

  });

}
