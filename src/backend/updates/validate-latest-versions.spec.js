import validate from './validate-latest-versions'

const valid = {
  'stable': {
    'linux': {
      'version': '0.1.0',
      'url': 'https://github.com/plotify/plotify/releases/tag/v0.1.0'
    },
    'macos': {
      'version': '0.1.0',
      'url': 'https://github.com/plotify/plotify/releases/tag/v0.1.0'
    },
    'windows': {
      'version': '0.1.0',
      'url': 'https://github.com/plotify/plotify/releases/tag/v0.1.0'
    }
  },
  'pre-release': {
    'linux': {
      'version': '0.2.0-alpha.2',
      'url': 'https://github.com/plotify/plotify/releases/tag/v0.2.0-alpha.2'
    },
    'macos': {
      'version': '0.2.0-alpha.2',
      'url': 'https://github.com/plotify/plotify/releases/tag/v0.2.0-alpha.2'
    },
    'windows': {
      'version': '0.2.0-alpha.2',
      'url': 'https://github.com/plotify/plotify/releases/tag/v0.2.0-alpha.2'
    }
  }
}

test('does nothing when called with valid object', () => {
  expect(() => validate(valid)).not.toThrow()
})

describe('throws TypeError when called with invalid argument', () => {
  test('without object as argument', () => {
    expect(() => validate(123)).toThrow('Argument must be an object.')
  })

  test('with missing channel', () => {
    const missingChannel = clone(valid)
    missingChannel.stable = undefined
    expect(() => validate(missingChannel)).toThrow('Missing channel: stable')
  })

  test('with invalid channel', () => {
    const invalidChannel = clone(valid)
    invalidChannel.stable = 123
    expect(() => validate(invalidChannel)).toThrow('Channel must be an object.')
  })

  test('with missing platform', () => {
    const missingPlatform = clone(valid)
    missingPlatform.stable.linux = undefined
    expect(() => validate(missingPlatform)).toThrow('Missing platform: linux')
  })

  test('with invalid platform', () => {
    const invalidPlatform = clone(valid)
    invalidPlatform.stable.linux = 123
    expect(() => validate(invalidPlatform)).toThrow('Platform must be an object.')
  })

  test('with missing version', () => {
    const missingVersion = clone(valid)
    missingVersion.stable.linux.version = undefined
    expect(() => validate(missingVersion)).toThrow('Missing version.')
  })

  test('with invalid version', () => {
    const invalidVersion = clone(valid)
    invalidVersion.stable.linux.version = '123'
    expect(() => validate(invalidVersion)).toThrow('Invalid version: 123')
  })

  test('with missing url', () => {
    const missingUrl = clone(valid)
    missingUrl.stable.linux.url = undefined
    expect(() => validate(missingUrl)).toThrow('Missing URL.')
  })

  test('with invalid url', () => {
    const invalidUrl = clone(valid)
    invalidUrl.stable.linux.url = '123'
    expect(() => validate(invalidUrl)).toThrow('Invalid URL: 123')
  })
})

const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
