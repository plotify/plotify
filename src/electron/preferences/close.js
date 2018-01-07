import { getPreferences } from './current'

const close = async () => {
  await getPreferences().close()
}

export default close
