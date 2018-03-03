import { ipcRenderer } from 'electron';
import { Constants } from '../constants';

/**
 * Class tied to the Add Task index.html file. This class controls all the interaction with the rendered HTML
 * inside the BrowserWindow.
 */
export class AddTaskRenderer {

    private rootElement: HTMLElement;
    private addBtn: HTMLElement;
    private cancelBtn: HTMLElement;

    /**
     * Class constructor.
     * @param {HTMLElement} rootElement The page root element.
     */
    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement;
        this.addBtn = this.rootElement.querySelector('#addBtn');
        this.cancelBtn = this.rootElement.querySelector('#cancelBtn');
        this.registerEvents();
    }

    /**
     * Event handlers object.
     */
    private handlers = (): any => {
        return {
            addButtonClick: {
                event: 'click',
                callback: this.onAddButtonClick
            },
            cancelButtonClick: {
                event: 'click',
                callback: this.onCancelButtonClick
            }
        };
    }

    /**
     * Method responsible for registering the renderer class events.
     */
    private registerEvents = (): void => {
        this.addBtn.addEventListener(this.handlers().addButtonClick.event, this.handlers().addButtonClick.callback);
        this.cancelBtn.addEventListener(this.handlers().cancelButtonClick.event, this.handlers().cancelButtonClick.callback);
    }

    /**************************************************************************************************************************************/
    /* Event handlers
    /**************************************************************************************************************************************/

    /**
     * Event handler for the add button "click" event.
     */
    private onAddButtonClick = (e: Event) => {
        e.preventDefault();
        const taskName = (<HTMLInputElement>this.rootElement.querySelector('#taskName')).value;
        ipcRenderer.send(Constants.EVENTS.TASKS.ADD, taskName);
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            ipcRenderer.send(Constants.EVENTS.TASKS.CLOSE_ADD_WINDOW);
        }, 250);
    }

    /**
     * Event handler for the cancel button "click" event.
     */
    private onCancelButtonClick = (e: Event) => {
        ipcRenderer.send(Constants.EVENTS.TASKS.CLOSE_ADD_WINDOW);
    }

}

const addTaskRenderer = new AddTaskRenderer(document.getElementsByTagName('body')[0]);
