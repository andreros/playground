import { BrowserWindow, Menu, app } from 'electron';
import { MainMenu } from '../mainMenu';
import { Window } from '../window';

export class ElectronApp {

    private app: Electron.App;
    private appMainMenu: Electron.Menu;
    private appMainWindow: Electron.BrowserWindow;
    private mainMenu: MainMenu;

    constructor() {
        this.app = app;
        this.app.on(this.handlers().appReady.event, this.handlers().appReady.callback);
        this.app.on(this.handlers().windowAllClosed.event, this.handlers().windowAllClosed.callback);
        this.mainMenu = new MainMenu(this.app);
    }

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
            }
        };
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
            target: 'pages/main.html'
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
        this.app.quit();
    }

    /**
     * Event handler for the application "window-all-closed" event.
     */
    private onWindowAllClosed = (): void => {
        this.app.quit();
    }

}
