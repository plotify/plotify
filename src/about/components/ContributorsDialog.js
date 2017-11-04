import React from 'react'
import { connect } from 'react-redux'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import { isContributorsDialogOpen } from '../selectors'
import { closeContributorsDialog } from '../actions'

import SebastianSchmidtImage from '../resources/contributors/sebastian-schmidt.jpg'
import JasperMeyerImage from '../resources/contributors/jasper-meyer.jpg'
import GesaMuellerImage from '../resources/contributors/gesa-mueller.jpg'

const contributors = [
  { name: 'Sebastian Schmidt', url: 'https://github.com/SebastianSchmidt', image: SebastianSchmidtImage },
  { name: 'Jasper Meyer', url: 'https://github.com/itsJASPERr', image: JasperMeyerImage },
  { name: 'Gesa Müller', url: 'https://github.com/GesaMueller', image: GesaMuellerImage },
  { name: 'Rebecca Rademacher', url: 'https://github.com/RebeccaRademacher' }
]

const ContributorsDialog = (props) => (
  <Dialog open={props.open} onRequestClose={props.closeContributorsDialog}>
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

const mapStateToProps = (state) => ({
  open: isContributorsDialogOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  closeContributorsDialog: () => dispatch(closeContributorsDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(ContributorsDialog)
