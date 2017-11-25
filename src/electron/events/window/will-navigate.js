import { URL } from 'url'

const handleWillNavigate = (event, url) => {
  try {
    const hostname = new URL(url).hostname
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      event.preventDefault()
    }
  } catch (error) {
    event.preventDefault()
    throw error
  }
}

export default handleWillNavigate
