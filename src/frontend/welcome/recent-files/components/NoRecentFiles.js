import List, { ListItem, ListItemText } from 'material-ui/List'

import React from 'react'

const message = 'Hier werden die Geschichten aufgelistet, die du zuletzt geöffnet hast.'

const NoRecentFiles = () => (
  <List>
    <ListItem>
      <ListItemText primary={message} />
    </ListItem>
  </List>
)

export default NoRecentFiles
