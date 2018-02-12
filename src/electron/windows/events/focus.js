import { setWindowFocusStatus, windowFocusChanged } from '../actions'

const handleFocus = (event) => (dispatch) => {
  const window = event.sender
  dispatch(setWindowFocusStatus(window.id, true))
  dispatch(windowFocusChanged())
}

export default handleFocus
