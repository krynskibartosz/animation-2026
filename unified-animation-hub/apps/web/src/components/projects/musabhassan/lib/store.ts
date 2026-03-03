import { atom } from "jotai";

export const imgPromisesAtom = atom<Promise<string>[]>([]);

// Page loading promises
let loadPageResolve: (value?: any) => void;
export const loadPagePromise = new Promise((resolve) => {
    loadPageResolve = resolve;
});
export { loadPageResolve };

let loaderAnimationResolve: (value?: any) => void;
export const loaderAnimationPromise = new Promise((resolve) => {
    loaderAnimationResolve = resolve;
});
export { loaderAnimationResolve };

// Site states
export const workScrollStateAtom = atom({ active: false, speed: 0 });
export const viewPortStateAtom = atom<{ isMobile: boolean, slickscrollInstance: any }>({ isMobile: false, slickscrollInstance: null });
export const scrollAnchorStateAtom = atom<{ home: HTMLElement | undefined, work: HTMLElement | undefined, about: HTMLElement | undefined }>({ home: undefined, work: undefined, about: undefined });
export const dataStateAtom = atom<{ siteData: any, workData: any }>({ siteData: undefined, workData: undefined });
