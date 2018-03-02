import { AddTaskWindow } from '../AddTaskWindow';
import { ToDoListApp } from '../ToDoListApp';
import { Window } from '../window';

export class MainMenu {

    private toDoListApp: ToDoListApp;

    constructor(toDoListApp: ToDoListApp) {
        const addTaskWindow = new AddTaskWindow();
        toDoListApp.setAddTaskWindow(addTaskWindow);
        this.toDoListApp = toDoListApp;
    }

    public getMainMenu = () => {
        let mainMenu = [];
        // In MacOS add an empty menu to shift the regular menu one position to the right.
        if (process.platform === 'darwin') {
            mainMenu.push({
                label: '',
                submenu: [
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

        // main menu
        mainMenu.push({
            label: 'Tasks',
            submenu: [
                {
                    label: 'Add New Task',
                    accelerator: process.platform === 'darwin' ? 'Alt+I' : 'Ctrl+I',
                    click: () => {
                        this.toDoListApp.getAddTaskWindow().open();
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
