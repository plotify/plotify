// key: BrowserWindow, value: Story
const stories = new Map()

export const getStories = () => {
  return stories.values()
}

export const setStoryOfWindow = (browserWindow, story) => {
  stories.set(browserWindow, story)
}

export const removeStoryByWindow = (browserWindow) => {
  return stories.delete(browserWindow)
}

export const getStoryByWindow = (browserWindow) => {
  return stories.get(browserWindow)
}
