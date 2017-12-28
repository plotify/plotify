import { CREATE_STORY_REQUESTED, OPEN_STORY_REQUESTED } from '../../shared/story/requests'

import { request } from '../shared/communication'

const file = () => ({
  label: 'Datei',
  submenu: [
    { label: 'Neue Geschichte', click: createStory },
    { label: 'Geschichte öffnen', click: openStory },
    { type: 'separator' },
    { label: 'Plotify beenden', role: 'quit' }
  ]
})

const createStory = (_, window, __) => {
  request(window, CREATE_STORY_REQUESTED)
}

const openStory = (_, window, __) => {
  request(window, OPEN_STORY_REQUESTED)
}

export default file
