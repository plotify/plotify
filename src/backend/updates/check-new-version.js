import { CHANNEL_PRE_RELEASE, CHANNEL_STABLE, PLATFORM_LINUX, PLATFORM_MACOS, PLATFORM_WINDOWS } from './constants'
import { gt, prerelease, satisfies, valid } from 'semver'

import validateLatestVersions from './validate-latest-versions'

const check = (latestVersions, currentVersion, platformNode) => {
  validateLatestVersions(latestVersions)
  validateCurrentVersion(currentVersion)
  const platform = transformPlatform(platformNode)
  const channels = determineChannels(currentVersion)
  return checkNewVersions(latestVersions, currentVersion, platform, channels)
}

const validateCurrentVersion = (version) => {
  if (valid(version) === null) {
    throw new TypeError('Invalid current version: ' + version)
  }
}

const transformPlatform = (platform) => {
  switch (platform) {
    case 'linux':
      return PLATFORM_LINUX
    case 'darwin':
      return PLATFORM_MACOS
    case 'win32':
      return PLATFORM_WINDOWS
    default:
      throw new Error('Unsupported platform: ' + platform)
  }
}

const determineChannels = (currentVersion) => {
  const preReleaseComponents = prerelease(currentVersion)
  if (preReleaseComponents === null) {
    return [CHANNEL_STABLE]
  } else if (preReleaseComponents[0].toUpperCase() !== 'SNAPSHOT') {
    return [CHANNEL_PRE_RELEASE, CHANNEL_STABLE]
  } else {
    return []
  }
}

const checkNewVersions = (latestVersions, currentVersion, platform, channels) => {
  let newVersions = []
  for (const channel of channels) {
    const version = latestVersions[channel][platform]
    if (satisfies(version.version, '>' + currentVersion)) {
      newVersions.push(version)
    }
  }

  let newVersion = null
  for (const version of newVersions) {
    if (newVersion === null || gt(version.version, newVersion.version)) {
      newVersion = version
    }
  }
  return newVersion
}

export default check
