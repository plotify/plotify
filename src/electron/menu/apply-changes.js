const applyChanges = (menu, changes) => {
  for (const change of changes) {
    let item
    if (change.submenuIndex === null) {
      item = menu.items[change.menuIndex]
               .submenu.items[change.itemIndex]
    } else {
      item = menu.items[change.menuIndex]
               .submenu.items[change.submenuIndex]
                 .submenu.items[change.itemIndex]
    }
    for (const property in change.properties) {
      item[property] = change.properties[property]
    }
  }
}

export default applyChanges
