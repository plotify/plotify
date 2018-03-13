import { LATEST_SIG_URL, LATEST_URL } from './constants'
import { cleartext, signature, verify } from 'openpgp'

import { get } from '../../shared/http'
import { releases } from '../public-keys'
import validateLatestVersions from './validate-latest-versions'

const loadLatestVersions = async () => {
  const file = await loadFile()
  const signature = await loadSignature()
  await verifySignature(file, signature)
  return parseFile(file)
}

const loadFile = async () => {
  const result = await get(LATEST_URL)
  return result.toString()
}

const loadSignature = async () => {
  const result = await get(LATEST_SIG_URL)
  return signature.read(new Uint8Array(result))
}
const verifySignature = async (file, signature) => {
  const message = new cleartext.CleartextMessage(file, signature)
  const options = { publicKeys: releases, message, signature }
  const verified = await verify(options)
  if (verified.signatures[0].valid !== true) {
    throw new Error('Invalid signature.')
  }
}

const parseFile = (file) => {
  try {
    const json = JSON.parse(file)
    validateLatestVersions(json)
    return json
  } catch (error) {
    throw new Error('Invalid latest versions: ' + error)
  }
}

export default loadLatestVersions
