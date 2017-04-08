import { getConnection, setConnection } from "./connection";
import { CLOSE_STORY } from "../../shared/stories/ipc-channels";

export function closeStory() {
  return new Promise((resolve, reject) => {

    const connection = getConnection();

    if (connection === null) {
      throw new NoStoryOpenedError();
    }

    connection.close((error) => {
      if (!error) {
        setConnection(null);
        resolve();
      } else {
        reject(new CouldNotCloseStoryError(error.message));
      }
    });

  });
}

export class NoStoryOpenedError extends Error {
  constructor() {
    super("No story is opened.");
    this.name = "NoStoryOpenedError";
  }
}

export class CouldNotCloseStoryError extends Error {
  constructor(message) {
    super(message);
    this.name = "CouldNotCloseStoryError";
  }
}

export function registerCloseStoryIpcChannel(ipcMain) {
  ipcMain.on(CLOSE_STORY, (event, payload) => {
    closeStory().then(() => {
      event.sender.send(payload.callbackChannel, { error: false });
    }).catch((error) => {
      event.sender.send(payload.callbackChannel, {
        error: true,
        result: error
      });
    });
  });
}
