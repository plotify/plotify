import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import picturePlaceholder from './profile-64.png';
import DeleteIcon from 'material-ui-icons/Delete';
import ContentCopyIcon from 'material-ui-icons/ContentCopy';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

function CharacterCard(props) {
  const { classes, character, className } = props;
  return (
    <Card className={className}>
      <ButtonBase className={classes.primaryAction}>
        <CardContent className={classes.content}>
          <Typography className={classes.name} type="headline">{character.name}</Typography>
          <CardMedia image={picturePlaceholder} className={classes.picture} />
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.secondaryActions}>
        <Tooltip title='Kopieren' placement='bottom'>
          <IconButton>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Löschen' placement='bottom'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

CharacterCard.propTypes = {
  classes: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  className: PropTypes.string
};

const styles = theme => ({
  primaryAction: {
    display: 'block',
    width: '100%',
    textAlign: 'left'
  },
  secondaryActions: {
    justifyContent: 'flex-start'
  },
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  name: {
    flexGrow: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingRight: theme.spacing.unit
  },
  picture: {
    height: '64px',
    width: '64px'
  }
});

export default withStyles(styles)(CharacterCard);
