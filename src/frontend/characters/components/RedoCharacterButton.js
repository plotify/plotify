import IconButton from 'material-ui/IconButton'
import React from 'react'
import RedoIcon from '@material-ui/icons/Redo'
import Tooltip from 'material-ui/Tooltip'

// TODO Strg oder Command je nach Plattform
const RedoCharacterButton = (props) => (
  <Tooltip title='Letzte Änderung wiederherstellen (Strg + Y)' placement='bottom'>
    <IconButton
      color='inherit'
      aria-label='undo'>
      <RedoIcon />
    </IconButton>
  </Tooltip>
)

export default RedoCharacterButton
