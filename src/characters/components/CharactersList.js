import React from 'react'
import PropTypes from 'prop-types'
import List from 'material-ui/List'
import CharacterListItem from './CharacterListItem'
import { getCharacters, getSelectedCharacterId } from '../selectors'
import { selectCharacter } from '../actions'
import { connect } from 'react-redux'

const CharactersList = (props) => {
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

const mapStateToProps = (state) => ({
  characters: getCharacters(state),
  selected: getSelectedCharacterId(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClick: id => dispatch(selectCharacter(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)
