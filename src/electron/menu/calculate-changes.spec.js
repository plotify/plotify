import { COMPLETE_REBUILD, calculateChanges } from './calculate-changes'

test('single property in a single entry has changed', () => {
  const oldTemplate = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Schließen',
          enabled: false
        },
        {
          type: 'separator'
        },
        {
          label: 'Beenden',
          role: 'quit'
        }
      ]
    },
    {
      label: 'Hilfe',
      submenu: [
        {
          label: 'Entwicklung',
          submenu: [
            {
              label: 'State exportieren...'
            }
          ]
        },
        {
          label: 'Über Plotify',
          enabled: true
        }
      ]
    }
  ]
  const newTemplate = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Schließen',
          enabled: true
        },
        {
          type: 'separator'
        },
        {
          label: 'Beenden',
          role: 'quit'
        }
      ]
    },
    {
      label: 'Hilfe',
      submenu: [
        {
          label: 'Entwicklung',
          submenu: [
            {
              label: 'State exportieren...'
            }
          ]
        },
        {
          label: 'Über Plotify',
          enabled: true
        }
      ]
    }
  ]
  const changes = calculateChanges(oldTemplate, newTemplate)
  expect(changes.length).toBe(1)
  expect(changes[0]).toEqual({
    menuIndex: 0,
    submenuIndex: null,
    itemIndex: 0,
    properties: {
      enabled: true
    }
  })
})

test('multiple properties in a single entry have changed', () => {
  const oldTemplate = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Lorem ipsum',
          enabled: false,
          checked: true
        }
      ]
    }
  ]
  const newTemplate = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Lorem ipsum',
          enabled: true,
          checked: false
        }
      ]
    }
  ]
  const changes = calculateChanges(oldTemplate, newTemplate)
  expect(changes.length).toBe(1)
  expect(changes[0]).toEqual({
    menuIndex: 0,
    submenuIndex: null,
    itemIndex: 0,
    properties: {
      enabled: true,
      checked: false
    }
  })
})

test('multiple properties in multiple entries have changed', () => {
  const oldTemplate = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Lorem ipsum',
          enabled: false,
          checked: true
        }
      ]
    },
    {
      label: 'Hilfe',
      submenu: [
        {
          label: 'Entwicklung',
          submenu: [
            {
              label: 'State exportieren...',
              visible: true
            }
          ]
        },
        {
          label: 'Über Plotify'
        }
      ]
    }
  ]
  const newTemplate = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Lorem ipsum',
          enabled: true,
          checked: true
        }
      ]
    },
    {
      label: 'Hilfe',
      submenu: [
        {
          label: 'Entwicklung',
          submenu: [
            {
              label: 'State exportieren...',
              visible: false
            }
          ]
        },
        {
          label: 'Über Plotify'
        }
      ]
    }
  ]
  const changes = calculateChanges(oldTemplate, newTemplate)
  expect(changes.length).toBe(2)
  expect(changes[0]).toEqual({
    menuIndex: 0,
    submenuIndex: null,
    itemIndex: 0,
    properties: {
      enabled: true
    }
  })
  expect(changes[1]).toEqual({
    menuIndex: 1,
    submenuIndex: 0,
    itemIndex: 0,
    properties: {
      visible: false
    }
  })
})

test('complete rebuild if a property changes except for visible, checked and enabled', () => {
  const oldTemplate = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Lorem ipsum'
        }
      ]
    }
  ]
  const newTemplate = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Hello world'
        }
      ]
    }
  ]
  const changes = calculateChanges(oldTemplate, newTemplate)
  expect(changes.length).toBe(1)
  expect(changes[0]).toBe(COMPLETE_REBUILD)
})

test('complete rebuild if the number of menu items of a menu have been changed', () => {
  const oldTemplate = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Lorem ipsum'
        }
      ]
    }
  ]
  const newTemplate = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Lorem ipsum'
        },
        {
          label: 'Hello world'
        }
      ]
    }
  ]
  const changes = calculateChanges(oldTemplate, newTemplate)
  expect(changes.length).toBe(1)
  expect(changes[0]).toBe(COMPLETE_REBUILD)
})

test('complete rebuild if the number of menu categories have been changed', () => {
  const oldTemplate = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Lorem ipsum'
        }
      ]
    }
  ]
  const newTemplate = [
    {
      label: 'Datei',
      submenu: [
        {
          label: 'Lorem ipsum'
        }
      ]
    },
    {
      label: 'Bearbeiten',
      submenu: [
        {
          label: 'Hello world'
        }
      ]
    }
  ]
  const changes = calculateChanges(oldTemplate, newTemplate)
  expect(changes.length).toBe(1)
  expect(changes[0]).toBe(COMPLETE_REBUILD)
})
