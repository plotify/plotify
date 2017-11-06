import React from 'react'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'
import UndoIcon from 'material-ui-icons/Undo'

// TODO Strg oder Command je nach Plattform
const UndoCharacterButton = (props) => (
  <Tooltip title='Letzte Änderung rückgängig machen (Strg + Z)' placement='bottom'>
    <IconButton
      color='contrast'
      aria-label='undo'>
      <UndoIcon />
    </IconButton>
  </Tooltip>
)

export default UndoCharacterButton
