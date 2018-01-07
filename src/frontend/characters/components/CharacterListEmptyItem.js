import { ListItem, ListItemText } from 'material-ui/List'
import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

class CharacterListEmptyItem extends PureComponent {
  render () {
    const { classes } = this.props
    const message = `
      Erstelle deinen ersten Steckbrief für einen Charakter,
      indem du auf das + klickst!
    `
    return (
      <ListItem className={classes.listItem}>
        <ListItemText primary={message} />
      </ListItem>
    )
  }
}

CharacterListEmptyItem.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = (theme) => ({
  listItem: {
    paddingTop: theme.spacing.unit * 2,
    textAlign: 'center'
  }
})

export default withStyles(styles)(CharacterListEmptyItem)
