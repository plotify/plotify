import { LATEST_SIG_URL, LATEST_URL } from './constants'
import { cleartext, signature, verify } from 'openpgp'

import { releases } from '../public-keys'
import request from '../shared/request'
import validateLatestVersions from './validate-latest-versions'

const loadLatestVersions = async () => {
  const file = await loadFile()
  const signature = await loadSignature()
  await verifySignature(file, signature)
  return parseFile(file)
}

const loadFile = async () => {
  return request(LATEST_URL)
}

const loadSignature = async () => {
  const options = {
    method: 'GET',
    uri: LATEST_SIG_URL,
    encoding: null
  }
  const content = await request(options)
  return signature.read(new Uint8Array(content))
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
