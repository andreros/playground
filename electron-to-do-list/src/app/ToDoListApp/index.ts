import { BrowserWindow, Menu, app, ipcMain } from 'electron';
import { AddTaskWindow } from '../AddTaskWindow';
import { MainMenu } from '../mainMenu';
import { Window } from '../window';
import { Constants } from '../constants';

export class ToDoListApp {

    private app: Electron.App;
    private appMainMenu: Electron.Menu;
    private appMainWindow: Electron.BrowserWindow;
    private addTaskWindow: AddTaskWindow;
    private mainMenu: MainMenu;
    private ipcMain: Electron.IpcMain;

    /**
     * Class constructor.
     */
    constructor() {
        this.app = app;
        this.mainMenu = new MainMenu(this);
        this.ipcMain = ipcMain;
        this.registerEvents();
    }

    /**
     * Event handlers object.
     */
    private handlers = (): any => {
        return {
            appReady: {
                event: 'ready',
                callback: this.onApplicationReady
            },
            mainWindowClose: {
                event: 'close',
                callback: this.onMainWindowClose
            },
            windowAllClosed: {
                event: 'window-all-closed',
                callback: this.onWindowAllClosed
            },
            taskAdd: {
                event: Constants.EVENTS.TASKS.ADD,
                callback: this.onTaskAdd
            },
            taskAddWindowClose: {
                event: Constants.EVENTS.TASKS.CLOSE_ADD_WINDOW,
                callback: this.onTaskAddWindowClose
            }
        };
    }

    /**
     * Method responsible for registering the To Do List class events.
     */
    private registerEvents = (): void => {
        this.app.on(this.handlers().appReady.event, this.handlers().appReady.callback);
        this.app.on(this.handlers().windowAllClosed.event, this.handlers().windowAllClosed.callback);
        this.ipcMain.on(this.handlers().taskAdd.event, this.handlers().taskAdd.callback);
        this.ipcMain.on(this.handlers().taskAddWindowClose.event, this.handlers().taskAddWindowClose.callback);
    }

    /**
     * Add Task window getter.
     */
    public getAddTaskWindow = (): AddTaskWindow => {
        return this.addTaskWindow;
    }

    /**
     * Add Task window setter.
     */
    public setAddTaskWindow = (addTaskWindow: AddTaskWindow): void => {
        this.addTaskWindow = addTaskWindow;
    }

    /**
     * Method responsible for quitting the To Do List application.
     */
    public quit = (): void => {
        this.app.quit();
    }

    /**************************************************************************************************************************************/
    /* Event handlers
    /**************************************************************************************************************************************/

    /**
     * Event handler for the application "ready" event.
     */
    private onApplicationReady = (): void => {
        this.appMainWindow = Window.getWindow({
            width: 1366,
            height: 768,
            target: 'app/ToDoListApp/index.html'
        });
        this.appMainWindow.on(this.handlers().mainWindowClose.event, this.handlers().mainWindowClose.callback);
        this.appMainMenu = Menu.buildFromTemplate(this.mainMenu.getMainMenu());
        Menu.setApplicationMenu(this.appMainMenu);

        this.appMainWindow.webContents.openDevTools();
    }

    /**
     * Event handler for the main window "close" event.
     */
    private onMainWindowClose = (): void => {
        this.quit();
    }

    /**
     * Event handler for the application "window-all-closed" event.
     */
    private onWindowAllClosed = (): void => {
        this.quit();
    }

    /**
     * Event handler for the add task event.
     */
    private onTaskAdd = (e: Event, args: any): void => {
        this.appMainWindow.webContents.send(Constants.EVENTS.TASKS.ADD, args);
    }

    /**
     * Event handler for the add task window close event.
     */
    private onTaskAddWindowClose = (e: Event, args: any): void => {
        this.addTaskWindow.close();
    }

}
