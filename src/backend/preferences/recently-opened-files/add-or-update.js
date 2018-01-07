import { getRecentlyOpenedFiles } from './'
import { validateDatabase } from '../../shared/validation'

const addSql = `
  INSERT INTO recently_opened_files
  (path, last_opened, pinned)
  VALUES (?, ?, ?)
`

const updateSql = `
  UPDATE recently_opened_files
  SET last_opened = ?,
      pinned = ?
  WHERE path = ?
`

const addOrUpdate = async (database, file) => {
  validateDatabase(database)
  validateFile(file)
  const transaction = await database.beginTransaction()
  try {
    const currentFile = await findFile(transaction, file)
    const updatedFile = { ...currentFile, ...file }
    if (containsChanges(currentFile, updatedFile)) {
      await handleChanges(transaction, currentFile, updatedFile)
    } else {
      await transaction.rollback()
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const validateFile = (file) => {
  if (typeof file.path !== 'string' || file.path.length === 0) {
    throw new TypeError('Missing path.')
  }
}

const findFile = async (transaction, file) => {
  const files = await getRecentlyOpenedFiles(transaction)
  const result = files.filter((singleFile) => singleFile.path === file.path)
  if (result.length > 0) {
    return result[0]
  } else {
    return null
  }
}

const containsChanges = (currentFile, updatedFile) => {
  validateCompleteFile(updatedFile)
  return currentFile === null ||
    currentFile.path !== updatedFile.path ||
    currentFile.lastOpened !== updatedFile.lastOpened ||
    currentFile.pinned !== updatedFile.pinned
}

const validateCompleteFile = (file) => {
  validateFile(file)
  if (typeof file.lastOpened !== 'string' || file.lastOpened.length === 0) {
    throw new TypeError('Missing lastOpened.')
  }
  if (typeof file.pinned !== 'boolean') {
    throw new TypeError('Missing pinned.')
  }
}

const handleChanges = async (transaction, currentFile, updatedFile) => {
  const params = [updatedFile.lastOpened, updatedFile.pinned ? 1 : 0]
  if (currentFile) {
    params.push(updatedFile.path)
    await transaction.run(updateSql, params)
  } else {
    params.unshift(updatedFile.path)
    await transaction.run(addSql, params)
  }
  await transaction.commit()
}

export default addOrUpdate
