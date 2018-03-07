import { BrowserWindow, Menu, app } from 'electron';
import { JsonPlaceholderApp } from '../JsonPlaceholderApp';
import { Window } from '../_helpers/Window';
import { Constants } from '../constants';

export class AboutWindow {

    private jsonPlaceholderApp: JsonPlaceholderApp;
    private aboutWindow: Electron.BrowserWindow;

    /**
     * Class constructor.
     */
    constructor(jsonPlaceholderApp: JsonPlaceholderApp) {
        this.jsonPlaceholderApp = jsonPlaceholderApp;
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
        this.aboutWindow.on(this.handlers().windowReadyToShow.event, this.handlers().windowReadyToShow.callback);
        this.aboutWindow.on(this.handlers().windowClose.event, this.handlers().windowClose.callback);
    }

    /**
     * Method responsible for destroying the about window.
     */
    public destroy = (): void => {
        this.aboutWindow = null;
    }

    /**
     * Method responsible for opening the add task window.
     */
    public open = (): void => {
        if (!this.aboutWindow) {
            this.aboutWindow = Window.getWindow({
                parent: this.jsonPlaceholderApp.getMainWindow(),
                backgroundColor: Constants.ABOUT_WINDOW.BACKGROUND_COLOR,
                modal: Constants.ABOUT_WINDOW.MODAL,
                resizable: Constants.ABOUT_WINDOW.RESIZABLE,
                show: Constants.ABOUT_WINDOW.SHOW,
                width: Constants.ABOUT_WINDOW.WIDTH,
                height: Constants.ABOUT_WINDOW.HEIGHT,
                target: Constants.ABOUT_WINDOW.TARGET
            });
            this.registerEvents();
            // uncomment next line for debugging purposes
            // this.aboutWindow.webContents.openDevTools();
        }
    }

    /**
     * Method responsible for closing the about window.
     */
    public close = (): void => {
        if (this.aboutWindow) {
            this.aboutWindow.close();
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
        this.aboutWindow.show();
    }

    /**
     * Event handler for the window "close" event.
     */
    private onWindowClose = (e: Event): void => {
        this.destroy();
    }

}
