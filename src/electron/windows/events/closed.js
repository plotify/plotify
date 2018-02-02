import { removeWindow } from '../actions'

const handleClosed = (event) => (dispatch, getState) => {
  dispatch(removeWindow(event.sender))
}

export default handleClosed
