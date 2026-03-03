export function waitForElementTransition(el: HTMLElement): Promise<HTMLElement> {
    const style = window.getComputedStyle(el);
    const duration = parseFloat(style.transitionDuration) * 1000;
    const delay = parseFloat(style.transitionDelay) * 1000;
    const totalDuration = duration + delay;

    return new Promise((resolve) => {
        if (totalDuration > 0) {
            setTimeout(() => {
                resolve(el);
            }, totalDuration);
        } else {
            resolve(el);
        }
    });
}
