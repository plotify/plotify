import { getConnection } from "../stories/connection";
import { run, get, all, prepare } from "../shared/sqlite";
import { getTypeTable, Stack } from "./changes-sequence";
import { isValidChangeType } from "../../shared/characters/change-type";

export default function addChange(typeId, characterId, type, newHistoryId) {
  return Promise.resolve()
    .then(() => validateParameters(typeId, characterId, type, newHistoryId))
    .then(() => getPrevHistoryId(typeId, characterId, type, newHistoryId))
    .then(prevHistoryId => updatePresenceHistoryId(typeId, type, newHistoryId, prevHistoryId))
    .then(prevHistoryId => handleFutureStack(typeId, characterId, type, prevHistoryId));
}

function validateParameters(typeId, characterId, type, newHistoryId) {

  if (typeof typeId !== "string") {
    return Promise.reject(new TypeError("No type id was passed as a string: " + typeId));
  }

  if (typeof characterId !== "string") {
    return Promise.reject(new TypeError("No character id was passed as a string: " + characterId));
  }

  if (!isValidChangeType(type)) {
    return Promise.reject(new TypeError("No valid type was passed: " + type));
  }

  if (typeof newHistoryId !== "string") {
    return Promise.reject(new TypeError("No history id was passed as a string: " + newHistoryId));
  }

  return Promise.resolve();

}

function getPrevHistoryId(id, characterId, type, newHistoryId, resolve, reject) {
  const sql = " SELECT presence_history_id as prevHistoryId " +
              " FROM " + getTypeTable(type) + "             " +
              " WHERE id = ?                                ";
  const params = [id];
  return get(sql, params).then(row => Promise.resolve(row.prevHistoryId));
}

function updatePresenceHistoryId(id, type, newHistoryId, prevHistoryId) {
  const sql = " UPDATE " + getTypeTable(type) + " " +
              " SET presence_history_id = ?       " +
              " WHERE id = ?                      ";
  const params = [newHistoryId, id];
  return run(sql, params).then(() => Promise.resolve(prevHistoryId));
}

function handleFutureStack(id, characterId, type, prevHistoryId) {

  const sql = " SELECT character_id AS characterId, stack, position, type, " +
              "        type_id AS typeId, history_id AS historyId          " +
              " FROM character_changes_sequence                            " +
              " WHERE characterId = ? AND stack = ?                        " +
              " ORDER BY position ASC                                      ";
  const params = [characterId, Stack.FUTURE];

  return all(sql, params).then(rows => {
     if (rows.length === 0) {
       return handleEmptyFuture(id, characterId, type, prevHistoryId);
     } else {
       return handleFuture(id, characterId, type, prevHistoryId, rows);
     }
  });

}

function handleEmptyFuture(id, characterId, type, prevHistoryId) {
  return Promise.resolve()
    .then(() => getPastStackNextPosition(characterId))
    .then(nextPosition => addToPast(id, characterId, type, prevHistoryId, nextPosition));
}

function getPastStackNextPosition(characterId) {

  const sql = " SELECT max(position) AS maxPosition  " +
              " FROM character_changes_sequence      " +
              " WHERE character_id = ? AND stack = ? ";
  const params = [characterId, Stack.PAST];

  return get(sql, params).then(row => {

    let position;

    if (row.maxPosition === null) {
      position = 0;
    } else {
      position = row.maxPosition + 1;
    }

    return Promise.resolve(position);

  });

}

function addToPast(id, characterId, type, prevHistoryId, position) {
  const sql = " INSERT INTO character_changes_sequence                     " +
              " (position, character_id, type, type_id, history_id, stack) " +
              " VALUES (?, ?, ?, ?, ?, ?)                                  ";
  const params = [position, characterId, type, id, prevHistoryId, Stack.PAST];
  return run(sql, params);
}

function handleFuture(id, characterId, type, prevHistoryId, futureStack, resolve, reject) {
  return Promise.resolve()
    .then(() => getNextPastPosition(characterId))
    .then(nextPosition => addPrevPresenceToPast(id, characterId, type, prevHistoryId, nextPosition))
    .then(nextPosition => addTopToBottomFutureToPast(futureStack, nextPosition))
    .then(nextPosition => addSecondFromBottomToTopFutureToPast(futureStack, nextPosition))
    .then(nextPosition => addPrevPresenceToPast(id, characterId, type, prevHistoryId, nextPosition))
    .then(() => deleteFutureStack(characterId));
}

function getNextPastPosition(characterId) {

  const sql = " SELECT max(position) AS maxPosition  " +
              " FROM character_changes_sequence      " +
              " WHERE character_id = ? AND stack = ? ";
  const params = [characterId, Stack.PAST];

  return get(sql, params).then(row => {

    let position;

    if (row.maxPosition === null) {
      position = 0;
    } else {
      position = row.maxPosition + 1;
    }

    return Promise.resolve(position);

  });

}

function addPrevPresenceToPast(id, characterId, type, prevHistoryId, position) {
  const sql = " INSERT INTO character_changes_sequence                    " +
              " (character_id, stack, position, type, type_id, history_id) " +
              " VALUES (?, ?, ?, ?, ?, ?)";
  const params = [characterId, Stack.PAST, position, type, id, prevHistoryId];
  return run(sql, params).then(() => Promise.resolve(position + 1));
}

function addTopToBottomFutureToPast(futureStack, position) {

  const sql = " INSERT INTO character_changes_sequence                    " +
              " (character_id, stack, position, type, type_id, history_id) " +
              " VALUES (?, ?, ?, ?, ?, ?)";

  const length = futureStack.length;
  let nextPosition = position;

  return prepare(sql).then(statement => new Promise((resolve, reject) => {
    getConnection().serialize(() => {

      const runCallback = (error) => {
        reject(error);
      };

      for (let index = length - 1; index >= 0; index--) {
        const row = futureStack[index];
        const params = [row.characterId, Stack.PAST, nextPosition, row.type, row.typeId,
                        row.historyId];
        statement.run(params, runCallback);
        nextPosition++;
      }

      resolve(statement);

    });
  }))
  .then(statement => {
    statement.finalize();
    return Promise.resolve(nextPosition);
  });

}

function addSecondFromBottomToTopFutureToPast(futureStack, position) {

  const sql = " INSERT INTO character_changes_sequence                     " +
              " (character_id, stack, position, type, type_id, history_id) " +
              " VALUES (?, ?, ?, ?, ?, ?)                                  ";

  const length = futureStack.length;
  let nextPosition = position;

  if (length === 1) {
    return Promise.resolve(nextPosition);
  }

  return prepare(sql).then(statement => new Promise((resolve, reject) => {
      getConnection().serialize(() => {

        const runCallback = (error) => {
          reject(error);
        };

        for (let index = 1; index < length; index++) {
          const row = futureStack[index];
          const params = [row.characterId, Stack.PAST, nextPosition, row.type, row.typeId,
                          row.historyId];
          statement.run(params, runCallback);
          nextPosition++;
        }

        resolve();

      });
    }))
    .then(statement => {
      statement.finalize();
      return Promise.resolve(nextPosition);
    });

}

function deleteFutureStack(characterId) {
  const sql = " DELETE FROM character_changes_sequence " +
              " WHERE character_id = ? AND stack = ?   ";
  const params = [characterId, Stack.FUTURE];
  return run(sql, params);
}
