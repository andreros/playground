export class LoadingMask {

    public static readonly PROPERTIES: any = {
        SPINNER_SIZE: '100px',
        BACKDROP_COLOR: 'rgba(0, 0, 0, .5)',
        CIRCLE_COLOR: 'rgba(255, 255, 255, 1)',
        ROTATOR_COLOR: 'rgba(30, 136, 229, 1)'
    };

    /**
     * Method responsible for applying a loading mask over the page body element.
     */
    public static mask = (): void => {
        // loading mask container
        const mask = document.createElement('div');
        mask.classList.add('loading-mask');
        mask.style.position = 'fixed';
        mask.style.backgroundColor = LoadingMask.PROPERTIES.BACKDROP_COLOR;
        mask.style.display = 'flex';
        mask.style.flexBasis = '1';
        mask.style.flexGrow = '1';
        mask.style.flexShrink = '0';
        mask.style.justifyContent = 'center';
        mask.style.top = '0px';
        mask.style.left = '0px';
        mask.style.width = '100%';
        mask.style.height = '100vh';
        mask.style.zIndex = '999999999';
        // loading mask spinner
        const spinner = document.createElement('div');
        spinner.style.width = LoadingMask.PROPERTIES.SPINNER_SIZE;
        spinner.style.height = LoadingMask.PROPERTIES.SPINNER_SIZE;
        spinner.style.border = '6px solid ' + LoadingMask.PROPERTIES.CIRCLE_COLOR;
        spinner.style.borderTop = '6px solid ' + LoadingMask.PROPERTIES.ROTATOR_COLOR;
        spinner.style.borderRadius = '50%';
        spinner.style.webkitAnimation = 'loading-mask-spinner-rotator 1s infinite linear';
        spinner.style.backgroundColor = 'transparent';
        spinner.style.alignSelf = 'center';
        mask.appendChild(spinner);
        // loading mask spinner rotator
        const style = document.createElement('style');
        style.innerHTML = '@-webkit-keyframes loading-mask-spinner-rotator { from { -webkit-transform: rotate(0deg); } ' +
        'to { -webkit-transform: rotate(359deg); } }';
        // append elements to body
        const body = document.querySelector('body');
        mask.appendChild(style);
        body.appendChild(mask);
    }

    /**
     * Method responsible for removing the loading mask covering the page body, if there is one.
     */
    public static unmask = (): void => {
        const body = document.querySelector('body');
        const mask = body.querySelector('.loading-mask');
        if (mask) {
            mask.remove();
        }
    }

}
