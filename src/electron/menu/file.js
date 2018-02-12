import { CREATE_STORY_REQUESTED, OPEN_STORY_REQUESTED } from '../../shared/story/requests'

import { request } from '../shared/communication'

const fileMenu = () => ({
  label: 'Datei',
  submenu: [
    { label: 'Neu...', click: createStory },
    { label: 'Öffnen...', click: openStory },
    { type: 'separator' },
    { label: 'Beenden', role: 'quit' }
  ]
})

const createStory = (_, window) => {
  request(window, CREATE_STORY_REQUESTED)
}

const openStory = (_, window) => {
  request(window, OPEN_STORY_REQUESTED)
}

const initialState = fileMenu()

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
