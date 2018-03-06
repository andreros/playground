import { BrowserWindow, Menu, app, ipcMain } from 'electron';
import { AddTaskWindow } from '../AddTaskWindow';
import { AboutWindow } from '../AboutWindow';
import { MainMenu } from '../_helpers/MainMenu';
import { Request } from '../_helpers/Request';
import { Window } from '../_helpers/Window';
import { Constants } from '../constants';

export class ToDoListApp {

    private app: Electron.App;
    private appMainMenu: Electron.Menu;
    private appMainWindow: Electron.BrowserWindow;
    private addTaskWindow: AddTaskWindow;
    private aboutWindow: AboutWindow;
    private mainMenu: MainMenu;
    private ipcMain: Electron.IpcMain;

    /**
     * Class constructor.
     */
    constructor() {
        this.app = app;
        this.mainMenu = new MainMenu(this);
        this.addTaskWindow = new AddTaskWindow(this);
        this.aboutWindow = new AboutWindow(this);
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
            mainWindowReadyToShow: {
                event: 'ready-to-show',
                callback: this.onMainWindowReadyToShow
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
            taskAddWindowOpen: {
                event: Constants.EVENTS.TASKS.OPEN_ADD_WINDOW,
                callback: this.onTaskAddWindowOpen
            },
            taskAddWindowClose: {
                event: Constants.EVENTS.TASKS.CLOSE_ADD_WINDOW,
                callback: this.onTaskAddWindowClose
            },
            aboutWindowClose: {
                event: Constants.EVENTS.ABOUT.CLOSE_WINDOW,
                callback: this.onAboutWindowClose
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
        this.ipcMain.on(this.handlers().taskAddWindowOpen.event, this.handlers().taskAddWindowOpen.callback);
        this.ipcMain.on(this.handlers().taskAddWindowClose.event, this.handlers().taskAddWindowClose.callback);
        this.ipcMain.on(this.handlers().aboutWindowClose.event, this.handlers().aboutWindowClose.callback);
    }

    /**
     * To Do List Main window getter.
     */
    public getMainWindow = (): Electron.BrowserWindow => {
        return this.appMainWindow;
    }

    /**
     * Add Task window getter.
     */
    public getAddTaskWindow = (): AddTaskWindow => {
        return this.addTaskWindow;
    }

    /**
     * About window getter.
     */
    public getAboutWindow = (): AboutWindow => {
        return this.aboutWindow;
    }

    /**
     * Event handler for the tasks clear event.
     */
    public clearTaskList = (): void => {
        this.appMainWindow.webContents.send(Constants.EVENTS.TASKS.CLEAR);
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
            titleBarStyle: Constants.MAIN_WINDOW.TITLEBAR_STYLE,
            backgroundColor: Constants.MAIN_WINDOW.BACKGROUND_COLOR,
            show: Constants.MAIN_WINDOW.SHOW,
            width: Constants.MAIN_WINDOW.WIDTH,
            height: Constants.MAIN_WINDOW.HEIGHT,
            minWidth: Constants.MAIN_WINDOW.MIN_WIDTH,
            minHeight: Constants.MAIN_WINDOW.MIN_HEIGHT,
            target: Constants.MAIN_WINDOW.TARGET
        });
        this.appMainWindow.once(this.handlers().mainWindowReadyToShow.event, this.handlers().mainWindowReadyToShow.callback);
        this.appMainWindow.on(this.handlers().mainWindowClose.event, this.handlers().mainWindowClose.callback);
        this.appMainMenu = Menu.buildFromTemplate(this.mainMenu.getMainMenu());
        Menu.setApplicationMenu(this.appMainMenu);
        // uncomment next line for debugging purposes
        // this.appMainWindow.webContents.openDevTools();
    }

    /**
     * Event handler for the main window "ready-to-show" event.
     */
    private onMainWindowReadyToShow = (): void => {
        this.appMainWindow.show();
        // load posts
        this.appMainWindow.webContents.send(Constants.EVENTS.LOADING_MASK.SHOW);
        Request.executeRequest('GET', Constants.CONFIGURATIONS.POSTS, {}, (error: any, response: string) => {
            this.appMainWindow.webContents.send(Constants.EVENTS.POSTS.LOADED, response);
            this.appMainWindow.webContents.send(Constants.EVENTS.LOADING_MASK.HIDE);
        });
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
     * Event handler for the add task window open event.
     */
    private onTaskAddWindowOpen = (e: Event, args: any): void => {
        this.addTaskWindow.open();
    }

    /**
     * Event handler for the add task window close event.
     */
    private onTaskAddWindowClose = (e: Event, args: any): void => {
        this.addTaskWindow.close();
    }

    /**
     * Event handler for the about window close event.
     */
    private onAboutWindowClose = (e: Event, args: any): void => {
        this.aboutWindow.close();
    }

}
