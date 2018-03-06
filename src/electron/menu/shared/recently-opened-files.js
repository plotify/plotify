import { OPEN_STORY_REQUESTED } from '../../../shared/story/requests'
import { basename } from 'path'
import { createSelector } from 'reselect'
import { getRecentlyOpenedFiles } from '../../preferences'
import { openStory } from '../../story'
import { request } from '../../shared/communication'
import store from '../../store'

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
  if (window) {
    request(window, OPEN_STORY_REQUESTED, path)
  } else {
    store.dispatch(openStory(undefined, path))
  }
}

const selector = createSelector(
  getRecentlyOpenedFiles,
  recentlyOpenedFiles
)

export default selector
