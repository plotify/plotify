import { CREATE_STORY_REQUESTED, OPEN_STORY_REQUESTED } from '../../shared/story/requests'

import { request } from '../shared/communication'

const file = () => ({
  label: 'Datei',
  submenu: [
    { label: 'Neu...', click: createStory },
    { label: 'Öffnen...', click: openStory },
    { type: 'separator' },
    { label: 'Beenden', role: 'quit' }
  ]
})

const createStory = (_, window, __) => {
  request(window, CREATE_STORY_REQUESTED)
}

const openStory = (_, window, __) => {
  request(window, OPEN_STORY_REQUESTED)
}

export default file
