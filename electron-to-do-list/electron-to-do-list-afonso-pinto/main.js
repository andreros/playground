const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

// Set ENV
process.env.NODE_ENV = 'production';

//Listen for app to be ready
app.on('ready', function () {

    //Create new window
    mainWindow = new BrowserWindow({});

    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    // Quit app when closed
    mainWindow.on('closed', function () {
        app.quit();
    })

    // Build Menu from template

    const  mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert Menu
    Menu.setApplicationMenu(mainMenu);

});


// Handle Create Add Window

function createAddWindow() {

    //Create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Task'
    });

    //Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    
    //Garbage collection handle
    addWindow.on('close', function () {
        addWindow = null;
    });


}

//Catch task: add
ipcMain.on('task:add', function (e, task) {
    console.log(task);
    mainWindow.webContents.send('task:add', task);
    addWindow.close();
})

// Create Menu Template

const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label: 'Add Task',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Tasks',
                click(){
                    mainWindow.webContents.send('task:clear');
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q': 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
]

// if mac add empty object to menu

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in prod
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I': 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}