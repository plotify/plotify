import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import CharacterListItem from './CharacterListItem';

function CharactersList(props) {
  const { characters } = props;
  return (
    <List>
      {characters.map((character) => (
        <CharacterListItem
          key={character.id}
          character={character}
          selected={false}
        />
      ))}
    </List>
  );
}

CharactersList.propTypes = {
  characters: PropTypes.array.isRequired
};

export default CharactersList;
