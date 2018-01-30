import checkNewVersion from './check-new-version'
import loadLatestVersions from './load-latest-versions'
import os from 'os'

const checkUpdates = async (currentVersion) => {
  const latestVersions = await loadLatestVersions()
  const platform = os.platform()
  return checkNewVersion(latestVersions, currentVersion, platform)
}

export default checkUpdates
