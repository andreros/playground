import { ipcRenderer } from 'electron';
import { Constants } from '../constants';

/**
 * Class tied to the To Do List App Task index.html file. This class controls all the interaction with the
 * rendered HTML inside the BrowserWindow.
 */
export class ToDoListAppRenderer {

    private rootElement: HTMLElement;

    /**
     * Class constructor.
     * @param {HTMLElement} rootElement The page root element.
     */
    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement;
        // const ul = document.querySelector('ul');
        this.registerEvents();
    }

    /**
     * Event handlers object.
     */
    private handlers = (): any => {
        return {
            taskAdd: {
                event: Constants.EVENTS.TASKS.ADD,
                callback: this.onTaskAdd
            },
            tasksClear: {
                event: Constants.EVENTS.TASKS.CLEAR,
                callback: this.onTasksClear
            }
        };
    }

    /**
     * Method responsible for registering the renderer class events.
     */
    private registerEvents = (): void => {
        ipcRenderer.on(this.handlers().taskAdd.event, this.handlers().taskAdd.callback);
    }

    /**************************************************************************************************************************************/
    /* Event handlers
    /**************************************************************************************************************************************/

    /**
     * Event handler for the add task event.
     */
    private onTaskAdd = (e: Event, params: any): void => {
        console.log('on task add: ', e, params);
        // ul.className = 'collection';
        // const li = document.createElement('li');
        // li.className = 'collection-item';
        // const taskText = document.createTextNode(task);
        // li.appendChild(taskText);
        // ul.appendChild(li);
    }

    /**
     * Event handler for the tasks clear event.
     */
    private onTasksClear = (e: Event, params: any): void => {
        console.log('on tasks clear: ', e, params);
        // ul.innerHTML = '';
        // ul.className = '';
    }

    // // Remove Task

    // //ul.addEventListener('dblclick', removeItem);

    // function removeItem(e) {
    //     e.target.remove();
    //     if(ul.children.length == 0)
    //         ul.className = '';
    // }

}

const toDoListAppRenderer = new ToDoListAppRenderer(document.getElementsByTagName('body')[0]);
