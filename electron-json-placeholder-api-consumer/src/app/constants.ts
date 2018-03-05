/**
 * Class responsible for centralizing the application constants declaration.
 */
export class Constants {
    public static readonly API_BASE_URL: string = 'http://jsonplaceholder.typicode.com';

    /**
     * Application configurations.
     */
    public static readonly CONFIGURATIONS: any = {
        API_BASE_URL: Constants.API_BASE_URL,
        POSTS: Constants.API_BASE_URL + '/posts'
    };

    /**
     * Main window (To Do List) configurations.
     */
    public static readonly MAIN_WINDOW: any = {
        TARGET: 'app/ToDoListApp/index.html',
        TITLEBAR_STYLE: 'hidden',
        BACKGROUND_COLOR: '#FFF',
        SHOW: false,
        WIDTH: 1366,
        HEIGHT: 768,
        MIN_WIDTH: 480,
        MIN_HEIGHT: 600
    };

    /**
     * Add Task window configurations.
     */
    public static readonly ADD_TASK_WINDOW: any = {
        TARGET: 'app/AddTaskWindow/index.html',
        BACKGROUND_COLOR: '#FFF',
        MODAL: true,
        RESIZABLE: false,
        SHOW: false,
        WIDTH: 800,
        HEIGHT: 270
    };

    /**
     * About window configurations.
     */
    public static readonly ABOUT_WINDOW: any = {
        TARGET: 'app/AboutWindow/index.html',
        BACKGROUND_COLOR: '#FFF',
        MODAL: true,
        RESIZABLE: false,
        SHOW: false,
        WIDTH: 800,
        HEIGHT: 270
    };

    /**
     * Application events.
     */
    public static readonly EVENTS: any = {
        POSTS: {
            LOADED: 'posts:loaded'
        },
        TASKS: {
            OPEN_ADD_WINDOW: 'tasks:open:add:window',
            CLOSE_ADD_WINDOW: 'tasks:close:add:window',
            CLEAR: 'tasks:clear:tasks:list',
            ADD: 'tasks:add:task',
            EDIT: 'tasks:edit:task'
        },
        ABOUT: {
            CLOSE_WINDOW: 'about:close:window'
        }
    };

}
