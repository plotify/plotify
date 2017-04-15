import { sendCallback } from "../../shared/commons/ipc";
import { GET_CHARACTER_PROFILE } from "../../shared/characters/ipc-channels";
import { getConnection } from "../stories/connection";

export function getCharacterProfile(characterId) {
  return new Promise((resolve, reject) => {

    const db = getConnection();

    const groupsSql = " SELECT g.id, h.title, h.deleted                           " +
                      " FROM entry_group AS g, entry_group_history AS h           " +
                      " WHERE g.character_id = ? AND g.presence_history_id = h.id " +
                      " ORDER BY h.position ASC                                   ";
    const groupsParams = [characterId];

    db.all(groupsSql, groupsParams, (error, rows) => {

      if (error) {
        reject(error);
        return;
      }

      let promises = [];

      rows.forEach(row => {
        promises.push(getGroupWithEntries(characterId, row));
      });

      Promise.all(promises)
        .then(groups => resolve(groups))
        .catch(error => reject(error));

    });

  });
}

function getGroupWithEntries(characterId, groupRow) {
  return new Promise((resolve, reject) => {

    const db = getConnection();

    const entriesSql = " SELECT h.id, h.title, h.value, h.deleted                      " +
                       " FROM entry AS e, entry_history AS h                           " +
                       " WHERE e.character_id = ? AND e.presence_history_id = h.id AND " +
                       "       h.group_id = ?                                          " +
                       " ORDER BY h.position ASC                                       ";
    const entriesParams = [characterId, groupRow.id];

    db.all(entriesSql, entriesParams, (error, rows) => {

      if (error) {
        reject(error);
        return;
      }

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
      resolve(group);

    });

  });
}

export function registerGetCharacterProfileIpcChannel(ipcMain) {
  ipcMain.on(GET_CHARACTER_PROFILE, (event, payload) => {
    getCharacterProfile(payload.args)
      .then(profile => sendCallback(event, payload, profile))
      .catch(error => sendCallback(event, payload, error, false));
  });
}
