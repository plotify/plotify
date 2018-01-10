import { CREATE_STORY_REQUESTED, OPEN_STORY_REQUESTED } from '../../shared/story/requests'

import { getRecentlyOpenedFiles } from '../preferences'
import { request } from '../shared/communication'

const file = async () => {
  if (process.platform === 'darwin') {
    return darwin()
  } else {
    return win32()
  }
}

const win32 = async () => {
  const recentFiles = await recentFilesMenu()
  return {
    label: 'Datei',
    submenu: [
      { label: 'Neu...', click: createStory },
      { label: 'Öffnen...', click: openStory },
      { type: 'separator' },
      ...recentFiles,
      { type: 'separator' },
      { label: 'Beenden', role: 'quit' }
    ]
  }
}

const darwin = async () => ({
  label: 'Datei',
  submenu: [
    { label: 'Neue Geschichte', click: createStory },
    { label: 'Öffnen...', click: openStory },
    {
      label: 'Kürzlich geöffnet',
      submenu: await recentFilesMenu()
    }
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
