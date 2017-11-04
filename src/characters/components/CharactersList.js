import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem } from 'material-ui/List'
import CharacterListItem from './CharacterListItem'
import * as s from '../selectors'
import * as a from '../actions'
import { connect } from 'react-redux'

function CharactersList (props) {
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

const style = theme => ({
  // Leerer Listeneintrag als Platzhalter, damit der Button zum Erstellen eines neuen Charakters
  // nicht eventuell den letzten Charakter in der Liste überdeckt, wenn die Liste ganz nach unten gescrollt wurde.
  placeholderItem: {
    height: theme.spacing.unit * 7
  }
})

const StyledCharactersList = withStyles(style)(CharactersList)

function mapStateToProps (state) {
  return {
    characters: s.getCharacters(state),
    selected: s.getSelectedCharacterId(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClick: id => dispatch(a.selectCharacter(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StyledCharactersList)
