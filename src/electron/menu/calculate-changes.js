/**
 * WICHTIGE EINSCHRÄNKUNG:
 * Das Hinzufügen oder Entfernen von Menüeinträgen wird nicht unterstützt!
 *
 * WICHTIGER HINWEIS:
 * Wenn das Hinzufügen/Entfernen implementiert werden soll, müssen Memory Leaks verhindert werden:
 * https://github.com/electron/electron/issues/9823
 */
const calculateChanges = (oldTemplate, newTemplate) => {
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
    if (property === 'visible' ||
        property === 'checked' ||
        property === 'enabled') {
      const oldValue = oldItem[property]
      const newValue = newItem[property]
      if (oldValue !== newValue) {
        properties[property] = newValue
      }
    }
  }

  if (Object.keys(properties).length > 0) {
    return { menuIndex, submenuIndex, itemIndex, properties }
  }
}

export default calculateChanges
