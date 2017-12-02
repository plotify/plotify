import { URL } from 'url'
import { shell } from 'electron'

const handleNewWindow = (event, url) => {
  event.preventDefault()
  const protocol = new URL(url).protocol
  if (protocol === 'https:' || protocol === 'http:') {
    shell.openExternal(url)
  }
}

export default handleNewWindow
