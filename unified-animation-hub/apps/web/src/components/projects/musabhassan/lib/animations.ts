import BezierEasing from "bezier-easing";
import { animate as anime, stagger } from "animejs";

// Note: svelte/easing quintOut can be replaced with a standard quintic easing function
const quintOut = (t: number) => --t * t * t * t * t + 1;

interface AnimationParams {
    duration?: number;
    delay?: number;
    initDelay?: number;
    breakWord?: boolean;
    promise?: Promise<any>;
    reverse?: boolean;
    maskStyles?: { property: string, value: string }[];
    onComplete?: () => void;
}

// Helper to tag letters and words (ported from original)
function tagLettersAndWords(node: HTMLElement, params: { breakWord: boolean }) {
    let masks = node.querySelectorAll(".a-text-mask");

    if (masks.length < 1) {
        node.innerHTML = parseLetters(node.innerHTML, "<div class=\"a-text-mask\"><div class=\"a-text-block\">", "</div></div>");
        masks = node.querySelectorAll(".a-text-mask");
    }

    if (params.breakWord) {
        let words = node.querySelectorAll(".a-word");
        (words as NodeListOf<HTMLElement>).forEach(element => {
            element.style.display = "inline-block";
            element.style.whiteSpace = "nowrap";
        });
    } else {
        let masks = node.querySelectorAll(".a-text-mask");
        (masks as NodeListOf<HTMLElement>).forEach(element => {
            element.style.whiteSpace = "no-wrap";
        })
    }

    return masks as NodeListOf<HTMLElement>;

    function parseLetters(string: string, startWord: string, endWord: string) {
        let newString = "";
        let isTag = false;
        let isWord = false;

        [...string].forEach((e, i) => {
            if (e === "<") {
                isTag = true;
                if (isWord) {
                    isWord = false;
                    newString += "</div>";
                }
            }
            if (string[i - 1] == ">" && e !== "<") {
                isTag = false;
                if (!isWord) {
                    isWord = true;
                    newString += "<div class=\"a-word\">";
                }
            }

            if (isTag) {
                newString += e;
            } else {
                if (e === " " || string[i - 1] === " " || i === 0 || i === string.length) {
                    isWord = !isWord;
                    newString += isWord ? "<div class=\"a-word\">" : "</div><span class=\"a-spacer a-text-block\"> </span>";
                }
                if (e !== " ") newString += startWord + e + endWord;
            }
        });

        return newString;
    }
}

export function letterSlideIn(node: HTMLElement, params: AnimationParams = {}) {
    const { delay = 35, initDelay = 0, duration = 600, breakWord = true, promise } = params;
    const originalNodeHTML = node.innerHTML;
    const masks = tagLettersAndWords(node, { breakWord });

    masks.forEach((e: HTMLElement) => {
        e.childNodes.forEach(child => {
            (child as HTMLElement).style.transform = "translateX(150%)";
        });
        e.style.transform = "translateX(80%)";
        e.style.display = "inline-flex";
        e.style.overflowY = "visible";
        e.style.overflowX = "clip";
    });

    let animeTargets: HTMLElement[] = [];
    masks.forEach((element: HTMLElement) => {
        const children = element.childNodes as NodeListOf<HTMLElement>;
        animeTargets = [...animeTargets, element, ...children];
    });

    const startAnimation = () => {
        anime(animeTargets, {
            translateX: "0%",
            duration: duration,
            easing: "cubicBezier(.2, .58, .43, 1)",
            delay: stagger(delay, { start: initDelay }),
            complete: () => {
                node.innerHTML = originalNodeHTML;
                if (params.onComplete) params.onComplete();
            }
        });
    };

    if (promise) {
        promise.then(startAnimation);
    } else {
        startAnimation();
    }
}

export function maskSlideIn(node: HTMLElement, params: AnimationParams = {}) {
    const { delay = 20, duration = 700, reverse = false, promise, maskStyles } = params;

    let mask = document.createElement("div");
    let parent = node.parentNode!;
    let index = Array.from(parent.children).indexOf(node);

    mask.classList.add("a-mask");
    node.classList.add("a-content");
    mask.insertBefore(node, mask.children[0]);
    mask.style.display = "inline-block";
    mask.style.overflow = "hidden";
    if (maskStyles) {
        maskStyles.forEach(element => {
            (mask.style as any)[element.property] = element.value;
        });
    }

    parent.insertBefore(mask, parent.children[index]);

    if (reverse) {
        mask.style.transform = "translateX(-100%)";
        node.style.transform = "translateX(100%)";
    } else {
        mask.style.transform = "translateX(100%)";
        node.style.transform = "translateX(-100%)";
    }

    const startAnimation = () => {
        anime([mask, node], {
            translateX: "0%",
            easing: "cubicBezier(.58,.14,.06,.97)",
            duration: duration,
            delay: delay,
            complete: () => {
                if (params.onComplete) params.onComplete();
            }
        });
    };

    if (promise) {
        promise.then(startAnimation);
    } else {
        startAnimation();
    }

    return mask;
}

export function workImageIntro(node: HTMLElement, promise: Promise<any>, delay: number = 0) {
    node.style.transition = "none";
    node.style.marginRight = "60%";

    promise.then(() => {
        anime(node, {
            marginRight: "0%",
            easing: "easeOutQuint",
            duration: 1400,
            delay: delay,
            complete: () => {
                node.style.marginRight = "";
                node.style.transition = "";
            }
        });
    });
}
