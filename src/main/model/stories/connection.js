let currentConnection = null;

export function getConnection() {
  return currentConnection;
}

export function setConnection(connection) {
  currentConnection = connection;
}
