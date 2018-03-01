import { BrowserWindow } from 'electron';

export class Window {

    public static readonly PROPERTIES = {
        width: 1024,
        height: 768,
        target: 'index.html'
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
