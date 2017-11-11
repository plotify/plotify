let currentStore = null

export const getStore = () => (currentStore)

export const setStore = (store) => {
  currentStore = store
}
