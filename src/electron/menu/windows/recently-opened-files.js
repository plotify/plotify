import { OPEN_STORY_REQUESTED } from '../../../shared/story/requests'
import { basename } from 'path'
import { createSelector } from 'reselect'
import { getRecentlyOpenedFiles } from '../../preferences'
import { request } from '../../shared/communication'

const prefix = 'story:'

const recentlyOpenedFiles = (files) =>
  files.map((file) => ({
    id: prefix + file.path,
    label: basename(file.path, '.story'),
    click: openOrFocus
  }))

// Keine anonyme Funktion, damit kein kompletter Neuaufbau der Menüleiste notwendig ist.
const openOrFocus = (menuItem, window) => {
  const path = menuItem.id.substring(prefix.length)
  request(window, OPEN_STORY_REQUESTED, path)
}

const selector = createSelector(
  getRecentlyOpenedFiles,
  recentlyOpenedFiles
)

export default selector
