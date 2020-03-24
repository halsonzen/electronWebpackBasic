const { app, BrowserWindow, ipcMain } = require('electron')
const development = process.argv.includes('--development') ? true : false;
const url = require('url');
const path = require('path')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.on('ready', () => {

  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // Erstelle das Browser-Fenster.
  // and load the index.html of the app.

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  let indexPath = undefined;
  if (development) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    })    
    mainWindow.webContents.openDevTools()
  }
  if (!development) {
    indexPath = url.format({
      protocol: 'file',
      pathname: path.join(path.resolve('dist'), 'index.html'),
      slashes: true
    });
  }
  mainWindow.loadURL(indexPath);

  /**HANDLING */
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // Unter macOS ist es üblich, für Apps und ihre Menu Bar
    // aktiv zu bleiben, bis der Nutzer explizit mit Cmd + Q die App beendet.
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  /**  Possible second window integration
  
  const secondWindowFilePath = "./dist/warning.html"
  
  secondWindow.on('close', (e)=>{
    e.preventDefault(); // prevents electron from destroying the window
    secondWindow.hide(); // only hide the window so if we need it again showing is faster
  })

  const secondWindow = new BrowserWindow({
    frame: true,
    width: 300,
    height: 200,
    resizable: false,
    backgroundColor: 'white',
    show: false,
    icon: false,
    titel: false,
    autoHideMenuBar: true,
    modal: true,
    webPreferences: {
      nodeIntegration: true
    },
    // icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    parent: mainWindow
  })
  secondWindow.loadFile(secondWindowFilePath);  

  ipcMain.on('openWindow', () => {   
    secondWindow.show()
    //secondWindow.webContents.openDevTools()
  })

  */
  /**
   * TODO:
   * - Have a look if it also works for electron package
   * - install some kind of css framework
   * - extract scss maybe
   * - push to gitHub
   */
});