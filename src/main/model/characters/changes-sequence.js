import ChangeType from "../../shared/characters/change-type";
import { get, run } from "../shared/sqlite";

export function getTypeTable(type) {
  switch (type) {
    case ChangeType.CHARACTER:
      return "character";
    case ChangeType.ENTRY_GROUP:
      return "entry_group";
    case ChangeType.ENTRY:
      return "entry";
    default:
      throw new Error("Unknown type: " + type);
  }
}

export function getTypeHistoryTable(type) {
  switch (type) {
    case ChangeType.CHARACTER:
      return "character_history";
    case ChangeType.ENTRY_GROUP:
      return "entry_group_history";
    case ChangeType.ENTRY:
      return "entry_history";
    default:
      throw new Error("Unknown type: " + type);
  }
}

export const Stack = Object.freeze({
  PAST: 0,
  FUTURE: 1
});

export function getStackTop(characterId, stack) {

  const sql = " SELECT character_id AS characterId, stack, position, type, " +
              "        type_id AS typeId, history_id AS historyId          " +
              " FROM character_changes_sequence                            " +
              " WHERE character_id = ? AND stack = ? AND position = (      " +
              "   SELECT max(position)                                     " +
              "   FROM character_changes_sequence                          " +
              "   WHERE character_id = ? AND stack = ?                     " +
              " )                                                          ";
  const params = [characterId, stack, characterId, stack];

  return get(sql, params).then(row => {
    if (row) {
      return Promise.resolve(row);
    } else {
      return Promise.resolve(null);
    }
  });

}

export function removeFromStack(entry) {

  if (entry === null) {
    throw new Error("No entry to remove from stack.");
  }

  const sql = "DELETE FROM character_changes_sequence                                 " +
              "WHERE character_id = ? AND stack = ? AND position = ? AND type = ? AND " +
              "      type_id = ? AND history_id = ?                                   ";
  const params = [entry.characterId, entry.stack, entry.position, entry.type, entry.typeId,
                  entry.historyId];
  return run(sql, params);

}

export function setNewPresence(entry) {

  const lastSql   = " SELECT presence_history_id AS historyId " +
                    " FROM " + getTypeTable(entry.type)         +
                    " WHERE id = ?                            ";
  const lastParams = [entry.typeId];

  const updateSql = " UPDATE " + getTypeTable(entry.type) + " " +
                    " SET presence_history_id = ? " +
                    " WHERE id = ?";
  const updateParams = [entry.historyId, entry.typeId];

  let prevPresence = {
    characterId: entry.characterId,
    type: entry.type,
    typeId: entry.typeId
  };

  return Promise.resolve()
    .then(() => get(lastSql, lastParams))
    .then(row => { prevPresence.historyId = row.historyId; return Promise.resolve(); })
    .then(() => run(updateSql, updateParams))
    .then(() => Promise.resolve(prevPresence));

}

export function addToStack(previousPresence, stack) {

  const maxSql = " SELECT max(position) AS maxPosition  " +
                 " FROM character_changes_sequence      " +
                 " WHERE character_id = ? AND stack = ? ";
  const maxParams = [previousPresence.characterId, stack];

  const addSql = " INSERT INTO character_changes_sequence                     " +
                 " (character_id, stack, type, type_id, history_id, position) " +
                 " VALUES (?, ?, ?, ?, ?, ?)                                  ";
  const addParams = [previousPresence.characterId, stack, previousPresence.type,
                     previousPresence.typeId, previousPresence.historyId];

  return Promise.resolve()
    .then(() => get(maxSql, maxParams))
    .then(row => {

      let position;

      if (row.maxPosition === null) {
        position = 0;
      } else {
        position = row.maxPosition + 1;
      }

      addParams.push(position);
      return Promise.resolve();

    })
    .then(() => run(addSql, addParams))
    .then(() => Promise.resolve(previousPresence));

}

export function getPresenceContent(presence) {

  const sql = " SELECT h.*                                            " +
              " FROM " + getTypeTable(presence.type) + "        AS t, " +
              "      " + getTypeHistoryTable(presence.type) + " AS h  " +
              " WHERE t.id = ? AND t.presence_history_id = h.id       ";
  const params = [presence.typeId];

  return get(sql, params).then(row => {
    row.id = presence.typeId;
    return Promise.resolve(row);
  });

}
