# State

## Beispiel

```javascript
{
  title: "Plotify",
  snackbar: {
    open: false,
    message: "",
    autoHideDuration: 5000,
    actionLabel: undefined,
    actionCreator: undefined
  },
  about: {
    open: false
  },
  page: {
      id: "characters",
      title: "Charaktere",
      navigation: true
  }
  story: {
    loading: false,
    loadingFailed: false,
    closing: false,
    closingFailed: false,
    creating: false,
    creationFailed: false,
    error: null,
    open: true,
    file: "/home/mustermann/Dokumente/Neue Geschichte.story"
  },
  characters: {
    list: {
      loading: false,
      error: null,
      filter: "",
      characters: {
        "1ce1ccfd-6137-48e4-a6a2-36e47f281568": {
          id: "1ce1ccfd-6137-48e4-a6a2-36e47f281568",
          name: "Erika Musterfrau",
          deleted: false
        },
        "954ed69f-4d8e-42eb-9bf0-f725bbce5d57": {
          id: "954ed69f-4d8e-42eb-9bf0-f725bbce5d57",
          name: "Max Mustermann",
          deleted: false
        }
      },
      order: [
        "954ed69f-4d8e-42eb-9bf0-f725bbce5d57",
        "1ce1ccfd-6137-48e4-a6a2-36e47f281568"
      ],
      selected: null
    }
  },
  profile: {
    characterId: "1ce1ccfd-6137-48e4-a6a2-36e47f281568",
    deleted: false,
    savedName: "Erika Musterfrau",
    changedName: "Erika Musterfrau",
    loading: false,
    loadingFailed: false,
    saving: false,
    savingFailed: false,
    error: null,
    groups: {
      "ab24ccad-1b6a-4c5a-87db-ac6644dbdc0b": {
        id: "ab24ccad-1b6a-4c5a-87db-ac6644dbdc0b",
        title: "Physis",
        entriesOrder: [
          "a4b48609-525a-4fb3-ae2d-b396d2453fd9",
          "7c7c87f6-5544-4a83-8df6-f541b2025406"
        ]
      },
      "571bce9a-0cdc-4b0b-9cdd-86c65058ed1c": {
        id: "571bce9a-0cdc-4b0b-9cdd-86c65058ed1c",
        title: "Aussehen"
        // ...
      }
    },
    groupsOrder: [
      "ab24ccad-1b6a-4c5a-87db-ac6644dbdc0b",
      "571bce9a-0cdc-4b0b-9cdd-86c65058ed1c"
    ],
    entries: {
      "a4b48609-525a-4fb3-ae2d-b396d2453fd9": {
        id: "a4b48609-525a-4fb3-ae2d-b396d2453fd9",
        title: "Alter",
        savedValue: "20",
        changedValue: "20",
        saving: false,
        savingFailed: false,
        error: null
      },
      "7c7c87f6-5544-4a83-8df6-f541b2025406": {
        id: "7c7c87f6-5544-4a83-8df6-f541b2025406",
        title: "Größe",
        savedValue: "Riesig",
        changedValue: "Klein",
        saving: true,
        savingFailed: false,
        error: null
      }
    }
  }
}
```
