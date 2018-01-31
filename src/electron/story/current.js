import { removeWindowStoryPath, setWindowStoryPath } from '../windows'

// key: BrowserWindow, value: Story
const stories = new Map()

// key: BrowserWindow, value: boolean
const storiesLoading = new Map()

export const getStories = () => {
  return stories.values()
}

export const setStoryOfWindow = (browserWindow, story) => {
  stories.set(browserWindow, story)
  if (story) {
    setWindowStoryPath(browserWindow, story.path)
  } else {
    removeWindowStoryPath(browserWindow)
  }
}

export const removeStoryByWindow = (browserWindow) => {
  return stories.delete(browserWindow)
}

export const getStoryByWindow = (browserWindow) => {
  return stories.get(browserWindow)
}

export const isLoadingStory = (browserWindow) => {
  if (storiesLoading.has(browserWindow)) {
    return storiesLoading.get(browserWindow)
  } else {
    return false
  }
}

export const setLoadingStory = (browserWindow, loading) => {
  storiesLoading.set(browserWindow, loading)
}
