import { removeWindow } from '../windows'

const handleClosed = (event) => {
  removeWindow(event.sender)
}

export default handleClosed
