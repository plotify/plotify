import { getConnection } from "../stories/connection";
import { getTypeTable, getTypeHistoryTable } from "./changes-sequence";

export function getStackTop(characterId, stack) {
  return new Promise((resolve, reject) => {

    const sql = " SELECT character_id AS characterId, queue, position, type, " +
                "        type_id AS typeId, history_id AS historyId          " +
                " FROM character_changes_sequence                            " +
                " WHERE character_id = ? AND queue = ? AND position = (      " +
                "   SELECT max(position)                                     " +
                "   FROM character_changes_sequence                          " +
                "   WHERE character_id = ? AND queue = ?                     " +
                " )                                                          ";

    getConnection().get(sql, [characterId, stack, characterId, stack], (error, row) => {

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

export function removeFromStack(entry) {
  return new Promise((resolve, reject) => {

    if (entry === null) {
      throw new Error("No entry to remove from stack.");
    }

    const sql = "DELETE FROM character_changes_sequence                                 " +
                "WHERE character_id = ? AND queue = ? AND position = ? AND type = ? AND " +
                "      type_id = ? AND history_id = ?                                   ";
    const params = [entry.characterId, entry.queue, entry.position, entry.type, entry.typeId,
                    entry.historyId];

    getConnection().run(sql, params, (error, row) => {

      if (error) {
        reject(error);
      } else {
        resolve();
      }

    });

  });
}

export function setNewPresence(entry) {
  return new Promise((resolve, reject) => {

    const db = getConnection();

    const lastSql   = " SELECT presence_history_id AS historyId " +
                      " FROM " + getTypeTable(entry.type)         +
                      " WHERE id = ?                            ";

    const updateSql = " UPDATE " + getTypeTable(entry.type) + " " +
                      " SET presence_history_id = ? " +
                      " WHERE id = ?";

    db.get(lastSql, [entry.typeId], (error, row) => {

      if (error) {
        reject(error);
        return;
      }

      const prevPresence = {
        characterId: entry.characterId,
        historyId: row.historyId,
        type: entry.type,
        typeId: entry.typeId
      };

      db.run(updateSql, [entry.historyId, entry.typeId], (error) => {

        if (error) {
          reject(error);
        } else {
          resolve(prevPresence);
        }
      });

    });

  });
}

export function addToStack(previousPresence, stack) {
  return new Promise((resolve, reject) => {

    const db = getConnection();

    const maxSql = " SELECT max(position) AS maxPosition  " +
                   " FROM character_changes_sequence      " +
                   " WHERE character_id = ? AND queue = ? ";

    const addSql = " INSERT INTO character_changes_sequence                     " +
                   " (character_id, queue, type, type_id, history_id, position) " +
                   " VALUES (?, ?, ?, ?, ?, ?)                                  ";

    db.get(maxSql, [previousPresence.characterId, stack], (error, row) => {

      if (error) {
        reject(error);
        return;
      }

      let position;

      if (row.maxPosition === null) {
        position = 0;
      } else {
        position = row.maxPosition + 1;
      }

      const params = [previousPresence.characterId, stack, previousPresence.type,
                      previousPresence.typeId, previousPresence.historyId, position];

      db.run(addSql, params, (error) => {

        if (error) {
          reject(error);
        } else {
          resolve(previousPresence);
        }
      });

    });

  });
}

export function getPresenceContent(presence) {
  return new Promise((resolve, reject) => {

    const sql = " SELECT h.*                                            " +
                " FROM " + getTypeTable(presence.type) + "        AS t, " +
                "      " + getTypeHistoryTable(presence.type) + " AS h  " +
                " WHERE t.id = ? AND t.presence_history_id = h.id       ";

    getConnection().get(sql, [presence.typeId], (error, row) => {

      if (error) {
        reject(error);
        return;
      }

      const content = row;
      row.id = presence.typeId;
      resolve(content);

    });

  });
}
