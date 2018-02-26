import { createSelector } from 'reselect'
import edit from './edit'
import file from './file'
import help from './help'
import view from './view'
import windows from './windows'

const templateCreator = createSelector(
  file, edit, view, windows, help,
  (...categories) => [...categories]
)

export default templateCreator
