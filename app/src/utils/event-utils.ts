import { ipcRenderer } from 'electron'
export const viewSendEvent = (name, params = {}) => {
  return new Promise((res, rej) => {
    ipcRenderer.send(name, params)
    ipcRenderer.on('eventSuccess', (event, arg) => {
      res(arg)
      ipcRenderer.removeAllListeners('eventSuccess')
    })
    ipcRenderer.on('eventErr', (event, err) => {
      rej(err)
      ipcRenderer.removeAllListeners('eventErr')
      ipcRenderer.removeAllListeners('eventSuccess')
    })
  })
}
