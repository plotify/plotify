import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog'
import { closeAboutDialog, openContributorsDialog } from '../actions'

import Button from 'material-ui/Button'
import ContributorsDialog from './ContributorsDialog'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { isAboutDialogOpen } from '../selectors'
import { withStyles } from 'material-ui/styles'

const packageJson = require('../../../package.json')

// TODO Lizenz
const AboutDialog = (props) => {
  const { open, closeAboutDialog, openContributorsDialog, classes } = props
  const openWebsite = () => window.open(packageJson.homepage)

  const content = [
    <img alt='Plotify Icon' src='./app-icon.png' key={1} />,
    <div key={2}>
      <Typography type='headline'>{packageJson.productName}</Typography>
      <Typography>Version: {packageJson.version}</Typography>
      <Typography>
        Copyright © 2017 Sebastian Schmidt & Jasper Meyer
      </Typography>
      <Typography>
        Plotify ist eine Software für Schriftsteller/innen, die dir dabei hilft,
        die Charaktere deiner Geschichte zu planen und zu organisieren.
        Behalte stets den Überblick und erschaffe eine fantastische Geschichte!
      </Typography>
    </div>
  ]

  const dialogContent = [
    <MediaQuery minWidth={600} key={1}>
      <DialogContent className={classes.content}>
        {content}
      </DialogContent>
    </MediaQuery>,
    <MediaQuery maxWidth={599} key={2}>
      <DialogContent className={classNames(classes.content, classes.smallContent)}>
        {content}
      </DialogContent>
    </MediaQuery>
  ]

  return (
    <Dialog open={open} onRequestClose={closeAboutDialog}>
      {dialogContent}
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
  content: {
    '& img': {
      height: '128px',
      width: '128px',
      float: 'left'
    },
    '& h1, p': {
      marginBottom: theme.spacing.unit * 2,
      marginLeft: 128 + (theme.spacing.unit * 3)
    },
    '& p:last-child': {
      marginBottom: 0
    }
  },
  smallContent: {
    '& img': {
      height: '64px',
      width: '64px',
      float: 'right'
    },
    '& h1, p': {
      marginLeft: 0
    }
  }
})

const StyledAboutDialog = withStyles(styles)(AboutDialog)

const mapStateToProps = (state) => ({
  open: isAboutDialogOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  closeAboutDialog: () => dispatch(closeAboutDialog()),
  openContributorsDialog: () => dispatch(openContributorsDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(StyledAboutDialog)
