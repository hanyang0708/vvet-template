// The built directory structure
//
// ├─┬ dist
// │ ├─┬ electron
// │ │ ├─┬ main
// │ │ │ └── index.js
// │ │ └─┬ preload
// │ │   └── index.js
// │ ├── index.html
// │ ├── ...other-static-files-from-public
// │
process.env.DIST = join(__dirname, '../..');
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST, '../public');

import { app, BrowserWindow, shell, ipcMain, screen, Menu } from 'electron';
import { release } from 'os';
import { join } from 'path';
import windowHello from './modules/windowHello';

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js');
const url = process.env.VITE_DEV_SERVER_URL as string;
const indexHtml = join(process.env.DIST, 'index.html');

function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    Menu.setApplicationMenu(null);

    win = new BrowserWindow({
        icon: join(process.env.PUBLIC, 'favicon.ico'),
        width: width,
        height: height,
        webPreferences: {
            preload,
        },
    });

    if (app.isPackaged) {
        win.loadFile(indexHtml).then(r => r);
    } else {
        win.loadURL(url).then(r => r);
        win.webContents.openDevTools();
    }

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url).then(r => {});
        return { action: 'deny' };
    });

    /** 扩展方法*/
    windowHello();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    win = null;
    if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore();
        win.focus();
    }
});

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    } else {
        createWindow();
    }
});

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            preload,
        },
    });

    if (app.isPackaged) {
        childWindow.loadFile(indexHtml, {hash: arg}).then(r => r);
    } else {
        childWindow.loadURL(`${url}/#${arg}`).then(r => r);
        // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
    }
});
