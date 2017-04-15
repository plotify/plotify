import {
  Stack,
  getStackTop,
  removeFromStack,
  setNewPresence,
  addToStack,
  getPresenceContent
} from "./changes-sequence";

import { sendCallback } from "../../shared/commons/ipc";
import {
  CAN_REDO_CHARACTER_CHANGE,
  REDO_CHARACTER_CHANGE
} from "../../shared/characters/ipc-channels";

export function canRedoCharacterChange(id) {
  return new Promise((resolve, reject) => {

    if (!id) {
      throw new Error("No character id was passed.");
    }

    getStackTop(id, Stack.FUTURE)
      .then(entry => resolve(entry !== null))
      .catch(error => reject(error));

  });
}

export function redoCharacterChange(id) {
  return new Promise((resolve, reject) => {

    if (!id) {
      throw new Error("No character id was passed.");
    }

    let newPresence;
    getStackTop(id, Stack.FUTURE)
      .then(entry => { newPresence = entry; return removeFromStack(entry); })
      .then(() => setNewPresence(newPresence))
      .then(previousPresence => addToStack(previousPresence, Stack.PAST))
      .then(() => getPresenceContent(newPresence))
      .then(content => resolve(content))
      .catch(error => reject(error));

  });
}

export function registerRedoCharacterChangeIpcChannels(ipcMain) {
  ipcMain.on(CAN_REDO_CHARACTER_CHANGE, (event, payload) => {
    canRedoCharacterChange(payload.args)
      .then(canUndo => sendCallback(event, payload, canUndo))
      .catch(error => sendCallback(event, payload, error, false));
  });
  ipcMain.on(REDO_CHARACTER_CHANGE, (event, payload) => {
    redoCharacterChange(payload.args)
      .then(content => sendCallback(event, payload, content))
     .catch(error => sendCallback(event, payload, error, false));
  });
}
