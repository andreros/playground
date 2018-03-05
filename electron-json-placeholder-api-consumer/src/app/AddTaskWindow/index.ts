import { BrowserWindow, Menu, app } from 'electron';
import { ToDoListApp } from '../ToDoListApp';
import { Window } from '../_helpers/Window';
import { Constants } from '../constants';

export class AddTaskWindow {

    private toDoListApp: ToDoListApp;
    private addTaskWindow: Electron.BrowserWindow;

    /**
     * Class constructor.
     */
    constructor(toDoListApp: ToDoListApp) {
        this.toDoListApp = toDoListApp;
    }

    /**
     * Event handlers object.
     */
    private handlers = (): any => {
        return {
            windowReadyToShow: {
                event: 'ready-to-show',
                callback: this.onWindowReadyToShow
            },
            windowClose: {
                event: 'close',
                callback: this.onWindowClose
            }
        };
    }

    /**
     * Method responsible for registering the renderer class events.
     */
    private registerEvents = (): void => {
        this.addTaskWindow.on(this.handlers().windowReadyToShow.event, this.handlers().windowReadyToShow.callback);
        this.addTaskWindow.on(this.handlers().windowClose.event, this.handlers().windowClose.callback);
    }

    /**
     * Method responsible for destroying the add task window.
     */
    public destroy = (): void => {
        this.addTaskWindow = null;
    }

    /**
     * Method responsible for opening the add task window.
     */
    public open = (): void => {
        if (!this.addTaskWindow) {
            this.addTaskWindow = Window.getWindow({
                parent: this.toDoListApp.getMainWindow(),
                backgroundColor: Constants.ADD_TASK_WINDOW.BACKGROUND_COLOR,
                modal: Constants.ADD_TASK_WINDOW.MODAL,
                resizable: Constants.ADD_TASK_WINDOW.RESIZABLE,
                show: Constants.ADD_TASK_WINDOW.SHOW,
                width: Constants.ADD_TASK_WINDOW.WIDTH,
                height: Constants.ADD_TASK_WINDOW.HEIGHT,
                target: Constants.ADD_TASK_WINDOW.TARGET
            });
            this.registerEvents();
            // uncomment next line for debugging purposes
            // this.addTaskWindow.webContents.openDevTools();
        }
    }

    /**
     * Method responsible for closing the add task window.
     */
    public close = (): void => {
        if (this.addTaskWindow) {
            this.addTaskWindow.close();
            this.destroy();
        }
    }

    /**************************************************************************************************************************************/
    /* Event handlers
    /**************************************************************************************************************************************/

    /**
     * Event handler for the window "ready-to-show" event.
     */
    private onWindowReadyToShow = (e: Event): void => {
        this.addTaskWindow.show();
    }

    /**
     * Event handler for the window "close" event.
     */
    private onWindowClose = (e: Event): void => {
        this.destroy();
    }

}
