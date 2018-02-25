import { setWindowFocusStatus, windowFocusChanged } from '../actions'

const handleBlur = (event) => (dispatch) => {
  const window = event.sender
  dispatch(setWindowFocusStatus(window.id, false))
  dispatch(windowFocusChanged())
}

export default handleBlur
