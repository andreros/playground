import { BrowserWindow, Menu, app } from 'electron';
import { Window } from '../window';

export class AddTask {

    private addTaskWindow: Electron.BrowserWindow;

    constructor() {
        // constructor
    }

    private handlers = (): any => {
        return {
            appReady: {
                event: 'ready',
                callback: () => {
                    // something
                }
            }
        };
    }

    /**************************************************************************************************************************************/
    /* Event handlers
    /**************************************************************************************************************************************/

    /**
     * Event handler for the application "ready" event.
     */
    public open = (): void => {
        this.addTaskWindow = Window.getWindow({
            width: 600,
            height: 200,
            frame: false,
            target: 'electron/addTask/index.html'
        });
        // this.addTaskWindow.webContents.openDevTools();

        this.addTaskWindow.webContents.executeJavaScript('document.getElementById("test")', false, (result: any) => {
            console.log('result: ', result);
        });

    }

    public close = (): void => {
        // xxx
    }


}
