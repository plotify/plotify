```js
{
  story: {
    fileName: "c:\\yourmoms.story",
  },
  selectedSection: "CHARACTERS",
  sections: {
    characters: {
      loaded: false,
      isLoading: false,
      title: {
        name: "Charaktere",
        actions: [
          {
            name: "",
            icon: "",
            disabled: ""
          }
        ]
      }
    },
    groups: {},
    relations: {}
  }
}

```


```js
{
  selectedCharacter: 42,
  entities: {
    characters: {
      42: {
        id: 42,
        name: "Herbert",
        isDeleted: false,
        profile: 666,
        canUndo: true,
        canRedo: false,
      },
      66: {
        id: 66,
        name: "Jasper M.",
        isDeleted: false,
        profile: 784,
        canUndo: false,
        canRedo: false,
      }
    },
    profiles: {
      666: {
        id: 666,
        groups: ["4567123e-e89b-12d3-a456-426655440000"]
      },
      787: {
        id: 784,
        groups: ["e89b123e-4567-12d3-a456-426655440000"]
      }
    },
    groups: {
      "4567123e-e89b-12d3-a456-426655440000": {
        id: "4567123e-e89b-12d3-a456-426655440000",
        position: 1,
        title: "Name",
        entries: ["123e4567-e89b-12d3-a456-426655440000"]
      },
      "e89b123e-4567-12d3-a456-426655440000": {
        id: "e89b123e-4567-12d3-a456-426655440000",
        position: 2,
        title: "Physis",
        entries: ["42665544-e89b-12d3-a456-123e45670000"]
      }

    },
    entries: {
      "123e4567-e89b-12d3-a456-426655440000": {
        id: "123e4567-e89b-12d3-a456-426655440000",
        position: 1,
        title: "Namensbedeutung",
        value: "der große",
      },
      "42665544-e89b-12d3-a456-123e45670000": {
        id: "42665544-e89b-12d3-a456-123e45670000",
        position: 1,
        title: "Alter",
        value: ""
      }
    }
  }
}
```
