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
  }
}
```
