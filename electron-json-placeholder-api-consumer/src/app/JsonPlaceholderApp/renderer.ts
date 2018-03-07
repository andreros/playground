import { ipcRenderer } from 'electron';
import * as handlebars from 'handlebars';
import { LoadingMask } from '../_helpers/LoadingMask';
import { Constants } from '../constants';

/**
 * Class tied to the To Do List App Task index.html file. This class controls all the interaction with the
 * rendered HTML inside the BrowserWindow.
 */
export class JsonPlaceholderAppRenderer {

    private rootElement: HTMLElement;
    private taskList: HTMLElement;
    private reloadPostListBtn: HTMLElement;
    private viewPostButtons: NodeListOf<HTMLElement>;
    private addNewTask: HTMLElement;
    private clearTaskList: HTMLElement;

    /**
     * Class constructor.
     * @param {HTMLElement} rootElement The page root element.
     */
    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement;
        this.taskList = this.rootElement.querySelector('#taskList');
        this.reloadPostListBtn = this.rootElement.querySelector('#reloadPostListBtn');
        this.addNewTask = this.rootElement.querySelector('#addNewTask');
        this.clearTaskList = this.rootElement.querySelector('#clearTaskList');
        this.viewPostButtons = this.rootElement.querySelectorAll('.btn-view-post');
        this.registerEvents();
    }

    /**
     * Event handlers object.
     */
    private handlers = (): any => {
        return {
            ipcLoadingMaskShow: {
                event: Constants.EVENTS.LOADING_MASK.SHOW,
                callback: this.onLoadingMaskShow
            },
            ipcLoadingMaskHide: {
                event: Constants.EVENTS.LOADING_MASK.HIDE,
                callback: this.onLoadingMaskHide
            },
            ipcTaskAdd: {
                event: Constants.EVENTS.TASKS.ADD,
                callback: this.onTaskAdd
            },
            ipcPostsLoaded: {
                event: Constants.EVENTS.POSTS.LOADED,
                callback: this.onPostsLoaded
            },
            ipcTasksClear: {
                event: Constants.EVENTS.TASKS.CLEAR,
                callback: this.onTasksClear
            },
            reloadPostListBtn: {
                event: 'click',
                callback: this.onReloadPostList
            },
            viewPostBtn: {
                event: 'click',
                callback: this.onViewPost
            },
            taskAddNew: {
                event: 'click',
                callback: this.onTaskAddNew
            },
            tasksClear: {
                event: 'click',
                callback: this.onTasksClear
            }
        };
    }

    /**
     * Method responsible for registering the renderer class events.
     */
    private registerEvents = (): void => {
        ipcRenderer.on(this.handlers().ipcLoadingMaskShow.event, this.handlers().ipcLoadingMaskShow.callback);
        ipcRenderer.on(this.handlers().ipcLoadingMaskHide.event, this.handlers().ipcLoadingMaskHide.callback);
        ipcRenderer.on(this.handlers().ipcTaskAdd.event, this.handlers().ipcTaskAdd.callback);
        ipcRenderer.on(this.handlers().ipcPostsLoaded.event, this.handlers().ipcPostsLoaded.callback);
        ipcRenderer.on(this.handlers().ipcTasksClear.event, this.handlers().ipcTasksClear.callback);
        this.reloadPostListBtn.addEventListener(this.handlers().reloadPostListBtn.event, this.handlers().reloadPostListBtn.callback);
        this.viewPostButtons.forEach(viewPostButton => {
            viewPostButton.addEventListener(this.handlers().viewPostBtn.event, this.handlers().viewPostBtn.callback);
        });
        this.addNewTask.addEventListener(this.handlers().taskAddNew.event, this.handlers().taskAddNew.callback);
        this.clearTaskList.addEventListener(this.handlers().tasksClear.event, this.handlers().tasksClear.callback);
    }

    /**
     * Method responsible for registering the renderer class events.
     */
    private deRegisterEvents = (): void => {
        ipcRenderer.removeAllListeners(this.handlers().ipcLoadingMaskShow.event);
        ipcRenderer.removeAllListeners(this.handlers().ipcLoadingMaskHide.event);
        ipcRenderer.removeAllListeners(this.handlers().ipcTaskAdd.event);
        ipcRenderer.removeAllListeners(this.handlers().ipcPostsLoaded.event);
        ipcRenderer.removeAllListeners(this.handlers().ipcTasksClear.event);
        this.reloadPostListBtn.removeEventListener(this.handlers().reloadPostListBtn.event, this.handlers().reloadPostListBtn.callback);
        this.viewPostButtons.forEach(viewPostButton => {
            viewPostButton.removeEventListener(this.handlers().viewPostBtn.event, this.handlers().viewPostBtn.callback);
        });
        this.addNewTask.removeEventListener(this.handlers().taskAddNew.event, this.handlers().taskAddNew.callback);
        this.clearTaskList.removeEventListener(this.handlers().tasksClear.event, this.handlers().tasksClear.callback);
    }

    /**
     * Method responsible for checking if the posts table is empty.
     */
    private checkPostsTableEmpty = (): void => {
        const rows = this.taskList.querySelectorAll('tr');
        if (rows.length === 0) {
            this.taskList.appendChild(this.getTaskPostsTableEmptyRow());
        }
    }

    /**
     * Method responsible for getting a posts table empty row.
     */
    private getTaskPostsTableEmptyRow = (): HTMLTableRowElement => {
        const tr = document.createElement('tr');
        tr.classList.add('empty');
        tr.innerHTML = '<td colspan="3">There are no posts to display.</td>';
        return tr;
    }

    /**
     * Method responsible for adding a row to the posts table.
     * @param {any} rowData The row data.
     */
    private addPostTableRow = (rowData: any): void => {
        // read handlebars task row template file
        const fs = require('fs'),
              path = require('path');
        fs.readFile(path.join(__dirname, 'postTableRow.hbs'), 'utf8', (err: string, data: any) => {
            const emptyRow = this.taskList.querySelector('.empty');
            if (emptyRow) { emptyRow.remove(); }
            // compile the template
            const template = handlebars.compile(data);
            // call template as a function, passing in your data as the context
            const row = template(rowData);
            // append it to the task list table
            const tr = document.createElement('tr');
            tr.innerHTML = row;
            this.taskList.appendChild(tr);
            // re-register event listeners
            this.viewPostButtons = this.rootElement.querySelectorAll('.btn-view-post');
            this.deRegisterEvents();
            this.registerEvents();
            this.checkPostsTableEmpty();
        });
    }


    /**************************************************************************************************************************************/
    /* Event handlers
    /**************************************************************************************************************************************/

    /**
     * Event handler for the loading mask show event.
     */
    private onLoadingMaskShow = (e: Event): void => {
        LoadingMask.mask();
    }

    /**
     * Event handler for the loading mask hide event.
     */
    private onLoadingMaskHide = (e: Event): void => {
        LoadingMask.unmask();
    }

    /**
     * Event handler for the reload post list button 'click' event.
     */
    private onReloadPostList = (e: Event): void => {
        ipcRenderer.send(Constants.EVENTS.POSTS.RELOAD);
    }

    /**
     * Event handler for the posts loaded event.
     */
    private onPostsLoaded = (e: Event, posts: any): void => {
        this.taskList.innerHTML = '';
        posts.forEach((post: any) => {
            this.addPostTableRow({
                postId: post.id,
                postTitle: post.title
            });
        });
    }

    /**
     * Event handler for the add task event.
     */
    private onViewPost = (e: Event): void => {
        const postId  = (<HTMLElement>e.currentTarget).getAttribute('data-id');
        ipcRenderer.send(Constants.EVENTS.POSTS.VIEW_POST, Number(postId));
    }

    /**
     * Event handler for the add task event.
     */
    private onTaskAdd = (e: Event, params: any): void => {
        this.addPostTableRow({ postTitle: params });
    }

    /**
     * Event handler for the add new task button "click" event.
     */
    private onTaskAddNew = (e: Event): void => {
        ipcRenderer.send(Constants.EVENTS.TASKS.OPEN_ADD_WINDOW);
    }

    /**
     * Event handler for the delete task button "click" event.
     */
    private onTaskDelete = (e: Event): void => {
        (<HTMLElement>e.currentTarget).closest('tr').remove();
        this.checkPostsTableEmpty();
    }

    /**
     * Event handler for the tasks clear event.
     */
    private onTasksClear = (e: Event): void => {
        this.viewPostButtons = this.rootElement.querySelectorAll('.btn-view-post');
        this.deRegisterEvents();
        this.taskList.innerHTML = '';
        this.taskList.appendChild(this.getTaskPostsTableEmptyRow());
        this.registerEvents();
    }

}

const jsonPlaceholderAppRenderer = new JsonPlaceholderAppRenderer(document.getElementsByTagName('body')[0]);
