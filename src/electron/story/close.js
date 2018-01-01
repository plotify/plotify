import { getStoryByWindow, removeStoryByWindow } from './current'

const close = async (window) => {
  const story = getStoryByWindow(window)
  try {
    if (story) {
      await story.close()
    }
  } finally {
    removeStoryByWindow(window)
    window.destroy()
  }
}

export default close
