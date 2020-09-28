const { app, BrowserWindow, ipcMain } = require('electron');
const development = process.argv.includes('--development') ? true : false;
const url = require('url');
const path = require('path')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.on('ready', () => {

    const mainWindow = new BrowserWindow({
        width: 1024,
        frame: false,
        height: 768,
        webPreferences: {
            nodeIntegration: true
        }
    })
    // Erstelle das Browser-Fenster.
    // and load the index.html of the app.
    
    ipcMain.handle('window.minimize', ()=>{
        mainWindow.minimize();
    });
    ipcMain.handle('window.maximize', ()=>{
        mainWindow.maximize();
    });    
    ipcMain.handle('window.unmaximize', ()=>{
        mainWindow.unmaximize();
    }); 
    ipcMain.handle('window.close', ()=>{
        mainWindow.close();
    });



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
});