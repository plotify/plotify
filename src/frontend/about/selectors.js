export const isAboutDialogOpen = (state) => (
  state.about.aboutOpen === true
)

export const isContributorsDialogOpen = (state) => (
  state.about.contributorsOpen === true
)

export const isLicenseDialogOpen = (state) => (
  state.about.licenseOpen === true
)

export const getLicenseText = (state) => (
  state.about.licenseText
)
