'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { getGPUTier } from 'detect-gpu';
import {
    loadPagePromise,
    dataStateAtom,
    scrollAnchorStateAtom,
    viewPortStateAtom,
    workScrollStateAtom
} from '../lib/store';
import { loadImage, onScrolledIntoView, fetchJsonData } from '../lib/utils';
import { letterSlideIn, maskSlideIn } from '../lib/animations';
import { ImageRenderer } from '../effects/work-slider/renderer';
import { useSetAtom } from 'jotai';

export default function WorkSection() {
    const workContainerRef = useRef<HTMLDivElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const listContainerRef = useRef<HTMLUListElement>(null);
    const workItemsRef = useRef<(HTMLLIElement | null)[]>([]);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

    const [workData, setWorkData] = useState<any[]>([]);
    const [currentActive, setCurrentActive] = useState<number>(-1);
    const [breakTitleWords, setBreakTitleWords] = useState(false);
    const [isInView, setIsInView] = useState(false);

    const [workScrollState, setWorkScrollState] = useAtom(workScrollStateAtom);
    const [viewPortState, setViewPortState] = useAtom(viewPortStateAtom);
    const setScrollAnchorState = useSetAtom(scrollAnchorStateAtom);

    const slider = useMemo(() => {
        return {
            currentPosition: 0,
            targetPosition: 0,
            initialPosition: 0,
            initialMouseX: 0,
            offsetSpeed: 5000,
            lerpSpeed: 0.1,

            onHold: (e: React.MouseEvent) => {
                if (currentActive >= 0 || (e.target as HTMLElement).classList.contains("button")) return;
                slider.initialMouseX = e.clientX;
                setWorkScrollState(prev => ({ ...prev, active: true }));

                if (listContainerRef.current) {
                    const style = window.getComputedStyle(listContainerRef.current);
                    const matrix = new DOMMatrixReadOnly(style.transform);
                    slider.initialPosition = matrix.m41;
                }
            },
            onRelease: () => {
                setWorkScrollState(prev => ({ ...prev, active: false }));
            },
            onMouseMove: (e: React.MouseEvent) => {
                if (!workScrollState.active) return;
                const diff = (e.clientX - slider.initialMouseX) * -1;
                slider.targetPosition = Math.round((slider.initialPosition - (slider.offsetSpeed * (diff / window.innerWidth))) * 100) / 100;
            },
            animate: () => {
                if (listContainerRef.current) {
                    let endPoint = listContainerRef.current.offsetWidth - window.innerWidth;
                    if (endPoint < 0) endPoint = listContainerRef.current.offsetWidth;

                    if (slider.targetPosition > 0) slider.targetPosition = 0;
                    if (slider.targetPosition <= (endPoint * -1)) slider.targetPosition = -endPoint;

                    slider.currentPosition = slider.currentPosition * (1 - slider.lerpSpeed) + slider.targetPosition * slider.lerpSpeed;

                    const speed = Math.round((slider.currentPosition - slider.targetPosition) * 100) / 100;
                    setWorkScrollState(prev => ({ ...prev, speed }));

                    listContainerRef.current.style.transform = `translate3d(${Math.round(slider.currentPosition * 100) / 100}px, 0px, 0px)`;
                }
                requestAnimationFrame(slider.animate);
            }
        };
    }, [currentActive, workScrollState.active]);

    useEffect(() => {
        const init = async () => {
            const data = await fetchJsonData('/projects/musabhassan/data/work-data.json');
            setWorkData(data);

            if (workContainerRef.current) {
                onScrolledIntoView(workContainerRef.current, () => setIsInView(true));
            }

            const gpuTier = await getGPUTier();
            setViewPortState(prev => ({ ...prev, isMobile: !!gpuTier.isMobile }));

            await loadPagePromise;
            setScrollAnchorState(prev => ({ ...prev, work: workContainerRef.current || undefined }));

            if (gpuTier.tier >= 2 && !gpuTier.isMobile && gpuTier.fps! >= 30 && canvasContainerRef.current) {
                const validImages = imagesRef.current.filter(img => img !== null) as HTMLImageElement[];
                new ImageRenderer(canvasContainerRef.current, validImages);
                slider.animate();
            }
        };
        init();
    }, []);

    const toggleActiveItem = (i: number) => {
        const nextActive = (currentActive === i) ? -1 : i;
        setCurrentActive(nextActive);
        if (nextActive >= 0 && workItemsRef.current[i]) {
            slider.targetPosition = -(workItemsRef.current[i]!.offsetLeft - (window.innerWidth / 4) + window.innerWidth / 10);
        }
    };

    return (
        <div id="content-container" className="work-click-area" ref={workContainerRef}>
            <div
                className={`content-wrapper ${currentActive >= 0 ? 'disabled' : ''}`}
                onMouseDown={slider.onHold}
                onMouseUp={slider.onRelease}
                onMouseLeave={slider.onRelease}
                onMouseMove={slider.onMouseMove}
                ref={canvasContainerRef}
            >
                <div className={viewPortState.isMobile ? 'mobile' : ''}>
                    <ul
                        className={`work-list ${workScrollState.active ? 'hold' : ''}`}
                        ref={listContainerRef}
                    >
                        {workData.map((item, i) => (
                            <li key={item.id} className="work-item-container">
                                <div
                                    className={`list-item clickable passive ${currentActive === i ? 'active' : ''} ${currentActive !== i && currentActive >= 0 ? 'ambient' : ''}`}
                                    ref={el => { workItemsRef.current[i] = el as any; }}
                                >
                                    <div className="img-wrapper">
                                        <img
                                            ref={el => { imagesRef.current[i] = el; }}
                                            src={`/projects/musabhassan/assets/imgs/work-back/${item.id}/cover.jpg`}
                                            alt={item.title}
                                            draggable="false"
                                            onDragStart={e => e.preventDefault()}
                                        />
                                    </div>

                                    <div className={`text-top-wrapper ${(currentActive >= 0 || workScrollState.active) ? 'hidden' : ''}`}>
                                        <p className="item-index">
                                            {String(i + 1).padStart(2, '0')}
                                        </p>
                                    </div>

                                    <div className={`text-wrapper ${(currentActive >= 0 || workScrollState.active) ? 'hidden' : ''}`}>
                                        <h1 className="item-title">
                                            <span>{item.title}</span>
                                        </h1>
                                        <button
                                            className="button item-link interactive"
                                            onClick={(e) => { e.stopPropagation(); toggleActiveItem(i); }}
                                        >
                                            view
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {currentActive !== -1 && (
                    <div className="details-container">
                        <div className="wrapper">
                            <div className="top-align">
                                <div className="wrapper row-flex">
                                    <div className="index">
                                        {String(currentActive + 1).padStart(2, '0')}
                                    </div>
                                    <span className="line"></span>
                                    <h6 className="caption">
                                        {workData[currentActive].details.summary}
                                    </h6>
                                </div>
                            </div>

                            <div className="mid-align">
                                <h1 className={`title ${breakTitleWords ? 'breakTitleWords' : ''}`}>
                                    {workData[currentActive].title}
                                </h1>
                                <button className="close-button-wrapper interactive" onClick={() => toggleActiveItem(-1)}>
                                    <div className="close-button">&times;</div>
                                </button>
                            </div>

                            <div className="bottom-align">
                                <div className="desc-box">
                                    <p className="paragraph">
                                        {workData[currentActive].details.description}
                                    </p>
                                </div>
                                <div className="roles">
                                    <div className="wrapper">
                                        <p className="descriptor">Role</p>
                                        <ul>
                                            {workData[currentActive].roles.map((role: string) => (
                                                <li key={role}>{"+ " + role}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="links">
                                    {workData[currentActive].links?.map((link: any, idx: number) => (
                                        <a key={idx} href={link.link} target="_blank" className="button" rel="noreferrer">
                                            {link.text}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .work-click-area { margin-top: 30vh; position: relative; }
                .content-wrapper { display: flex; flex-direction: column; cursor: grab; position: relative; min-height: 80vh; }
                .content-wrapper.disabled { cursor: default !important; }
                .mobile { width: 100%; height: 100%; overflow-x: auto; }
                
                .work-list { 
                    margin: auto 0; 
                    padding: 0 5vw; 
                    list-style-type: none; 
                    display: flex; 
                    flex-direction: row; 
                    align-items: center; 
                    height: 75vh; 
                    min-width: min-content; 
                    transition: transform 0.1s ease-out;
                }
                .hold .list-item { height: 45vh !important; }
                
                .list-item {
                    display: inline-flex;
                    justify-content: flex-end;
                    height: 55vh;
                    width: 23vw;
                    position: relative;
                    margin-right: 6vw;
                    transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1);
                }
                .list-item.active { height: 60vh; width: 50vw; margin-right: 16vw; margin-left: 10vw; }
                .list-item.ambient { height: 45vh; }
                
                .img-wrapper { 
                    overflow: hidden; height: 100%; width: 85%; margin-right: 15%; 
                    box-shadow: 3px 9px 18px rgba(0, 0, 0, 0.2); background: #333;
                }
                .img-wrapper img { height: 110%; width: 110%; object-fit: cover; opacity: 0.5; }
                .active .img-wrapper { width: 100%; }
                .active .img-wrapper img { opacity: 1; }

                .text-top-wrapper { position: absolute; top: 6vh; right: 0; z-index: 2; text-align: right; }
                .item-index { font-size: 1vw; letter-spacing: 0.1vw; text-transform: uppercase; color: #fff; }
                
                .text-wrapper { position: absolute; bottom: 10vh; right: 0; text-align: right; z-index: 2; color: #fff; }
                .item-title { font-size: 2.5vw; text-transform: lowercase; margin: 0; }
                .item-link { font-size: 1.3vw; text-transform: uppercase; color: #fff; background: none; border: none; cursor: pointer; padding: 0.5rem 0; }
                .hidden { opacity: 0; pointer-events: none; }

                .details-container { 
                    position: absolute; left: 0; top: 0; height: 100%; width: 100%; 
                    display: flex; padding: 0 14vw; box-sizing: border-box; background: rgba(34, 34, 36, 0.9); z-index: 10;
                }
                .details-container .wrapper { display: flex; flex-direction: column; justify-content: space-between; width: 100%; }
                .row-flex { display: flex; flex-direction: row; align-items: center; gap: 20px; }
                .line { flex-grow: 1; height: 1px; background: #fff; max-width: 200px; }
                .caption { text-transform: uppercase; font-size: 1.9vh; color: #fff; margin: 0; }
                .index { font-size: 2.1vh; color: #fff; }

                .mid-align { display: flex; justify-content: space-between; align-items: center; }
                .title { font-size: 7vw; text-transform: lowercase; color: #fff; margin: 0; }
                .close-button { font-size: 4vw; color: #fff; cursor: pointer; }
                .close-button-wrapper { background: none; border: none; }

                .bottom-align { display: flex; justify-content: space-between; align-items: center; gap: 5vh; }
                .desc-box { flex: 2; }
                .paragraph { font-size: 1.3vh; color: #ccc; width: 80%; }
                .roles { flex: 1; text-align: center; }
                .descriptor { text-transform: uppercase; font-size: 1.4vh; color: #aaa; }
                .roles ul { list-style: none; padding: 0; margin: 0; color: #fff; text-transform: uppercase; font-size: 1.7vh; }
                .links { flex: 1; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
                .links .button { text-transform: uppercase; text-decoration: none; color: #fff; font-size: 1.1vw; }

                @media (max-width: 750px) {
                    .mid-align { flex-direction: column; align-items: flex-start; }
                    .title { font-size: 12vw; }
                    .bottom-align { flex-direction: column; align-items: flex-start; }
                    .paragraph { width: 100%; }
                    .links { align-items: flex-start; }
                }
            `}</style>
        </div>
    );
}
