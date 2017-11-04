import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem } from 'material-ui/List'
import CharacterListItem from './CharacterListItem'
import { getCharacters, getSelectedCharacterId } from '../selectors'
import { selectCharacter } from '../actions'
import { connect } from 'react-redux'

const CharactersList = (props) => {
  const { classes, characters, onClick, selected, className } = props
  return (
    <List className={className}>
      {characters.map((character) => (
        <CharacterListItem
          key={character.id}
          character={character}
          onClick={() => onClick(character.id)}
          selected={character.id === selected}
        />
      ))}
      <ListItem className={classes.placeholderItem} />
    </List>
  )
}

CharactersList.propTypes = {
  classes: PropTypes.object.isRequired,
  characters: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.string,
  className: PropTypes.string
}

const style = (theme) => ({
  // Leerer Listeneintrag als Platzhalter, damit der Button zum Erstellen eines neuen Charakters
  // nicht eventuell den letzten Charakter in der Liste überdeckt, wenn die Liste ganz nach unten gescrollt wurde.
  placeholderItem: {
    height: theme.spacing.unit * 7
  }
})

const StyledCharactersList = withStyles(style)(CharactersList)

const mapStateToProps = (state) => ({
  characters: getCharacters(state),
  selected: getSelectedCharacterId(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClick: id => dispatch(selectCharacter(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(StyledCharactersList)
