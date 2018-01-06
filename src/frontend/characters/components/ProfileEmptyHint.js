import React from 'react'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  editInline: {
    position: 'absolute',
    margin: '-3px 3px'
  },
  mascot: {
    width: 200,
    margin: 15,
    opacity: 0.7
  }
})

const ProfileEmptyHint = (props) => (
  <div className={props.className}>
    <img
      src='./squirrel.png'
      className={props.classes.mascot}
    />
    <Typography>
      Es liegen noch keine Einträge im Steckbrief dieses Charakters vor.
    </Typography>
    <Typography>
      Starte den Editiermodus mit Klick auf den Bearbeiten-Button
    </Typography>
  </div>
)

export default withStyles(styles)(ProfileEmptyHint)
