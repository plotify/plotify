import React from 'react'
import PropTypes from 'prop-types'
import List from 'material-ui/List'
import CharacterListItem from './CharacterListItem'

function CharactersList (props) {
  const { characters, className } = props
  return (
    <List className={className}>
      {characters.map((character) => (
        <CharacterListItem
          key={character.id}
          character={character}
          selected={false}
        />
      ))}
    </List>
  )
}

CharactersList.propTypes = {
  characters: PropTypes.array.isRequired,
  className: PropTypes.string
}

export default CharactersList
