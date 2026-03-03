import { imgPromisesAtom } from "./store";
import { getDefaultStore } from "jotai";

const store = getDefaultStore();

export async function loadImage(src: string) {
    const promise = new Promise(async (resolve: (src: string) => void, reject) => {
        try {
            const response = await fetch(src);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        } catch (error) {
            reject(error);
        }
    });

    store.set(imgPromisesAtom, (val) => [...val, promise as Promise<string>]);
    return promise;
}

export async function fetchJsonData(sourceFile: string) {
    const request = await fetch(sourceFile);
    const data = await request.json();
    return data;
}

export function onScrolledIntoView(node: HTMLElement, entryInView: (entry: IntersectionObserverEntry) => void) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entryInView(entry);
                observer.disconnect();
            }
        });
    }, {
        root: null,
        threshold: 0.4
    });

    observer.observe(node);
}

export function devMsg() {
    const css = "font-size: 1.2rem; font-weight: bold;";
    console.log("%cInterested in how this site works?", css + "color: #22c55e;")
    console.log("%cCheck out the source code: https://github.com/Musab-Hassan/musabhassan.com", css);
}
