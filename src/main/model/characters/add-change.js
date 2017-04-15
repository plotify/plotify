import { getConnection } from "../stories/connection";
import { run, get, all, prepare } from "../shared/sqlite";
import ChangeType from "../../shared/characters/change-type";
import { getTypeTable, Stack } from "./changes-sequence";

export function addChange(id, characterId, type, newHistoryId) {
  return new Promise((resolve, reject) => {
    getPrevHistoryId(id, characterId, type, newHistoryId, resolve, reject);
  });
}

function getPrevHistoryId(id, characterId, type, newHistoryId, resolve, reject) {

  const sql = " SELECT presence_history_id as prevHistoryId " +
              " FROM " + getTypeTable(type) + "             " +
              " WHERE id = ?                                ";

  getConnection().get(sql, [id], (error, row) => {

    if (error) {
      reject(error);
      return;
    }

    const prevHistoryId = row.prevHistoryId;
    updatePresenceHistoryId(id, characterId, type, newHistoryId, prevHistoryId, resolve, reject);

  });

}

function updatePresenceHistoryId(id, characterId, type, newHistoryId, prevHistoryId,
                                 resolve, reject) {

  const sql = " UPDATE " + getTypeTable(type) + " " +
              " SET presence_history_id = ?       " +
              " WHERE id = ?                      ";

  getConnection().run(sql, [newHistoryId, id], (error) => {

    if (error) {
      reject(error);
      return;
    }

    handleFutureStack(id, characterId, type, prevHistoryId, resolve, reject);

  });

}

function handleFutureStack(id, characterId, type, prevHistoryId, resolve, reject) {

  const sql = " SELECT character_id AS characterId, stack, position, type, " +
              "        type_id AS typeId, history_id AS historyId          " +
              " FROM character_changes_sequence                            " +
              " WHERE characterId = ? AND stack = ?                        " +
              " ORDER BY position ASC                                      ";
  const params = [characterId, Stack.FUTURE];

  getConnection().all(sql, params, (error, rows) => {

    if (error) {
      reject(error);
      return;
    }

    if (rows.length === 0) {
      handleNoFuture(id, characterId, type, prevHistoryId, resolve, reject);
    } else {
      handleFuture(id, characterId, type, prevHistoryId, rows, resolve, reject);
    }

  });

}

function handleNoFuture(id, characterId, type, prevHistoryId, resolve, reject) {

  const sql = " SELECT max(position) AS maxPosition  " +
              " FROM character_changes_sequence      " +
              " WHERE character_id = ? AND stack = ? ";

  getConnection().get(sql, [characterId, Stack.PAST], (error, row) => {

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

    addToPast(id, position, characterId, type, prevHistoryId, resolve, reject);

  });

}

function addToPast(id, position, characterId, type, prevHistoryId, resolve, reject) {

  const sql = " INSERT INTO character_changes_sequence                     " +
              " (position, character_id, type, type_id, history_id, stack) " +
              " VALUES (?, ?, ?, ?, ?, ?)                                  ";
  const params = [position, characterId, type, id, prevHistoryId, Stack.PAST];

  getConnection().run(sql, params, (error) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

}

function handleFuture(id, characterId, type, prevHistoryId, futureStack, resolve, reject) {

  getNextPastPosition(characterId)
    .then(nextPosition => addPrevPresenceToPast(id, characterId, type, prevHistoryId, nextPosition))
    .then(nextPosition => addTopToBottomFutureToPast(futureStack, nextPosition))
    .then(nextPosition => addSecondFromBottomToTopFutureToPast(futureStack, nextPosition))
    .then(nextPosition => addPrevPresenceToPast(id, characterId, type, prevHistoryId, nextPosition))
    .then(() => deleteFutureStack(characterId))
    .then(() => resolve())
    .catch(error => { console.log(error); reject(error); });
}

function getNextPastPosition(characterId) {
  return new Promise((resolve, reject) => {

    const sql = " SELECT max(position) AS maxPosition  " +
                " FROM character_changes_sequence      " +
                " WHERE character_id = ? AND stack = ? ";
    const params = [characterId, Stack.PAST];

    get(sql, params).then(row => {

      let position;

      if (row.maxPosition === null) {
        position = 0;
      } else {
        position = row.maxPosition + 1;
      }

      resolve(position);

    }).catch (error => reject(error));

  });
}

function addPrevPresenceToPast(id, characterId, type, prevHistoryId, position) {
  return new Promise((resolve, reject) => {

    const sql = " INSERT INTO character_changes_sequence                    " +
                " (character_id, stack, position, type, type_id, history_id) " +
                " VALUES (?, ?, ?, ?, ?, ?)";
    const params = [characterId, Stack.PAST, position, type, id, prevHistoryId];

    run(sql, params)
      .then(() => resolve(position + 1))
      .catch(error => reject(error));

  });
}

function addTopToBottomFutureToPast(futureStack, position) {
  return new Promise((resolve, reject) => {

    const sql = " INSERT INTO character_changes_sequence                    " +
                " (character_id, stack, position, type, type_id, history_id) " +
                " VALUES (?, ?, ?, ?, ?, ?)";

    const length = futureStack.length;
    let nextPosition = position;

    prepare(sql)
      .then(statement => new Promise((resolve, reject) => {
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

          resolve();

        });
      }))
      .then(() => resolve(nextPosition))
      .catch(error => reject(error));

  });

}

function addSecondFromBottomToTopFutureToPast(futureStack, position) {
  return new Promise((resolve, reject) => {

    const sql = " INSERT INTO character_changes_sequence                     " +
                " (character_id, stack, position, type, type_id, history_id) " +
                " VALUES (?, ?, ?, ?, ?, ?)                                  ";

    const length = futureStack.length;
    let nextPosition = position;

    if (length === 1) {
      resolve(nextPosition);
      return;
    }

    prepare(sql)
      .then(statement => new Promise((resolve, reject) => {
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
      .then(() => resolve(nextPosition))
      .catch(error => reject(error));

  });
}

function deleteFutureStack(characterId) {
  return new Promise((resolve, reject) => {

    const sql = " DELETE FROM character_changes_sequence " +
                " WHERE character_id = ? AND stack = ?   ";
    const params = [characterId, Stack.FUTURE];

    run(sql, params)
      .then(() => resolve())
      .catch(error => reject(error));

  });
}
