const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');
const { autoUpdater, AppUpdater } = require('electron-updater');

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let win;

const showMSGGUI = (chanel, ...msg) => {
    win.webContents.send(chanel, msg);
};

app.on('ready', () => {

    setUpdaterListners();

    win = new BrowserWindow({
        show: false,
        backgroundColor: 'lightgrey',
        width: 1200,
webPreferences: {
    preload: join(__dirname, "./client/preload.js"),
}
});


win.on('ready-to-show', () => {
    win.show();
    win.webContents.openDevTools();
    showMSGGUI('version', app.getVersion())
    showMSGGUI('update', 'checking for update');
    autoUpdater.checkForUpdates();
});

win.loadFile('./client/index.html');
});

const setUpdaterListners = () => {
    autoUpdater.on('update-available', (info) => {
        showMSGGUI('update', 'update-available', info);
        const path = autoUpdater.downloadUpdate();
        showMSGGUI('update', path);
    });
    
    autoUpdater.on('update-not-available', (info) => {
        showMSGGUI('update', 'update-not-available', info);
    });
      
    autoUpdater.on('update-downloaded', (info) => {
        showMSGGUI('update', 'update-downloaded', info);
    });
    
    autoUpdater.on('error', (info) => {
        showMSGGUI('update', 'error', info);
    });
}


