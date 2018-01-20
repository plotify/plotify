import { addOrUpdateRecentlyOpenedFile } from './'

export const pinRecentlyOpenedFile = async (preferences, path) => {
  await pinOrUnpinRecentlyOpenedFile(preferences, path, true)
}

export const unpinRecentlyOpenedFile = async (preferences, path) => {
  await pinOrUnpinRecentlyOpenedFile(preferences, path, false)
}

const pinOrUnpinRecentlyOpenedFile = async (preferences, path, pinned) => {
  const lastOpened = new Date().toISOString()
  const file = { path, lastOpened, pinned }
  await addOrUpdateRecentlyOpenedFile(preferences, file)
}
