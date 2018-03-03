import { createSelector } from 'reselect'
import edit from './edit'
import file from './file'
import help from './help'
import plotify from './plotify'
import view from './view'
import windows from '../shared/windows'

const templateCreator = createSelector(
  plotify, file, edit, view, windows, help,
  (...categories) => [...categories]
)

export default templateCreator
