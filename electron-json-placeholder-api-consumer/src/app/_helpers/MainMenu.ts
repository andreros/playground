import { JsonPlaceholderApp } from '../JsonPlaceholderApp';
import { Window } from './Window';

export class MainMenu {

    private jsonPlaceholderApp: JsonPlaceholderApp;

    /**
     * Class constructor.
     */
    constructor(jsonPlaceholderApp: JsonPlaceholderApp) {
        this.jsonPlaceholderApp = jsonPlaceholderApp;
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
                            this.jsonPlaceholderApp.getAboutWindow().open();
                        }
                    },
                    {
                        label: 'Quit',
                        accelerator: process.platform === 'darwin' ? 'Alt+Q' : 'Ctrl+Q',
                        click: () => {
                            this.jsonPlaceholderApp.quit();
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
                        this.jsonPlaceholderApp.getAddTaskWindow().open();
                    }
                },
                {
                    label: 'Clear Task List',
                    accelerator: process.platform === 'darwin' ? 'Alt+X' : 'Ctrl+X',
                    click: () => {
                        this.jsonPlaceholderApp.clearTaskList();
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
