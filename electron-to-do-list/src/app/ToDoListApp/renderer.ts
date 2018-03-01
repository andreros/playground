import { ipcRenderer } from 'electron';

/**
 * Class tied to the To Do List App Task index.html file. This class controls all the interaction with the
 * rendered HTML inside the BrowserWindow.
 */
export class ToDoListAppRenderer {

    private rootElement: HTMLElement;

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement;
        this.registerEvents();
    }

    private registerEvents = (): void => {
        // to implement
        ipcRenderer.on(this.handlers().taskAdd.event, this.handlers().taskAdd.callback);
    }

    private handlers = (): any => {
        return {
            taskAdd: {
                event: 'task:add',
                callback: this.onTaskAdd
            }
        };
    }

    private onTaskAdd = (e: Event, params: any): void => {
        console.log('on task add: ', e, params);
    }

    // const ul = document.querySelector('ul');

    // // Add task

    // ipcRenderer.on('task:add', function (e, task) {
    //     // ul.className = 'collection';
    //     // const li = document.createElement('li');
    //     // li.className = 'collection-item';
    //     // const taskText = document.createTextNode(task);
    //     // li.appendChild(taskText);
    //     // ul.appendChild(li);

    //     console.log('on task add: ', e, task);
    // });

    // // Clear tasks

    // ipcRenderer.on('task:clear', function () {
    //     ul.innerHTML = '';
    //     ul.className = '';
    // })

    // // Remove Task

    // //ul.addEventListener('dblclick', removeItem);

    // function removeItem(e) {
    //     e.target.remove();
    //     if(ul.children.length == 0)
    //         ul.className = '';

    // }

}

const toDoListAppRenderer = new ToDoListAppRenderer(document.getElementsByTagName('body')[0]);
