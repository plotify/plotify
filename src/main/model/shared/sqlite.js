import { getConnection } from "../stories/connection";

export function run(sql, params) {
  return new Promise((resolve, reject) => {
    getConnection().run(sql, params, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

export function get(sql, params) {
  return new Promise((resolve, reject) => {
    getConnection().get(sql, params, (error, row) => {
      if (error) {
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
        reject(error);
      }
    });
    resolve(statement);
  });
}

export function beginTransaction() {
  return run("begin transaction");
}

export function endTransaction() {
  return run("end transaction");
}

export function rollbackTransaction() {
  return run("rollback");
}
