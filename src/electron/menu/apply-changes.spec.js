import applyChanges from './apply-changes'

test('applies changes to menu', () => {
  const menu = {
    items: [
      {
        submenu: {
          items: [
            {
              enabled: false
            }
          ]
        }
      }
    ]
  }
  const changes = [
    {
      menuIndex: 0,
      submenuIndex: null,
      itemIndex: 0,
      properties: {
        enabled: true
      }
    }
  ]
  expect(menu.items[0].submenu.items[0].enabled).toBe(false)
  applyChanges(menu, changes)
  expect(menu.items[0].submenu.items[0].enabled).toBe(true)
})

test('applies changes to submenu', () => {
  const menu = {
    items: [
      {
        submenu: {
          items: [
            {
              submenu: {
                items: [
                  {
                    checked: true
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
  const changes = [
    {
      menuIndex: 0,
      submenuIndex: 0,
      itemIndex: 0,
      properties: {
        checked: false
      }
    }
  ]
  expect(menu.items[0].submenu.items[0].submenu.items[0].checked).toBe(true)
  applyChanges(menu, changes)
  expect(menu.items[0].submenu.items[0].submenu.items[0].checked).toBe(false)
})
