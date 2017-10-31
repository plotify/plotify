import React from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

function CharacterCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography type="headline" paragraph>
          Max Mustermann
        </Typography>
        <Typography>
        Mustermann ist ein häufig verwendeter Familienname fiktiver Personen in Deutschland. Erika Mustermann und Max Mustermann stehen als Platzhalternamen für eine beliebige (reale) Frau und einen beliebigen (realen) Mann.
        </Typography>
      </CardContent>
      <CardActions>
        <Button dense color="primary">Ansehen</Button>
        <Button dense>Kopieren</Button>
        <Button dense>Löschen</Button>
      </CardActions>
    </Card>
  );
}

export default CharacterCard;
