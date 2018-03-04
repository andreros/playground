import { ToDoListApp } from '../ToDoListApp';
import { Window } from '../window';

export class MainMenu {

    private toDoListApp: ToDoListApp;

    /**
     * Class constructor.
     */
    constructor(toDoListApp: ToDoListApp) {
        this.toDoListApp = toDoListApp;
    }

    /**
     * Method responsible for retrieving the To Do List application main menu.
     */
    public getMainMenu = () => {
        let mainMenu = [];
        // In MacOS add an empty menu to shift the regular menu one position to the right.
        if (process.platform === 'darwin') {
            mainMenu.push({
                label: '',
                submenu: [
                    {
                        label: 'About',
                        accelerator: process.platform === 'darwin' ? 'Alt+A' : 'Ctrl+A',
                        click: () => {
                            this.toDoListApp.getAboutWindow().open();
                        }
                    },
                    {
                        label: 'Quit',
                        accelerator: process.platform === 'darwin' ? 'Alt+Q' : 'Ctrl+Q',
                        click: () => {
                            this.toDoListApp.quit();
                        }
                    }
                ]
            });
        }

        // tasks
        mainMenu.push({
            label: 'Tasks',
            submenu: [
                {
                    label: 'Add New Task',
                    accelerator: process.platform === 'darwin' ? 'Alt+N' : 'Ctrl+N',
                    click: () => {
                        this.toDoListApp.getAddTaskWindow().open();
                    }
                },
                {
                    label: 'Clear Task List',
                    accelerator: process.platform === 'darwin' ? 'Alt+X' : 'Ctrl+X',
                    click: () => {
                        this.toDoListApp.clearTaskList();
                    }
                }
            ]
        });

        // developer tools
        if (process.env.NODE_ENV !== 'production') {
            mainMenu.push({
                label: 'Developer Tools',
                submenu: [
                    {
                        role: 'reload' // Reload the application through Cmd+R or Ctrl+R
                    },
                    {
                        label: 'Toggle DevTools',
                        accelerator: process.platform === 'darwin' ? 'Cmd+I' : 'Ctrl+I',
                        click(item: any, focusedWindow: any) {
                            focusedWindow.toggleDevTools();
                        }
                    }
                ]
            });
        }

        return mainMenu;
    }

}
