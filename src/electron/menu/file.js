import { CREATE_STORY_REQUESTED, OPEN_STORY_REQUESTED } from '../../shared/story/requests'

import { getRecentlyOpenedFiles } from '../preferences'
import { request } from '../shared/communication'

const file = async () => ({
  label: 'Datei',
  submenu: [
    { label: 'Neu...', click: createStory },
    { label: 'Öffnen...', click: openStory },
    {
      label: 'Zuletzt geöffnet',
      submenu: await recentFilesMenu()
    },
    { type: 'separator' }
  ]
})

const createStory = (_, window, __) => {
  request(window, CREATE_STORY_REQUESTED)
}

const openStory = (_, window, __, payload) => {
  console.log('OPEN STORY', payload)
  request(window, OPEN_STORY_REQUESTED, payload)
}

const recentFilesMenu = async () => {
  const recentFiles = await getRecentlyOpenedFiles()
  if (recentFiles.length === 0) {
    return [{ label: 'Keine', enabled: false }]
  }
  const submenu = recentFiles.map((file) => (
    {
      label: file.path,
      click: (_, window, __) => openStory(_, window, __, file.path)
    })
  )
  return submenu
}

export default file
