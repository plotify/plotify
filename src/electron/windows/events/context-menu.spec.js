import { Menu } from 'electron'
import handleContextMenu from './context-menu'

let menu
beforeEach(() => {
  menu = {
    popup: jest.fn()
  }
  Menu.buildFromTemplate = jest.fn().mockReturnValue(menu)
})

describe('when context is editable', () => {
  test('opens context menu when text is selected', () => {
    handleContextMenu({}, { isEditable: true, selectionText: 'Hello' })
    expect(Menu.buildFromTemplate.mock.calls[0][0]).toEqual([
      { label: 'Ausschneiden', role: 'cut', enabled: true },
      { label: 'Kopieren', role: 'copy', enabled: true },
      { label: 'Einfügen', role: 'paste', enabled: true },
      { label: 'Alles auswählen', role: 'selectall' }
    ])
    expect(menu.popup.mock.calls.length).toBe(1)
  })

  test('opens context menu when no text is selected', () => {
    handleContextMenu({}, { isEditable: true, selectionText: '' })
    expect(Menu.buildFromTemplate.mock.calls[0][0]).toEqual([
      { label: 'Ausschneiden', role: 'cut', enabled: false },
      { label: 'Kopieren', role: 'copy', enabled: false },
      { label: 'Einfügen', role: 'paste', enabled: true },
      { label: 'Alles auswählen', role: 'selectall' }
    ])
    expect(menu.popup.mock.calls.length).toBe(1)
  })
})

describe('when context is not editable', () => {
  test('opens context menu when text is selected', () => {
    handleContextMenu({}, { isEditable: false, selectionText: 'Hello' })
    expect(Menu.buildFromTemplate.mock.calls[0][0]).toEqual([
      { label: 'Ausschneiden', role: 'cut', enabled: false },
      { label: 'Kopieren', role: 'copy', enabled: true },
      { label: 'Einfügen', role: 'paste', enabled: false },
      { label: 'Alles auswählen', role: 'selectall' }
    ])
    expect(menu.popup.mock.calls.length).toBe(1)
  })

  test('opens no context menu when no text is selected', () => {
    handleContextMenu({}, { isEditable: false, selectionText: '' })
    expect(Menu.buildFromTemplate.mock.calls.length).toBe(0)
    expect(menu.popup.mock.calls.length).toBe(0)
  })
})
