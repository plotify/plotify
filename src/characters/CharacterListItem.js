import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

function CharacterListItem (props) {
  const { classes, character, selected } = props
  return (
    <ListItem className={classes.listItem} button={!selected}>
      <ListItemAvatar>
        <Avatar>{character.name.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.characterName}
        primary={character.name} />
    </ListItem>
  )
}

CharacterListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  selected: PropTypes.bool
}

const styles = theme => ({
  listItem: {
    height: theme.spacing.unit * 7
  },
  characterName: {
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing.unit * 6,
    '& h3': {
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical'
    }
  }
})

export default withStyles(styles)(CharacterListItem)
