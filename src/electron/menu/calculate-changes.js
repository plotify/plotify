export const COMPLETE_REBUILD = Symbol('COMPLETE_REBUILD')

export const calculateChanges = (oldTemplate, newTemplate) => {
  if (oldTemplate.length !== newTemplate.length) {
    return [ COMPLETE_REBUILD ]
  }

  const changes = []

  for (let index = 0; index < oldTemplate.length; index++) {
    const changed = compareMenus(index, null, oldTemplate, newTemplate)
    changes.push(...changed)
  }

  return changes
}

const compareMenus = (menuIndex, submenuIndex, oldTemplate, newTemplate) => {
  let oldMenu
  let newMenu

  if (submenuIndex === null) {
    oldMenu = oldTemplate[menuIndex].submenu
    newMenu = newTemplate[menuIndex].submenu
  } else {
    oldMenu = oldTemplate[menuIndex].submenu[submenuIndex].submenu
    newMenu = newTemplate[menuIndex].submenu[submenuIndex].submenu
  }

  if (oldMenu.length !== newMenu.length) {
    return [ COMPLETE_REBUILD ]
  }

  const changes = []

  for (let itemIndex = 0; itemIndex < oldMenu.length; itemIndex++) {
    const oldItem = oldMenu[itemIndex]
    const newItem = newMenu[itemIndex]

    const changed = compareMenuItems(menuIndex, submenuIndex, itemIndex, oldItem, newItem)
    if (changed) {
      changes.push(changed)
    }

    if (oldItem.submenu) {
      const changed = compareMenus(menuIndex, itemIndex, oldTemplate, newTemplate)
      changes.push(...changed)
    }
  }

  return changes
}

const compareMenuItems = (menuIndex, submenuIndex, itemIndex, oldItem, newItem) => {
  const properties = {}

  for (const property in oldItem) {
    const oldValue = oldItem[property]
    const newValue = newItem[property]

    if (property === 'visible' || property === 'checked' || property === 'enabled') {
      if (oldValue !== newValue) {
        properties[property] = newValue
      }
    } else if (property !== 'submenu' && oldValue !== newValue) {
      return COMPLETE_REBUILD
    }
  }

  if (Object.keys(properties).length > 0) {
    return { menuIndex, submenuIndex, itemIndex, properties }
  }
}
