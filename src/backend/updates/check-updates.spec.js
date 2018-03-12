import { LATEST_URL } from './constants'
import checkUpdates from './check-updates'
import { concat } from 'simple-get'

const latestFile = `{
  "stable": {
    "linux": {
      "version": "0.1.0",
      "url": "https://github.com/plotify/plotify/releases/tag/v0.1.0"
    },
    "macos": {
      "version": "0.1.0",
      "url": "https://github.com/plotify/plotify/releases/tag/v0.1.0"
    },
    "windows": {
      "version": "0.1.0",
      "url": "https://github.com/plotify/plotify/releases/tag/v0.1.0"
    }
  },
  "pre-release": {
    "linux": {
      "version": "0.2.0-alpha.2",
      "url": "https://github.com/plotify/plotify/releases/tag/v0.2.0-alpha.2"
    },
    "macos": {
      "version": "0.2.0-alpha.2",
      "url": "https://github.com/plotify/plotify/releases/tag/v0.2.0-alpha.2"
    },
    "windows": {
      "version": "0.2.0-alpha.2",
      "url": "https://github.com/plotify/plotify/releases/tag/v0.2.0-alpha.2"
    }
  }
}`
const latestFileSignature = Buffer.from('iQIcBAEBCAAGBQJabLhfAAoJEEkHbY86a/zUdBMP/AkdXb3wy4vOPbzgpKnnccKdpEqCJkotWLy/zrfzRLfUAaLfUimLtMifleuHM9vUZQg5pV061n2C4nXVvYMxZYYQFQdYjP/sx8UdIeY9sjX+DfaF6KvDAOuO+/Vv6fMLAyfDf7cgq/mjCKv6P77vnIjx+puIYixUs4iqUrwiEbU1TxLH+QlfNDp5CgKHvdyVq50rNHbmdwiuneXByB21JBc9mBkuWrp47YLhrbzc9Pa/3sHXY0f1sVPitQN26kKLGnQqq0ARu4Xn6/m37YUkVeNWxwbqSkU6eL93sc54wQk72wc9Shy36bd3T8H4TH1bzPXee5aBpJ+A5UOm6XBIgIRLGrG4Tnf77+DbsIqUPFgSpDg7UEYUkQGL0X7l7BI9Ebv3TjoUppLzqv+FhB0Fcm0HdFVNo08f1CYx3MYwH2WX4DyrUOuLSShcZ1UKjSSQOtgblAmcYbkFHDSa+P4AWI+Dlc+B3jHwDWaPBlIZ2dMqa3ukILUI8ecVUiZQ+e93PxTO/FOo7TmJ7XU0wPdUCJPuxsoVx9eOYdVb+TDfv1O+m80IhSIBqpUMWeSN+64O1/mutpo/oPrFn4g93blvaTkLECLKzJwoWiUI3C0ACOFE3uZjOEes0kY3SFe1vnarhO9/PpIJS+HIPHy8iygpNBwc1G5xD+F8KMKMoqd2DwAX', 'base64')
const unknownLatestFileSignature = Buffer.from('iQEcBAEBCAAGBQJajHIkAAoJECnoESUQK/BeoegIAJwIAbM53bynw65/jbhL+hBpe8q9y77G7UcXalZOG9haX3e8cYlfBMsajSaoYVpJ4O73v+dw48BFZ8Q2w6tlh/Ll4Bs7qz21mA61N2YN1p5/tERqVgUYamo3KZgUa9mCbQhSqxbGKBKVsU/LE3wwRffBfjfDDAGh9sujP6ri5xzawyyTLa34hzs83cIXZkm7DNY47GJYblvwxex1DPKAiowbeFKb0D1EzOS+DNH3tOj1iksyPq4a65qHwzvCaKIHzjWH41NxYGiR9MVkfCbkCpP9tA/4E7E7yzG2EutneR9BT4twSjGIkl7Va21viUjLJ256CUZS/TDrO5GIBcJnJNU=', 'base64')

beforeEach(() => mockRequests())

test('returns null if no update is available', async () => {
  await expect(checkUpdates('0.1.0')).resolves.toBeNull()
  await expect(checkUpdates('0.2.0-alpha.2')).resolves.toBeNull()
})

test('returns new stable version if an update is available', async () => {
  const expected = {
    version: '0.1.0',
    url: 'https://github.com/plotify/plotify/releases/tag/v0.1.0'
  }
  await expect(checkUpdates('0.0.1')).resolves.toEqual(expected)
})

test('returns new pre-release version if an update is available', async () => {
  const expected = {
    version: '0.2.0-alpha.2',
    url: 'https://github.com/plotify/plotify/releases/tag/v0.2.0-alpha.2'
  }
  await expect(checkUpdates('0.2.0-alpha.1')).resolves.toEqual(expected)
})

test('throws Error if the server sends invalid file or signature', async () => {
  mockRequests(latestFile + ' ')
  await expect(checkUpdates('0.0.1')).rejects.toThrow('Invalid signature.')
})

test('throws Error if the server sends unknown signature', async () => {
  mockRequests(latestFile, unknownLatestFileSignature)
  await expect(checkUpdates('0.0.1')).rejects.toThrow('Invalid signature.')
})

const mockRequests = (file = latestFile, signature = latestFileSignature) => {
  concat.mockImplementation((url, callback) => {
    const result = { statusCode: 200 }
    const data = url === LATEST_URL ? Buffer.from(file) : Buffer.from(signature)
    callback(null, result, data)
  })
}
