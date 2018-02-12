import { setWindowFocusStatus } from '../actions'

const handleBlur = (event) => (dispatch) => {
  const window = event.sender
  dispatch(setWindowFocusStatus(window.id, false))
}

export default handleBlur
