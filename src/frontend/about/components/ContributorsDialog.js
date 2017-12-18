import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import List, { ListItem, ListItemText } from 'material-ui/List'

import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import React from 'react'
import { closeContributorsDialog } from '../actions'
import { connect } from 'react-redux'
import { isContributorsDialogOpen } from '../selectors'

const contributors = [
  { name: 'Sebastian Schmidt', url: 'https://github.com/SebastianSchmidt', image: './contributors/sebastian-schmidt.jpg' },
  { name: 'Jasper Meyer', url: 'https://github.com/itsJASPERr', image: './contributors/jasper-meyer.jpg' },
  { name: 'Gesa Müller', url: 'https://github.com/GesaMueller', image: './contributors/gesa-mueller.jpg' },
  { name: 'Rebecca Rademacher', url: 'https://github.com/RebeccaRademacher' }
]

const ContributorsDialog = (props) => (
  <Dialog open={props.open} onClose={props.closeContributorsDialog}>
    <DialogTitle>Mitwirkende</DialogTitle>
    <DialogContent>
      <List>
        {contributors.map((contributor, index) => (
          <ListItem key={index} button onClick={() => window.open(contributor.url)}>
            { contributor.image ? <Avatar src={contributor.image} /> : <Avatar>{contributor.name.charAt(0)}</Avatar> }
            <ListItemText primary={contributor.name} />
          </ListItem>
        ))}
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.closeContributorsDialog}>Schließen</Button>
    </DialogActions>
  </Dialog>
)

ContributorsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeContributorsDialog: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  open: isContributorsDialogOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  closeContributorsDialog: () => dispatch(closeContributorsDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(ContributorsDialog)
