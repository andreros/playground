const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function () {
    const WINDOW_WIDTH = 640;
    const WINDOW_HEIGHT = 510;

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        minWidth: WINDOW_WIDTH,
        minHeight: WINDOW_HEIGHT,
        maxWidth: WINDOW_WIDTH,
        maxHeight: WINDOW_HEIGHT
    });

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit();
});
