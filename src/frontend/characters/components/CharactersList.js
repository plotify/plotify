import { getCharacters, getSelectedCharacterId } from '../selectors'

import CharacterListEmptyItem from './CharacterListEmptyItem'
import CharacterListItem from './CharacterListItem'
import List from 'material-ui/List'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { selectCharacter } from '../actions'

const CharactersList = (props) => {
  const { characters, onClick, selected, className } = props
  let items
  if (characters.length > 0) {
    items = characters.map((character) => (
      <CharacterListItem
        key={character.id}
        character={character}
        onClick={onClick}
        selected={character.id === selected}
      />
    ))
  } else {
    items = (<CharacterListEmptyItem />)
  }
  return (
    <List className={className}>
      {items}
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
