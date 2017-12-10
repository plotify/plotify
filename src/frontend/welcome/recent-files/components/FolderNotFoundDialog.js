import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from 'material-ui/Typography'
import { closeFolderNotFoundDialog } from '../actions'
import { connect } from 'react-redux'
import { isShowFolderNotFoundDialog } from '../selectors'

const FolderNotFoundDialog = (props) => {
  const { open, close } = props
  return (
    <Dialog open={open} onRequestClose={close}>
      <DialogTitle>Verzeichnis konnte nicht geöffnet werden</DialogTitle>
      <DialogContent>
        <Typography>
          Das Verzeichnis konnte nicht geöffnet werden, weil das Verzeichnis nicht mehr existiert.
          Haben Sie das Verzeichnis verschoben oder gelöscht?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Schließen</Button>
      </DialogActions>
    </Dialog>
  )
}

FolderNotFoundDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  open: isShowFolderNotFoundDialog(state)
})

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closeFolderNotFoundDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(FolderNotFoundDialog)
