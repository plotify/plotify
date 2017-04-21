import {
  Stack,
  getStackTop,
  removeFromStack,
  setNewPresence,
  addToStack,
  getPresenceContent
} from "./changes-sequence";
import { beginTransaction, endTransaction, rollbackTransaction } from "../shared/sqlite";

import { sendCallback } from "../../shared/commons/ipc";
import {
  CAN_UNDO_CHARACTER_CHANGE,
  UNDO_CHARACTER_CHANGE
} from "../../shared/characters/ipc-channels";

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

export function canUndoCharacterChange(characterId) {
  return Promise.resolve()
    .then(() => validateParameters(characterId))
    .then(() => getStackTop(characterId, Stack.PAST))
    .then(entry => Promise.resolve(entry !== null));
}

export function undoCharacterChange(characterId) {
  let newPresence;
  return Promise.resolve()
    .then(() => validateParameters(characterId))
    .then(() => beginTransaction())
    .then(() => getStackTop(characterId, Stack.PAST))
    .then(entry => { newPresence = entry; return removeFromStack(entry); })
    .then(() => setNewPresence(newPresence))
    .then(previousPresence => addToStack(previousPresence, Stack.FUTURE))
    .then(() => getPresenceContent(newPresence))
    .then(content => endTransaction(content))
    .catch(error => {
      console.log("Failed to undo character change:", error);
      return rollbackTransaction(error);
    });
}

function validateParameters(characterId) {
  if (typeof characterId !== "string") {
    return Promise.reject(new TypeError("No character id was passed as a string: " + characterId));
  }
  return Promise.resolve();
}
