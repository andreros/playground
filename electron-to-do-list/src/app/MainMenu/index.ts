import { Window } from '../window';
import { AddTask } from '../addTask';

export class MainMenu {

    private application: Electron.App;
    private addTaskWindow: AddTask;

    constructor(application: Electron.App) {
        this.application = application;
        this.addTaskWindow = new AddTask();
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
                            this.application.quit();
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
                        this.addTaskWindow.open();
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
