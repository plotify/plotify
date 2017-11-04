import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Dialog, { DialogContent, DialogActions } from 'material-ui/Dialog'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AppIcon from '../resources/app-icon-128.png'
import { connect } from 'react-redux'
import * as s from '../selectors'
import * as a from '../actions'
import ContributorsDialog from './ContributorsDialog'

// TODO Versionsnummer aus package.json auslesen
// TODO URL der Website package.json auslesen
// TODO Lizenz
const AboutDialog = (props) => {
  const { open, closeAboutDialog, openContributorsDialog, classes } = props
  const openWebsite = () => window.open('https://github.com/plotify/plotify#readme')
  return (
    <Dialog open={open} onRequestClose={closeAboutDialog}>
      <DialogContent className={classes.content}>
        <img alt='Plotify Icon' src={AppIcon} className={classes.appIcon} />
        <Typography type='headline'>Plotify</Typography>
        <Typography>Version: 0.2.0-SNAPSHOT</Typography>
        <Typography>
          Copyright © 2017 Sebastian Schmidt & Jasper Meyer
        </Typography>
        <Typography>
          Plotify ist eine Software für Schriftsteller/innen, die dir dabei hilft,
          die Charaktere deiner Geschichte zu planen und zu organisieren.
          Behalte stets den Überblick und erschaffe eine fantastische Geschichte!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={openContributorsDialog}>Mitwirkende</Button>
        <Button onClick={openWebsite}>Website</Button>
        <Button onClick={closeAboutDialog}>Schließen</Button>
      </DialogActions>
      <ContributorsDialog />
    </Dialog>
  )
}

AboutDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeAboutDialog: PropTypes.func.isRequired,
  openContributorsDialog: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const styles = (theme) => ({
  appIcon: {
    height: '128px',
    width: '128px',
    float: 'left'
  },
  content: {
    '& h1, p': {
      marginBottom: theme.spacing.unit * 2,
      marginLeft: 128 + (theme.spacing.unit * 3)
    },
    '& p:last-child': {
      marginBottom: 0
    }
  }
})

const StyledAboutDialog = withStyles(styles)(AboutDialog)

const mapStateToProps = (state) => ({
  open: s.isAboutDialogOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  closeAboutDialog: () => dispatch(a.closeAboutDialog()),
  openContributorsDialog: () => dispatch(a.openContributorsDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(StyledAboutDialog)
