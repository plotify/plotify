import React from 'react'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui-icons/Edit'

const EditCharacterButton = (props) => (
  <Tooltip title='Charakter bearbeiten' placement='bottom'>
    <IconButton
      color='contrast'
      aria-label='edit'>
      <EditIcon />
    </IconButton>
  </Tooltip>
)

export default EditCharacterButton
