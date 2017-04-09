import { getConnection, setConnection } from "./connection";
import { sendCallback } from "../../shared/commons/ipc";
import { CLOSE_STORY } from "../../shared/stories/ipc-channels";
import {
  NoStoryOpenedError,
  CouldNotCloseStoryError
} from "../../shared/stories/errors";

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

export function registerCloseStoryIpcChannel(ipcMain) {
  ipcMain.on(CLOSE_STORY, (event, payload) => {
    closeStory()
      .then(() => sendCallback(event, payload))
      .catch(error => sendCallback(event, payload, error, false));
  });
}
