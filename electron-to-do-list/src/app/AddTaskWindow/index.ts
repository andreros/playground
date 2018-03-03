import { BrowserWindow, Menu, app } from 'electron';
import { Window } from '../window';

export class AddTaskWindow {

    private addTaskWindow: Electron.BrowserWindow;

    /**
     * Class constructor.
     */
    constructor() {
        // constructor
    }

    /**
     * Event handlers object.
     */
    private handlers = (): any => {
        return {
            windowClose: {
                event: 'close',
                callback: this.onWindowClose
            }
        };
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
                width: 800,
                height: 270,
                resizable: false,
                target: 'app/AddTaskWindow/index.html'
            });
            // handle window closing
            this.addTaskWindow.on(this.handlers().windowClose.event, this.handlers().windowClose.callback);
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
     * Event handler for the window "close" event.
     */
    private onWindowClose = (e: Event): void => {
        this.destroy();
    }

}
