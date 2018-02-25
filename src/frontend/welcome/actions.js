import { WELCOME_SECTION } from './constants'
import { getRecentlyOpenedFiles } from './recently-opened-files/actions'
import { setSection } from '../navigation/actions'

export const openWelcomeSection = () => (dispatch) => {
  dispatch(setSection(WELCOME_SECTION))
  dispatch(getRecentlyOpenedFiles())
}
