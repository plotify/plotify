import { sendCallback } from "../../shared/commons/ipc";
import { FIND_CHARACTERS } from "../../shared/characters/ipc-channels";

const notDeletedCharacters = [
  {
    "id": "abda39db-05f4-4d21-b577-1538e825c261",
    "name": "Max Mustermann",
    "deleted": false
  },
  {
    "id": "39a6d210-ba7f-47c5-8f23-7e99ca699a4e",
    "name": "Erika Musterfrau",
    "deleted": false
  }
];

const deletedCharacters = [
  {
    "id": "490381ac-c21c-4d32-8d87-655026e80708",
    "name": "Jasper Meyer",
    "deleted": true
  },
  {
    "id": "714c7d45-67f7-4b4b-9f70-1e92961cf878",
    "name": "Sebastian Schmidt",
    "deleted": true
  },
  {
    "id": "59a46138-7032-4510-8f72-b2f4c90abd0d",
    "name": "Rebecca Rademacher",
    "deleted": true
  },
  {
    "id": "e39f3acc-2fa8-4c8b-babf-05ed761fa5c1",
    "name": "Gesa Müller",
    "deleted": true
  }
];

export function findCharacters(deleted, filter = undefined) {
  return new Promise((resolve, reject) => {

    let result;

    if (deleted) {
      result = deletedCharacters;
    } else {
      result = notDeletedCharacters;
    }

    if (filter) {
      result = result.filter(character => {
        return character.name.toLowerCase().includes(filter.toLowerCase());
      });
    }

    resolve(result);

  });
}

export function registerFindCharactersIpcChannel(ipcMain) {
  ipcMain.on(FIND_CHARACTERS, (event, payload) => {
    findCharacters(payload.args.deleted, payload.args.filter)
      .then(characters => sendCallback(event, payload, characters))
      .catch(error => sendCallback(event, payload, error, false));
  });
}
