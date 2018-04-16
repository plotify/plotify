import { basename } from 'path'
import { createSelector } from 'reselect'
import { getRecentlyOpenedFiles } from '../../preferences'
import { openStory } from '../../story'
import store from '../../store'

const prefix = 'story:'

const recentlyOpenedFiles = (files) =>
  files.map((file) => ({
    id: prefix + file.path,
    label: basename(file.path, '.story'),
    click: _openStory
  }))

// Keine anonyme Funktion, damit kein kompletter Neuaufbau der Menüleiste notwendig ist.
const _openStory = (menuItem, window) => {
  const path = menuItem.id.substring(prefix.length)
  store.dispatch(openStory(window, path))
}

const selector = createSelector(
  getRecentlyOpenedFiles,
  recentlyOpenedFiles
)

export default selector
