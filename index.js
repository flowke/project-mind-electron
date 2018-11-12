const { app, BrowserWindow, BrowserView } = require('electron')


function createWindow() {
  // 创建浏览器窗口
  let win = new BrowserWindow({ width: 1200, height: 800, })

  let view = new BrowserView({
    webPreferences: {
      nodeIntegration: false
    }
  })

  win.loadURL('http://localhost:6001/index.html')
  // win.loadURL('http://localhost:6002/mind.html')

}

app.on('ready', createWindow);