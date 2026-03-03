'use client';

import { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { loadPagePromise, dataStateAtom } from '../lib/store';
import { onScrolledIntoView } from '../lib/utils';

export default function Footer() {
    const footerRef = useRef<HTMLDivElement>(null);
    const signaturePath1Ref = useRef<SVGPathElement>(null);
    const signaturePath2Ref = useRef<SVGPathElement>(null);
    const signaturePath3Ref = useRef<SVGPathElement>(null);
    const signaturePath4Ref = useRef<SVGPathElement>(null);

    const [isInView, setIsInView] = useState(false);
    const dataState = useAtomValue(dataStateAtom);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        loadPagePromise.then(() => {
            if (footerRef.current) {
                onScrolledIntoView(footerRef.current, () => {
                    setIsInView(true);
                    animateSignature();
                });
            }
        });
    }, []);

    const animateSignature = () => {
        const animation = [{ strokeDashoffset: '0' }];
        signaturePath1Ref.current?.animate(animation, { duration: 1000, delay: 0, easing: 'cubic-bezier(.72,.3,.25,1)', fill: 'forwards' });
        signaturePath2Ref.current?.animate(animation, { duration: 300, delay: 1000, easing: 'cubic-bezier(.47,.41,.26,1)', fill: 'forwards' });
        signaturePath3Ref.current?.animate(animation, { duration: 200, delay: 1300, easing: 'cubic-bezier(.47,.41,.26,1)', fill: 'forwards' });
        signaturePath4Ref.current?.animate(animation, { duration: 1000, delay: 1500, easing: 'cubic-bezier(.47,.41,.26,1)', fill: 'forwards' });
    };

    return (
        <div className={`footer-wrapper ${isInView ? 'in-view' : ''}`} ref={footerRef}>
            <div className="flex-wrapper">
                <div className="logo-wrapper">
                    <img src="/projects/musabhassan/assets/imgs/logo.svg" alt="mh logo" className="logo" />
                </div>

                <div className="status-wrapper">
                    <p className="large-text">
                        {dataState?.siteData?.availablity_date ?
                            `i am available for freelance work after ${dataState.siteData.availablity_date}.` :
                            'i am currently accepting freelance work, you may reach me on my email.'
                        }
                    </p>
                    <a className="button large-text email-link" href="mailto:musab@musabhassan.com" target="_blank" rel="noreferrer">musab@musabhassan.com</a>
                </div>

                <div className="credits-wrapper">
                    <p className="year">© {currentYear}</p>
                    <p className="credits">
                        designed and developed by Musab Hassan<br />
                        <a className="clickable button no-decor github-link" href="https://github.com/Musab-Hassan/musabhassan.com" target="_blank" rel="noreferrer">
                            this website is open source on github
                        </a>
                    </p>
                </div>
            </div>

            <div className="flex-wrapper decor">
                <svg id="signature" className="name-signature" viewBox="0 0 190 136.9" style={{ stroke: 'rgb(79, 78, 85)' }}>
                    <g>
                        <path ref={signaturePath1Ref} className="path-1" style={{ fill: 'none', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 4 }} d="M38.1,51c0,0,4.9-34.4,39.6-37.7c11.1-1.1-11.5,86.2-48.9,87.5c-18.5,0.6,19-69.3,51.7-84.4c21.3-9.8,15.3,26,15.3,26s6.2-9.3,7.9-6.1c1.7,3.1,0.1,5.1,6.9-1.9c1-1.2,13.9,3.3,18.8-1.3c1.4-1.3,6.4,1.3,6.4,1.3" />
                        <path ref={signaturePath2Ref} className="path-2" style={{ fill: 'none', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 4 }} d="M132.2,48.3l-23.9,78.8" />
                        <path ref={signaturePath3Ref} className="path-3" style={{ fill: 'none', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 4 }} d="M110.3,55.3c0,0-0.7,11.7-2.8,18s-6.7,20.2-6.9,24.1" />
                        <path ref={signaturePath4Ref} className="path-4" style={{ fill: 'none', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 4 }} d="M122,74.4c0,0-5.9-8-17.1-6.7c-11.1,1.3-20.2,11.3-21.1,12.6c-0.9,1.3-10,9.6,2.2,15s38.9-7.2,38.9-7.2s17.8-10,18.9-10s-4.6,5.9-4.3,7.2c0.4,1.3,2.8,2,7.2-1.5c1-0.8,17.2-0.8,22.2,1c1.9,0.7,3.5-0.2,5-1.4c1-0.8,9.4,2,9.4,2" />
                    </g>
                </svg>
            </div>

            <style jsx>{`
                .footer-wrapper {
                    width: 100vw; background-color: #131314; display: flex;
                    justify-content: space-between; padding: 15vh 13vw; margin-top: 25vh; box-sizing: border-box;
                }
                .flex-wrapper { display: flex; flex-direction: column; }
                .logo-wrapper { margin-bottom: 5vh; }
                .logo { height: 6vh; }
                .large-text { font-size: 2.5vh; color: #fff; margin: 0; }
                .email-link { display: block; margin-top: 2vh; color: #fff; text-decoration: none; border-bottom: 1px solid #444; width: fit-content; }
                
                .credits-wrapper { margin-top: 5vh; color: rgba(255,255,255,0.3); }
                .year { font-family: "Questrial", sans-serif; font-size: 1.8vh; margin-bottom: 1vh; }
                .credits { font-size: 1.5vh; line-height: 1.5; }
                .github-link { color: rgba(255,255,255,0.3); text-decoration: none; }

                .flex-wrapper.decor { justify-content: center; }
                .name-signature { width: 20vh; opacity: 0.5; }
                
                .path-1 { stroke-dasharray: 365; stroke-dashoffset: 365; }
                .path-2 { stroke-dasharray: 85; stroke-dashoffset: 85; }
                .path-3 { stroke-dasharray: 45; stroke-dashoffset: 45; }
                .path-4 { stroke-dasharray: 180; stroke-dashoffset: 180; }

                @media (max-width: 950px) {
                    .footer-wrapper { flex-direction: column-reverse; padding: 10vh 7vw; }
                    .flex-wrapper.decor { display: none; }
                    .flex-wrapper:not(:first-child) { margin-bottom: 10vh; }
                }

                /* Animation stim */
                .footer-wrapper:not(.in-view) .logo,
                .footer-wrapper:not(.in-view) .status-wrapper,
                .footer-wrapper:not(.in-view) .credits-wrapper {
                    opacity: 0; transform: translateY(20px);
                }
                .footer-wrapper.in-view .logo,
                .footer-wrapper.in-view .status-wrapper,
                .footer-wrapper.in-view .credits-wrapper {
                    opacity: 1; transform: translateY(0); transition: 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .status-wrapper { transition-delay: 0.2s; }
                .credits-wrapper { transition-delay: 0.4s; }
            `}</style>
        </div>
    );
}
