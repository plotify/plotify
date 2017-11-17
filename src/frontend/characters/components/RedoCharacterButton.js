import React from 'react'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'
import RedoIcon from 'material-ui-icons/Redo'

// TODO Strg oder Command je nach Plattform
const RedoCharacterButton = (props) => (
  <Tooltip title='Letzte Änderung wiederherstellen (Strg + Y)' placement='bottom'>
    <IconButton
      color='contrast'
      aria-label='undo'>
      <RedoIcon />
    </IconButton>
  </Tooltip>
)

export default RedoCharacterButton
