import { OPEN_STORY_FINISHED, OPEN_STORY_REQUESTED } from '../shared/story/requests'
import { request, requestHandlerOnce } from './shared/communication'

import isDev from 'electron-is-dev'

const openStoryOnStartup = () => {
  return new Promise((resolve, reject) => {
    if (!isDev && process.argv.length > 1) {
      openStory(resolve)
    } else {
      resolve()
    }
  })
}

const openStory = (resolve) => {
  requestHandlerOnce(OPEN_STORY_FINISHED, () => {
    resolve()
  })

  const args = process.argv.slice(1)
  const path = args.join('')
  request(OPEN_STORY_REQUESTED, path)
}

export default openStoryOnStartup
