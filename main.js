const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let launcherWindow

function createWindow () {
  launcherWindow = new BrowserWindow({width:1000, height: 500, icon: "icon.png", show: false})

  launcherWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'window.html'),
    protocol: 'file:',
    slashes: true
  }))

  launcherWindow.once("ready-to-show", () => 
  {
    launcherWindow.show();
  });

  launcherWindow.on('closed', function () {
    launcherWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (launcherWindow === null) {
    createWindow()
  }
})