import { getCharacters, getSelectedCharacterId } from '../selectors'

import CharacterListItem from './CharacterListItem'
import List from 'material-ui/List'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { selectCharacter } from '../actions'

// TODO Empty list message
const CharactersList = (props) => {
  const { characters, onClick, selected, className } = props
  return (
    <List className={className}>
      {characters.map((character) => (
        <CharacterListItem
          key={character.id}
          character={character}
          onClick={onClick}
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

const mapStateToProps = (state) => ({
  characters: getCharacters(state),
  selected: getSelectedCharacterId(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClick: id => dispatch(selectCharacter(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)
