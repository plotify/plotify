import { OPEN_STORY_FINISHED, OPEN_STORY_REQUESTED } from '../shared/story/requests'
import { request, requestHandlerOnce } from './shared/communication'

import isDev from 'electron-is-dev'

const openStoryOnStartup = (macOsStoryPath) => {
  return new Promise((resolve, reject) => {
    if (macOsStoryPath) {
      openStory(resolve, macOsStoryPath)
    } else if (!isDev && process.argv.length > 1) {
      openStory(resolve)
    } else {
      resolve()
    }
  })
}

const openStory = (resolve, macOsStoryPath) => {
  requestHandlerOnce(OPEN_STORY_FINISHED, () => {
    resolve()
  })

  if (macOsStoryPath) {
    request(OPEN_STORY_REQUESTED, macOsStoryPath)
  } else {
    const args = process.argv.slice(1)
    const path = args.join('')
    request(OPEN_STORY_REQUESTED, path)
  }
}

export default openStoryOnStartup
