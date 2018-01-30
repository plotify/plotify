import { CHANNEL_PRE_RELEASE, CHANNEL_STABLE, PLATFORM_LINUX, PLATFORM_MACOS, PLATFORM_WINDOWS } from './constants'

import { URL } from 'url'
import { valid } from 'semver'

const validate = (latestVersions) => {
  if (typeof latestVersions !== 'object') {
    throw new TypeError('Argument must be an object.')
  }
  validateChannel(latestVersions, CHANNEL_STABLE)
  validateChannel(latestVersions, CHANNEL_PRE_RELEASE)
}

const validateChannel = (latestVersions, name) => {
  const channel = latestVersions[name]
  if (channel === undefined) {
    throw new TypeError('Missing channel: ' + name)
  }
  if (typeof channel !== 'object') {
    throw new TypeError('Channel must be an object.')
  }
  validatePlatform(channel, PLATFORM_LINUX)
  validatePlatform(channel, PLATFORM_MACOS)
  validatePlatform(channel, PLATFORM_WINDOWS)
}

const validatePlatform = (channel, name) => {
  const platform = channel[name]
  if (platform === undefined) {
    throw new TypeError('Missing platform: ' + name)
  }
  if (typeof platform !== 'object') {
    throw new TypeError('Platform must be an object.')
  }
  if (platform.version === undefined) {
    throw new TypeError('Missing version.')
  }
  if (valid(platform.version) === null) {
    throw new TypeError('Invalid version: ' + platform.version)
  }
  if (platform.url === undefined || new URL(platform.url) === null) {
    throw new TypeError('Missing URL.')
  }
}

export default validate
