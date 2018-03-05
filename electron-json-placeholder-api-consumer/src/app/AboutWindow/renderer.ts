import { ipcRenderer } from 'electron';
import { Constants } from '../constants';

/**
 * Class tied to the About Window index.html file. This class controls all the interaction with the rendered HTML
 * inside the BrowserWindow.
 */
export class AboutRenderer {

    private rootElement: HTMLElement;
    private closeBtn: HTMLElement;

    /**
     * Class constructor.
     * @param {HTMLElement} rootElement The page root element.
     */
    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement;
        this.closeBtn = this.rootElement.querySelector('#closeBtn');
        this.registerEvents();
    }

    /**
     * Event handlers object.
     */
    private handlers = (): any => {
        return {
            keyUp: {
                event: 'keyup',
                callback: this.onKeyUp
            },
            closeButtonClick: {
                event: 'click',
                callback: this.onCloseButtonClick
            }
        };
    }

    /**
     * Method responsible for registering the renderer class events.
     */
    private registerEvents = (): void => {
        window.addEventListener(this.handlers().keyUp.event, this.handlers().keyUp.callback);
        this.closeBtn.addEventListener(this.handlers().closeButtonClick.event, this.handlers().closeButtonClick.callback);
    }

    /**************************************************************************************************************************************/
    /* Event handlers
    /**************************************************************************************************************************************/

    /**
     * Event handler for the window "keyup" event.
     */
    private onKeyUp = (e: KeyboardEvent): boolean => {
        switch (e.keyCode) {
            case 13:
                ipcRenderer.send(Constants.EVENTS.ABOUT.CLOSE_WINDOW);
                return false;
            case 27:
                ipcRenderer.send(Constants.EVENTS.ABOUT.CLOSE_WINDOW);
                return false;
            default:
                return true;
        }
    }

    /**
     * Event handler for the close button "click" event.
     */
    private onCloseButtonClick = (e: Event) => {
        ipcRenderer.send(Constants.EVENTS.ABOUT.CLOSE_WINDOW);
    }

}

const aboutRenderer = new AboutRenderer(document.getElementsByTagName('body')[0]);
