import { ipcMain, dialog } from 'electron'
import xlsx from 'node-xlsx'
import fs from 'fs'

const excludeSpecial = (s) => {
  if (!s) {
    return s
  }
  // 去掉转义字符
  let str = String(s)
  str = str.replace(/[\'\"\\\/\b\f\n\r\t]/g, '')
  // 去掉特殊字符
  str = str.replace(/[\@\#\$\%\^\&\*\(\)\{\}\:\"\L\<\>\?\[\]]/, '')
  return str
}

const transData = (list) => {
  if (!(list && list.length)) {
    return
  }
  list.forEach((v, i) => {
    if (!(list[i].data && list[i].data.length)) {
      return
    }
    list[i].data = list[i].data.map((j) => {
      const copeJ = JSON.parse(JSON.stringify(j)).map((k) => {
        return excludeSpecial(k)
      })
      return copeJ
    })
  })
  return list
}

const savsFile = (filePath, buffer) => {
  fs.stat(filePath, (err, data) => {
    if (!err) {
      fs.unlinkSync(filePath)
    }
    fs.writeFileSync(filePath, buffer)
  })
}

export const fileSend = () => {
  ipcMain.on('fileSend', (event, arg) => {
    const filsList = xlsx.parse(arg)

    const buffer = xlsx.build(transData(filsList)) // Returns a buffer
    // console.log(buffer)
    const fileName = `${new Date().getTime()}.xlsx`
    dialog
      .showSaveDialog(undefined, {
        properties: ['createDirectory', 'showHiddenFiles'],
        defaultPath: fileName,
        filters: [
          { name: '.xlsx', extensions: ['xlsx'] },
          { name: '.xls', extensions: ['xls'] },
        ],
      })
      .then((res) => {
        if (!res.canceled) {
          savsFile(res.filePath, buffer)
          event.reply('saveSuccess')
        }
      })
  })
}
