import React from 'react'
import PropTypes from 'prop-types'
import List from 'material-ui/List'
import CharacterListItem from './CharacterListItem'
import * as s from '../selectors'
import * as a from '../actions'
import { connect } from 'react-redux'

function CharactersList (props) {
  const { characters, onClick, selected, className } = props
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
    </List>
  )
}

CharactersList.propTypes = {
  characters: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.string,
  className: PropTypes.string
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)
