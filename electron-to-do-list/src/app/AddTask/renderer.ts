import { ipcRenderer } from 'electron';

/**
 * Class tied to the Add Task index.html file. This class controls all the interaction with the rendered HTML
 * inside the BrowserWindow.
 */
export class AddTaskRenderer {

    private rootElement: HTMLElement;
    private form: HTMLElement;

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement;
        this.form = this.rootElement.querySelector('form');
        this.registerEvents();
    }

    private registerEvents = (): void => {
        this.form.addEventListener(this.handlers().formSubmit.event, this.handlers().formSubmit.callback);
    }

    private handlers = (): any => {
        return {
            formSubmit: {
                event: 'submit',
                callback: this.onFormSubmit
            }
        };
    }

    private onFormSubmit = (e: Event) => {
        e.preventDefault();
        const task = (<HTMLInputElement>this.rootElement.querySelector('#task')).value;
        console.log('ipc renderer before send: ', ipcRenderer);
        ipcRenderer.send('task:add', task);
        console.log('ipc renderer after send | task: ', task);
    }

}

const addTaskRenderer = new AddTaskRenderer(document.getElementsByTagName('body')[0]);
