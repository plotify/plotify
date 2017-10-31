import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CharacterCard from './CharacterCard';

function CharactersGrid(props) {
  const { classes, characters } = props;
  return (
    <div className={classes.container}>
      {characters.map(character =>
        <CharacterCard
          key={character.id}
          character={character}
          className={classes.characterCard}
        />
      )}
    </div>
  );
}

CharactersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  characters: PropTypes.array.isRequired
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    padding: theme.spacing.unit * 2
  },
  characterCard: {
    width: '300px',
    maxWidth: '400px',

    maxHeight: '236px',
    margin: theme.spacing.unit * 2,
    flexGrow: '1',
    /*flex: '1 1'*/
  }
});

export default withStyles(styles)(CharactersGrid);
