/**
 * Class responsible for centralizing the application constants declaration.
 */
export class Constants {

    /**
     * Application configurations.
     */
    public static readonly CONFIGURATIONS: any = {
        DEFAULT_WINDOW_WIDTH: 1024,
        DEFAULT_WINDOW_HEIGHT: 768,
        DEFAULT_WINDOW_TARGET: 'index.html'
    };

    /**
     * Main window (To Do List) configurations.
     */
    public static readonly MAIN_WINDOW: any = {
        TARGET: 'app/ToDoListApp/index.html',
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
     * Application IPC (Inter Process Communication) events.
     */
    public static readonly EVENTS: any = {
        TASKS: {
            OPEN_ADD_WINDOW: 'tasks:open:add:window',
            CLOSE_ADD_WINDOW: 'tasks:close:add:window',
            CLEAR: 'tasks:clear:tasks:list',
            ADD: 'tasks:add:task'
        },
        ABOUT: {
            CLOSE_WINDOW: 'about:close:window'
        }
    };

}
