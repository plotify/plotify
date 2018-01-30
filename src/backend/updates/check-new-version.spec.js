import check from './check-new-version'

const latestVersions = {
  'stable': {
    'linux': {
      'version': '0.2.0',
      'url': 'https://github.com/plotify/plotify/releases/tag/v0.2.0'
    },
    'macos': {
      'version': '0.2.0',
      'url': 'https://github.com/plotify/plotify/releases/tag/v0.2.0'
    },
    'windows': {
      'version': '0.2.0',
      'url': 'https://github.com/plotify/plotify/releases/tag/v0.2.0'
    }
  },
  'pre-release': {
    'linux': {
      'version': '0.3.0-alpha.2',
      'url': 'https://github.com/plotify/plotify/releases/tag/v0.3.0-alpha.2'
    },
    'macos': {
      'version': '0.3.0-alpha.2',
      'url': 'https://github.com/plotify/plotify/releases/tag/v0.3.0-alpha.2'
    },
    'windows': {
      'version': '0.3.0-alpha.2',
      'url': 'https://github.com/plotify/plotify/releases/tag/v0.3.0-alpha.2'
    }
  }
}
const platform = 'linux'

describe('current version is pre-release', () => {
  test('returns null if current version is SNAPSHOT version', () => {
    expect(check(latestVersions, '0.1.0-SNAPSHOT', platform)).toBeNull()
  })

  test('returns null if current version is greater than latest stable and pre-release versions', () => {
    expect(check(latestVersions, '0.3.0-alpha.3', platform)).toBeNull()
  })

  test('returns null if current version is the latest pre-release version and not less than latest stable version', () => {
    expect(check(latestVersions, '0.3.0-alpha.2', platform)).toBeNull()
  })

  test('returns new pre-release version if current version is less than latest pre-release version', () => {
    const expected = latestVersions['pre-release'][platform]
    expect(check(latestVersions, '0.3.0-alpha.1', platform)).toEqual(expected)
  })

  test('returns new stable version if current version is less than latest stable version', () => {
    const expected = latestVersions.stable[platform]
    expect(check(latestVersions, '0.2.0-alpha.1', platform)).toEqual(expected)
  })

  test('returns new stable version if latest stable version is greater than current and latest pre-release versions', () => {
    const latestVersionsClone = JSON.parse(JSON.stringify(latestVersions))
    latestVersionsClone.stable[platform].version = '0.4.0'
    const expected = latestVersionsClone.stable[platform]
    expect(check(latestVersionsClone, '0.3.0-alpha.1', platform)).toEqual(expected)
  })
})

describe('current version is stable', () => {
  test('returns null if current version is greater than latest stable version', () => {
    expect(check(latestVersions, '0.3.0', 'darwin')).toBeNull()
  })

  test('returns null if current version is the latest stable version', () => {
    expect(check(latestVersions, '0.2.0', 'win32')).toBeNull()
  })

  test('returns new stable version if current version is less than latest stable version', () => {
    const expected = latestVersions.stable[platform]
    expect(check(latestVersions, '0.1.2', platform)).toEqual(expected)
  })
})

test('throws TypeError when called with invalid current version', () => {
  expect(() => check(latestVersions, '123', platform)).toThrow('Invalid current version: 123')
})

test('throws Error when called with unsupported platform', () => {
  expect(() => check(latestVersions, '1.2.3', 'unknown')).toThrow('Unsupported platform: unknown')
})
