import create from './create'

let splashScreen = null
let loading = 0
const listeners = new Set()

export const showSplashScreen = () => {
  if (splashScreen === null) {
    splashScreen = create()
    notifyListeners()
  } else {
    splashScreen.restore()
    splashScreen.focus()
  }
  loading++
  return splashScreen
}

export const focusSplashScreenIfExisting = () => {
  if (splashScreen !== null && loading > 0) {
    splashScreen.restore()
    splashScreen.focus()
  }
}

export const closeSplashScreen = () => {
  loading--
  if (loading <= 0) {
    loading = 0
    if (splashScreen) {
      splashScreen.close()
      splashScreen = null
      notifyListeners()
    }
  }
}

export const addListener = (listener) => {
  listeners.add(listener)
}

export const removeListener = (listener) => {
  listeners.delete(listener)
}

const notifyListeners = () => {
  const open = (splashScreen !== null)
  listeners.forEach((listener) => listener(open))
}
