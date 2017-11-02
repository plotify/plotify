import React from 'react'
import { connect } from 'react-redux'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import { isContributorsDialogOpen } from './selectors'
import { closeContributorsDialog } from './actions'

const contributors = [
  { name: 'Sebastian Schmidt', url: 'https://github.com/SebastianSchmidt' },
  { name: 'Jasper Meyer', url: 'https://github.com/itsJASPERr' },
  { name: 'Gesa Müller', url: 'https://github.com/GesaMueller' },
  { name: 'Rebecca Rademacher', url: 'https://github.com/RebeccaRademacher' }
]

// TODO Profilbilder darstellen.
// TODO Öffnen der URLs im Browser.
function ContributorsDialog (props) {
  const { open, closeContributorsDialog } = props
  return (
    <Dialog open={open} onRequestClose={closeContributorsDialog}>
      <DialogTitle>Mitwirkende</DialogTitle>
      <DialogContent>
        <List>
          {contributors.map((contributor, index) => (
            <ListItem key={index} button>
              <Avatar>{contributor.name.charAt(0)}</Avatar>
              <ListItemText primary={contributor.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeContributorsDialog}>Schließen</Button>
      </DialogActions>
    </Dialog>
  )
}

function mapStateToProps (state) {
  return {
    open: isContributorsDialogOpen(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeContributorsDialog: () => dispatch(closeContributorsDialog())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContributorsDialog)
