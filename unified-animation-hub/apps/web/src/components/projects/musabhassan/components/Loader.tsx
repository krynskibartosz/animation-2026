'use client';

import { useEffect, useState, useRef } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { imgPromisesAtom, loaderAnimationResolve, dataStateAtom } from '../lib/store';
import { waitForElementTransition } from '../lib/wait-for-element-transition';

export default function Loader() {
    const loaderRef = useRef<HTMLDivElement>(null);
    const [loadingDone, setLoadingDone] = useState(false);
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const imgPromises = useAtomValue(imgPromisesAtom);
    const dataState = useAtomValue(dataStateAtom);

    useEffect(() => {
        async function load() {
            let counter = 0;
            const length = imgPromises.length;

            if (length === 0) {
                setLoadingPercentage(100);
                finishLoading();
                return;
            }

            imgPromises.forEach(async (promise) => {
                try {
                    await promise;
                } catch (e) {
                    console.error("Image load failed", e);
                }
                counter++;
                const percentage = Math.round((counter / length) * 100);
                setLoadingPercentage(percentage);

                if (percentage >= 100) {
                    finishLoading();
                }
            });
        }

        async function finishLoading() {
            if (loaderRef.current) {
                await waitForElementTransition(loaderRef.current);
                setLoadingDone(true);
                setLoadingPercentage(0);

                await waitForElementTransition(loaderRef.current);
                loaderAnimationResolve();
            }
        }

        load();
    }, [imgPromises]);

    return (
        <div className="page-cover">
            <div className="loader-wrapper">
                <div className={`loader-background ${loadingDone ? 'outro' : ''}`}></div>
                <div
                    ref={loaderRef}
                    className={`loader ${loadingDone ? 'outro' : ''}`}
                    style={{ width: `${loadingPercentage}%` }}></div>
            </div>
            <style jsx>{`
                .page-cover {
                    width: 100vw;
                    height: 100vh;
                    position: fixed;
                    top: 0;
                    left: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    background-color: #222224;
                }
                .loader-wrapper {
                    position: relative;
                    display: block;
                    height: 0.1rem;
                    width: 20rem;
                }
                .loader, .loader-background {
                    position: absolute;
                    top: 0;
                    height: 100%;
                }
                .loader-background {
                    width: 100%;
                    background-color: rgba(255, 255, 255, 0.1);
                }
                .loader {
                    background-color: white;
                    transition: width 0.8s ease;
                }
                .outro {
                    transition: width 0.8s ease;
                    right: 0 !important;
                    width: 0 !important;
                }
            `}</style>
        </div>
    );
}
