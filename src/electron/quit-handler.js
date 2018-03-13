import { app } from 'electron'
import { closePreferences } from './preferences'
import store from './store'

// Wenn Plotify beendet wird, werden als erstes alle Fenster geschlossen.
// Wenn in einem Fenster eine Geschichte geöffnet ist,
// wird das Beenden von Plotify unterbrochen, um zuerst die Geschichte zu schließen.
// Anschließend wird das Fenter geschlossen und das window-all-closed-Event ausgelöst.
// Dieses Event löst dann das erneute Beenden von Plotify aus.
// Damit unter macOS in diesem Fall Plotify beendet wird, wird über die Variable 'quit'
// durch das before-quit-Event gespeichert, dass Plotify beendet werden soll.
// Wenn diese Variable nicht gesetzt ist, wird Plotify unter macOS nicht durch das
// window-all-closed-Event beendet.
// Dies ist beispielsweise dann der Fall, wenn alle Fenster manuell durch den Benutzer
// geschlossen worden sind. In diesem Fall soll Plotify unter macOS nicht beendet werden.
// Siehe: https://github.com/plotify/plotify/issues/123

let quit = false

app.on('before-quit', () => {
  quit = true
})

app.on('will-quit', async () => {
  try {
    await store.dispatch(closePreferences())
  } catch (error) {
    console.log('Fehler beim Schließen der Einstellungen:', error)
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin' || quit) {
    app.quit()
  }
})
