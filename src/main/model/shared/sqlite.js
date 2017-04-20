import { getConnection } from "../stories/connection";

export function run(sql, params, result = undefined) {
  return new Promise((resolve, reject) => {
    getConnection().run(sql, params, (error) => {
      if (error) {
        logFailedSqlStatement(sql, params, error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

export function get(sql, params) {
  return new Promise((resolve, reject) => {
    getConnection().get(sql, params, (error, row) => {
      if (error) {
        logFailedSqlStatement(sql, params, error);
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

export function all(sql, params) {
  return new Promise((resolve, reject) => {
    getConnection().all(sql, params, (error, rows) => {
      if (error) {
        logFailedSqlStatement(sql, params, error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

export function prepare(sql, params) {
  return new Promise((resolve, reject) => {
    const statement = getConnection().prepare(sql, params, (error) => {
      if (error) {
        logFailedSqlStatement(sql, params, error);
        reject(error);
      }
    });
    resolve(statement);
  });
}

export function beginTransaction() {
  return run("begin");
}

export function endTransaction(result) {
  return run("commit", undefined, result);
}

export function rollbackTransaction(error) {
  if (typeof error === "undefined") {
    return run("rollback");
  } else {
    return run("rollback")
      .then(() => Promise.reject(error))
      .catch(() => Promise.reject(error));
  }
}

function logFailedSqlStatement(sql, params, error) {
  const indentation = "                     ";
  console.log("Failed to execute the following SQL statement:\n",
              indentation + "Statement:  ", sql, "\n",
              indentation + "Parameters: ", params, "\n",
              indentation + "Error:      ", error);
}
