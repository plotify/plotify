import { getConnection } from "../stories/connection";

export const Type = Object.freeze({
  CHARACTER: 0,
  ENTRY_GROUP: 1,
  ENTRY: 2
});

function getTypeTable(type) {
  switch (type) {
    case Type.CHARACTER:
      return "character";
    case Type.ENTRY_GROUP:
      return "entry_group";
    case Type.ENTRY:
      return "entry";
    default:
      throw new Error("Unknown type.");
  }
}

const Queue = Object.freeze({
  PAST: 0,
  FUTURE: 1
});

export function addChange(id, characterId, type, newHistoryId) {
  return new Promise((resolve, reject) => {
    getPrevHistoryId(id, characterId, type, newHistoryId, resolve, reject);
  });
}

function getPrevHistoryId(id, characterId, type, newHistoryId, resolve, reject) {

  const sql = "SELECT presence_history_id as prevHistoryId " +
              "FROM " + getTypeTable(type) + " " +
              "WHERE id = ?;";

  getConnection().get(sql, [id], (error, row) => {

    if (error) {
      reject(error);
      return;
    }

    console.log("prevHistoryId: " + row.prevHistoryId);

    const prevHistoryId = row.prevHistoryId;
    updatePresenceHistoryId(id, characterId, type, newHistoryId, prevHistoryId, resolve, reject);

  });

}

function updatePresenceHistoryId(id, characterId, type, newHistoryId, prevHistoryId,
                                 resolve, reject) {

  const sql = "UPDATE " + getTypeTable(type) + " " +
              "SET presence_history_id = ? " +
              "WHERE id = ?;";

  getConnection().run(sql, [newHistoryId, id], (error) => {

    if (error) {
      reject(error);
      return;
    }

    console.log("presence_history_id updated.");

    handleFutureQueue(characterId, type, prevHistoryId, resolve, reject);

  });

}

function handleFutureQueue(characterId, type, prevHistoryId, resolve, reject) {

  const sql = "SELECT position, history_id " +
              "FROM character_changes_sequence " +
              "WHERE character_id = ? AND queue = ?;";

  getConnection().all(sql, [characterId, Queue.FUTURE], (error, rows) => {

    if (error) {
      reject(error);
      return;
    }

    console.log("Future queue: " + rows.length);

    if (rows.length === 0) {
      handleNoFuture(characterId, type, prevHistoryId, resolve, reject);
    } else {
      // TODO Implementieren
    }

  });

}

function handleNoFuture(characterId, type, prevHistoryId, resolve, reject) {

  const sql = "SELECT max(position) AS maxPosition " +
              "FROM character_changes_sequence " +
              "WHERE character_id = ? AND queue = ?;";

  getConnection().get(sql, [characterId, Queue.PAST], (error, row) => {

    if (error) {
      reject(error);
      return;
    }

    let maxPosition = row.maxPosition;
    let position;

    console.log("max position: " + maxPosition);

    if (maxPosition === null) {
      position = 0;
    } else {
      position = maxPosition + 1;
    }

    console.log("next position: " + position);

    addToPast(position, characterId, type, prevHistoryId, resolve, reject);

  });

}

function addToPast(position, characterId, type, prevHistoryId, resolve, reject) {

  const sql = "INSERT INTO character_changes_sequence " +
              "(position, character_id, type, history_id, queue) " +
              "VALUES (?, ?, ?, ?, ?);";

  getConnection().run(sql, [position, characterId, type, prevHistoryId, Queue.PAST], (error) => {
    if (error) {
      console.log(error.message);
      reject(error);
    } else {
      console.log("Change added.");
      resolve();
    }
  });

}
