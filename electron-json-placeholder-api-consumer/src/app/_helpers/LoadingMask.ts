export class LoadingMask {

    public static mask = (): void => {
        // loading mask container
        const mask = document.createElement('div');
        mask.classList.add('loading-mask');
        mask.style.position = 'fixed';
        mask.style.backgroundColor = 'rgba(0, 0, 0, .5)';
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
        spinner.style.width = '100px';
        spinner.style.height = '100px';
        spinner.style.border = '3px solid rgba(255, 255, 255, 1)';
        spinner.style.borderRadius = '50%';
        spinner.style.backgroundColor = 'transparent';
        spinner.style.alignSelf = 'center';
        mask.appendChild(spinner);
        // append mask to body
        const body = document.querySelector('body');
        body.appendChild(mask);
    }

    public static unmask = (): void => {
        const body = document.querySelector('body');
        const mask = body.querySelector('.loading-mask');
        if (mask) {
            mask.remove();
        }
    }

}
