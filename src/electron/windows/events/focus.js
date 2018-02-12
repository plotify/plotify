import { setWindowFocusStatus } from '../actions'

const handleFocus = (event) => (dispatch) => {
  const window = event.sender
  dispatch(setWindowFocusStatus(window.id, true))
}

export default handleFocus
