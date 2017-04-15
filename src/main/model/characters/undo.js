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
  CAN_UNDO_CHARACTER_CHANGE,
  UNDO_CHARACTER_CHANGE
} from "../../shared/characters/ipc-channels";

export function canUndoCharacterChange(id) {
  return new Promise((resolve, reject) => {

    if (!id) {
      throw new Error("No character id was passed.");
    }

    getStackTop(id, Stack.PAST)
      .then(entry => resolve(entry !== null))
      .catch(error => reject(error));

  });
}

export function undoCharacterChange(id) {
  return new Promise((resolve, reject) => {

    if (!id) {
      throw new Error("No character id was passed.");
    }

    let newPresence;
    getStackTop(id, Stack.PAST)
      .then(entry => { newPresence = entry; return removeFromStack(entry); })
      .then(() => setNewPresence(newPresence))
      .then(previousPresence => addToStack(previousPresence, Stack.FUTURE))
      .then(() => getPresenceContent(newPresence))
      .then(content => resolve(content))
      .catch(error => reject(error));

  });
}

export function registerUndoCharacterChangeIpcChannels(ipcMain) {
  ipcMain.on(CAN_UNDO_CHARACTER_CHANGE, (event, payload) => {
    canUndoCharacterChange(payload.args)
      .then(canUndo => sendCallback(event, payload, canUndo))
      .catch(error => sendCallback(event, payload, error, false));
  });
  ipcMain.on(UNDO_CHARACTER_CHANGE, (event, payload) => {
    undoCharacterChange(payload.args)
      .then(content => sendCallback(event, payload, content))
     .catch(error => sendCallback(event, payload, error, false));
  });
}
