import React from 'react'
import Typography from 'material-ui/Typography'

const ProfileEmptyHint = (props) => (
  <div className={props.className}>
    <Typography>
      Es liegen noch keine Einträge im Steckbrief dieses Charakters vor.
    </Typography>
    <Typography>
      Starte den Editiermodus mit Klick auf den Bearbeiten-Button
    </Typography>
  </div>
)

export default ProfileEmptyHint
