import { BrowserWindow } from 'electron';
import { Constants } from '../constants';

export class Window {

    public static readonly PROPERTIES = {
        width: Constants.CONFIGURATIONS.DEFAULT_WINDOW_WIDTH,
        height: Constants.CONFIGURATIONS.DEFAULT_WINDOW_HEIGHT,
        target: Constants.CONFIGURATIONS.DEFAULT_WINDOW_TARGET
    };

    public static getWindow = (properties: any): BrowserWindow => {

        const windowProps = Object.assign({}, Window.PROPERTIES, properties);

        // create a new window
        let window = new BrowserWindow(windowProps);

        // load html into window
        window.loadURL('file://' + __dirname + '/../../' + windowProps.target);

        // garbage collection handle
        window.on('close', function () {
            window = null;
        });

        return window;
    }

}
