import React, { PureComponent } from 'react'
import { getFilteredCharacters, getSelectedCharacterId } from '../selectors'

import CharacterListEmptyItem from './CharacterListEmptyItem'
import CharacterListItem from './CharacterListItem'
import List from 'material-ui/List'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectCharacter } from '../actions'

class CharactersList extends PureComponent {
  render () {
    const { characters, onClick, selected, className } = this.props
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
}

CharactersList.propTypes = {
  characters: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.string,
  className: PropTypes.string
}

const mapStateToProps = (state) => ({
  characters: getFilteredCharacters(state),
  selected: getSelectedCharacterId(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClick: id => dispatch(selectCharacter(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)
