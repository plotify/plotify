import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

function CharacterListItem (props) {
  const { character, selected } = props
  return (
    <ListItem button={!selected}>
      <ListItemAvatar>
        <Avatar>{character.name.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={character.name} />
    </ListItem>
  )
}

CharacterListItem.propTypes = {
  character: PropTypes.object.isRequired,
  selected: PropTypes.bool
}

export default CharacterListItem
