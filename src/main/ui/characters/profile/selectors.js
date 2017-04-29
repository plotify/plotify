import list from "../list";

export function isVisible(state) {
  return list.selectors.isCharacterSelected(state);
}

export function getCharacterId(state) {
  return list.selectors.getSelectedCharacterId(state);
}

export function getCharacterName(state) {
  return "Erika Musterfrau";
}

export function isCharacterDeleted(state) {
  return false;
}

export function getGroupsInOrder(state) {
  return [
    {
      id: "ab24ccad-1b6a-4c5a-87db-ac6644dbdc0b",
      title: "Physis",
      entries: [
        {
          id: "a4b48609-525a-4fb3-ae2d-b396d2453fd9",
          title: "Alter",
          value: "20"
        },
         {
           id: "7c7c87f6-5544-4a83-8df6-f541b2025406",
           title: "Größe",
           value: "Riesig"
         }
      ]
    },
    {
      id: "571bce9a-0cdc-4b0b-9cdd-86c65058ed1c",
      title: "Aussehen",
      entries: [
        {
          id: "da714282-60c2-4347-8706-1c5b7e6e6c94",
          title: "Gesicht",
          value: "Rot und rund"
        }
      ]
    }
  ];
}
