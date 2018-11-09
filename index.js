const { app, BrowserWindow, BrowserView } = require('electron')


function createWindow() {
  // 创建浏览器窗口
  let win = new BrowserWindow({ width: 800, height: 600, })

  let view = new BrowserView({
    webPreferences: {
      nodeIntegration: false
    }
  })

  win.loadFile('index.html')

}

app.on('ready', createWindow);