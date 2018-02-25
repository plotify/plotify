import { removeWindow } from '../actions'

const handleClosed = (event) => (dispatch) => {
  dispatch(removeWindow(event.sender))
}

export default handleClosed
