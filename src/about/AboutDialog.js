import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AppIcon from './app-icon-128.png';
import { connect } from 'react-redux'
import * as s from './selectors';
import * as a from './actions';

// TODO Versionsnummer aus package.json auslesen
// TODO Lizenz
// TODO Mitwirkende
// TODO Website
function AboutDialog(props) {
  const { open, onCloseAboutDialog, classes } = props;
  return (
    <Dialog open={open} onRequestClose={onCloseAboutDialog}>
      <DialogContent>
        <img alt='Plotify Icon' src={AppIcon} className={classes.appIcon} />
        <Typography type='headline' className={classes.paragraph}>Plotify</Typography>
        <DialogContentText>
          <span className={classes.paragraph}>Version: 0.2.0</span>
          <span className={classes.paragraph}>
            Copyright © 2017 Sebastian Schmidt & Jasper Meyer
          </span>
          <span className={classes.paragraph}>
            Plotify ist eine Software für Schriftsteller/innen, die dir dabei hilft,
            die Charaktere deiner Geschichte zu planen und zu organisieren.
            Behalte stets den Überblick und erschaffe eine fantastische Geschichte!
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseAboutDialog}>Schließen</Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = theme => ({
  appIcon: {
    height: '128px',
    width: '128px',
    float: 'left'
  },
  paragraph: {
    display: 'block',
    marginBottom: theme.spacing.unit * 2,
    marginLeft: 128 + (theme.spacing.unit * 3),
    '&:last-child': {
      marginBottom: 0
    }
  }
});

const StyledAboutDialog =  withStyles(styles)(AboutDialog);

function mapStateToProps(state) {
  return {
    open: s.isAboutDialogOpen(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCloseAboutDialog: () => dispatch(a.closeAboutDialog())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StyledAboutDialog);
