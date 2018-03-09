import { shell } from 'electron'
import { showMessageBox } from '../shared/dialog'

const title = 'Mitwirkende'
const message = title
const detail = `Sebastian Schmidt (Projektleitung & Entwicklung)

Jasper Meyer (Entwicklung)

Gesa Müller (Logo-Design & Qualitätssicherung)

Rebecca Rademacher (Qualitätssicherung)
`

const gitContributors = 'https://github.com/plotify/plotify/graphs/contributors'

const options = {
  title,
  message,
  detail,
  buttons: [
    'Mitwirkende auf GitHub',
    'Schließen'
  ],
  defaultId: 1,
  cancelId: 1,
  noLink: true
}

export default async (window) => {
  const button = await showMessageBox(window, options)
  if (button === 0) {
    shell.openExternal(gitContributors)
  }
}
