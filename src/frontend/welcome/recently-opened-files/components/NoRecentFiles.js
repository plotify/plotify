import List, { ListItem, ListItemText } from 'material-ui/List'

import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from 'material-ui/styles'

const message = 'Hier werden die Geschichten aufgelistet, die du zuletzt geöffnet hast.'

const NoRecentFiles = (props) => (
  <List>
    <ListItem className={props.classes.item}>
      <ListItemText primary={message} />
    </ListItem>
  </List>
)

NoRecentFiles.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = theme => ({
  item: {
    boxSizing: 'border-box',
    height: '68px'
  }
})

export default withStyles(styles)(NoRecentFiles)
