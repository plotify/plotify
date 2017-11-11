import { openAboutDialog } from './actions'
import { eventHandler } from '../shared/communication'
import { OPEN_ABOUT_DIALOG_REQUESTED } from '../../shared/about/events'

const handleOpenAboutDialogRequested = (dispatch) => {
  dispatch(openAboutDialog())
}

const registerEventHandlers = () => {
  eventHandler(OPEN_ABOUT_DIALOG_REQUESTED, handleOpenAboutDialogRequested)
}

export default registerEventHandlers
