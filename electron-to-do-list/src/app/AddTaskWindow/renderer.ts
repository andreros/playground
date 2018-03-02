import { ipcRenderer } from 'electron';
import { Constants } from '../constants';

/**
 * Class tied to the Add Task index.html file. This class controls all the interaction with the rendered HTML
 * inside the BrowserWindow.
 */
export class AddTaskRenderer {

    private rootElement: HTMLElement;
    private form: HTMLElement;
    private addTaskBtn: HTMLElement;
    private closeBtn: HTMLElement;

    /**
     * Class constructor.
     * @param {HTMLElement} rootElement The page root element.
     */
    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement;
        this.form = this.rootElement.querySelector('form');
        this.addTaskBtn = this.rootElement.querySelector('#addTaskBtn');
        this.closeBtn = this.rootElement.querySelector('#closeBtn');
        this.registerEvents();
    }

    /**
     * Event handlers object.
     */
    private handlers = (): any => {
        return {
            formSubmit: {
                event: 'submit',
                callback: this.onFormSubmit
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
        this.form.addEventListener(this.handlers().formSubmit.event, this.handlers().formSubmit.callback);
        this.closeBtn.addEventListener(this.handlers().closeButtonClick.event, this.handlers().closeButtonClick.callback);
    }

    /**************************************************************************************************************************************/
    /* Event handlers
    /**************************************************************************************************************************************/

    /**
     * Event handler for the form "submit" event.
     */
    private onFormSubmit = (e: Event) => {
        e.preventDefault();
        const task = (<HTMLInputElement>this.rootElement.querySelector('#task')).value;
        // console.log('ipc renderer before send: ', ipcRenderer);
        ipcRenderer.send(Constants.EVENTS.TASKS.ADD, task);
        console.log('ipc renderer after send | task: ', task);
    }

    /**
     * Event handler for the close window "click" event.
     */
    private onCloseButtonClick = (e: Event) => {
        ipcRenderer.send(Constants.EVENTS.TASKS.CLOSE_ADD_WINDOW);
    }

}

const addTaskRenderer = new AddTaskRenderer(document.getElementsByTagName('body')[0]);
