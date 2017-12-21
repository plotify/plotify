import create from './create'

let splashScreen = null
let loading = 0

export const showSplashScreen = () => {
  if (splashScreen === null) {
    splashScreen = create()
  } else {
    splashScreen.restore()
    splashScreen.focus()
  }
  loading++
  return splashScreen
}

export const closeSplashScreen = () => {
  loading--
  if (loading <= 0) {
    loading = 0
    if (splashScreen) {
      splashScreen.close()
      splashScreen = null
    }
  }
}
