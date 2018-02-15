export const isUpdateNotificationOpen = (state) =>
  state.updates.open === true

export const getUpdateNotificationUrl = (state) =>
  state.updates.url
