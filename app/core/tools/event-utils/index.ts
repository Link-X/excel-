import { ipcMain } from 'electron'

export const electronOnEvent = (name, cb) => {
  ipcMain.on(name, async (event, arg) => {
    try {
      const data = await cb(event, arg)
      event.reply('eventSuccess', data)
    } catch (err) {
      event.reply('eventErr', err)
    }
  })
}
