import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import CharactersGrid from './characters/CharactersGrid';
import uuid from 'uuid/v4';

const characters = [
  { id: uuid(), name: 'Max Mustermann', description: 'Mustermann ist ein häufig verwendeter Familienname fiktiver Personen in Deutschland. Erika Mustermann und Max Mustermann stehen als Platzhalternamen für eine beliebige (reale) Frau und einen beliebigen (realen) Mann.' },
  { id: uuid(), name: 'Erika Musterfrau', description: 'Auch gibt es niemanden, der den Schmerz an sich liebt, sucht oder wünscht, nur, weil er Schmerz ist, es sei denn, es kommt zu zufälligen Umständen, in denen Mühen und Schmerz ihm große Freude bereiten können.' },
  { id: uuid(), name: 'Sherlock Holmes', description: 'Sherlock Holmes ist eine vom britischen Schriftsteller Sir Arthur Conan Doyle geschaffene Kunstfigur, die in seinen im späten 19. und frühen 20. Jahrhundert spielenden Romanen als Detektiv tätig ist.' },
  { id: uuid(), name: 'Sebastian Schmidt', description: 'Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte.' },
  { id: uuid(), name: 'Rebecca Rademacher', description: 'Abgeschieden wohnen sie in Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans.' },
  { id: uuid(), name: 'Max Moritz Jasper Tim Müller', description: 'Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien. Es ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den Mund fliegen. icht einmal von der allmächtigen Interpunktion werden die Blindtexte beherrscht – ein geradezu unorthographisches Leben.' }
];

function App(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton className={classes.menuButton} color='contrast' aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <Typography type='title' color='inherit' className={classes.flex}>
            Plotify
          </Typography>
          <Button color='contrast'>Hello world</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <CharactersGrid characters={characters} />
      </div>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 12
  },
  content: {
    overflow: 'scroll',
    height: 'calc(100% - 64px)'
  }
});

export default withStyles(styles)(App);
