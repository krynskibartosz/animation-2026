'use client';

import { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { loadPagePromise, scrollAnchorStateAtom, viewPortStateAtom } from '../lib/store';
import { loadImage, onScrolledIntoView } from '../lib/utils';
import { useAtom } from 'jotai';

export default function AboutSection() {
    const section1Ref = useRef<HTMLDivElement>(null);
    const section2Ref = useRef<HTMLDivElement>(null);
    const profilePicContainerRef = useRef<HTMLDivElement>(null);

    const [sectionOneInView, setSectionOneInView] = useState(false);
    const [sectionTwoInView, setSectionTwoInView] = useState(false);
    const [profilePicSrc, setProfilePicSrc] = useState('');

    const [scrollAnchorState, setScrollAnchorState] = useAtom(scrollAnchorStateAtom);
    const viewPortState = useAtomValue(viewPortStateAtom);

    useEffect(() => {
        const loadAssets = async () => {
            setProfilePicSrc(await loadImage('/projects/musabhassan/assets/imgs/profile-photo.jpg'));
        };
        loadAssets();
    }, []);

    useEffect(() => {
        loadPagePromise.then(() => {
            if (section1Ref.current) {
                setScrollAnchorState(prev => ({ ...prev, about: section1Ref.current! }));
            }

            if (viewPortState.slickscrollInstance && profilePicContainerRef.current) {
                viewPortState.slickscrollInstance.addOffset({
                    element: profilePicContainerRef.current,
                    speedY: 0.8
                });
            }

            if (section1Ref.current) {
                onScrolledIntoView(section1Ref.current, () => setSectionOneInView(true));
            }
            if (section2Ref.current) {
                onScrolledIntoView(section2Ref.current, () => setSectionTwoInView(true));
            }
        });
    }, [viewPortState.slickscrollInstance]);

    const expertise = [
        { label: "Front-end", icons: ["svelte.svg", "react.svg"] },
        { label: "Back-end", icons: ["nodejs.svg", "php.svg"] },
        { label: "Dev-ops", icons: ["firebase.svg", "gcp.svg"] },
        { label: "Mobile", icons: ["flutter.svg", "android.svg", "iOS.svg"] }
    ];

    return (
        <div className="about-wrapper">
            <div id="content-container" className={`about ${sectionOneInView ? 'in-view' : ''}`} ref={section1Ref}>
                <div className="content-wrapper">
                    <h1 className="title">
                        Hey I'm <br />Musab
                    </h1>
                    <div className="paragraph-mask">
                        <p className="paragraph">
                            I'm a web developer from British Columbia, Canada. I specialize in designing and developing web experiences<br /><br />I work with organizations and individuals to create beautiful, responsive, and scalable web products tailor-made for them. Think we can make something great together? Let's talk over email.
                        </p>
                    </div>
                    <div className="social-button-wrapper">
                        <span className="social-button"><a href="mailto:musab@musabhassan.com" target="_blank" className="clickable sublink link" rel="noreferrer">Email Me</a></span>
                        <span className="social-button"><a href="https://github.com/Musab-Hassan" target="_blank" className="clickable sublink link" rel="noreferrer">Github</a></span>
                    </div>
                </div>
                <div className="profile-image" ref={profilePicContainerRef}>
                    {profilePicSrc && <img src={profilePicSrc} alt="Musab's Profile" className="profile-pic" />}
                </div>
            </div>

            <div className={`horizontal-flex ${sectionTwoInView ? 'in-view' : ''}`} ref={section2Ref}>
                <ul className="list first">
                    <li className="list-title">technical expertise</li>
                    {expertise.map((item, idx) => (
                        <li key={idx}>
                            <div className="label">{item.label}</div>
                            <div className="flex-item">
                                {item.icons.map(icon => (
                                    <img key={icon} src={`/projects/musabhassan/assets/imgs/svg-icons/${icon}`} alt={icon} />
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
                <ul className="list">
                    <li className="list-title">awards</li>
                    <li>
                        <div className="label">1x — Awwwards Honors</div>
                    </li>
                </ul>
            </div>

            <style jsx>{`
                .about-wrapper { color: white; }
                #content-container.about { display: flex; flex-direction: row; justify-content: space-between; overflow: hidden; padding: 0 5vw; margin-top: 40vh; position: relative; padding-bottom: 5vh; }
                
                .content-wrapper { width: 50%; margin: 0 2vw; padding-right: 4vw; display: flex; flex-direction: column; justify-content: center; margin-top: 5vh; z-index: 2; }
                h1.title { font-size: 20vh; font-weight: 400; margin: 0; line-height: 1; }
                
                .paragraph { margin-top: 10vh; margin-left: 13vw; position: relative; width: 60%; line-height: 1.5rem; color: #ccc; }
                .paragraph::before { content: ""; position: absolute; height: 1px; width: 10vw; right: 115%; top: 15%; background-color: white; }
                
                .social-button-wrapper { font-size: 3vh; margin-left: 13vw; margin-top: 4vh; }
                .social-button { margin-right: 2vw; display: inline-block; }
                .social-button a { color: white; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.3s; }
                .social-button a:hover { border-color: white; }

                .profile-image { width: 55%; overflow: hidden; margin-top: -40vh; position: relative; }
                .profile-image img { height: 80%; width: 90%; border-radius: 0.5vh; object-fit: cover; }

                .horizontal-flex { display: flex; flex-direction: row; justify-content: space-between; padding: 0 13vw; margin-top: 12vh; width: 100%; box-sizing: border-box; }
                .list { list-style-type: none; text-align: left; flex: 1; }
                .list-title { letter-spacing: 0.6vh; font-size: 1.3vh; font-weight: bold; text-transform: uppercase; margin-bottom: 1vh; opacity: 0.6; }
                
                .list li { text-transform: uppercase; font-size: 2vh; letter-spacing: 0.5vh; padding: 2vh 0; border-bottom: 1px solid #444; display: flex; justify-content: space-between; align-items: center; }
                .flex-item { display: flex; gap: 15px; }
                .flex-item img { height: 2.3vh; filter: brightness(0.8); }

                @media (max-width: 950px) {
                    .profile-image { display: none; }
                    .content-wrapper { width: 100%; }
                    h1.title { font-size: 15vw; }
                }

                @media (max-width: 1080px) {
                    .horizontal-flex { flex-direction: column; padding: 0 8vw; }
                }

                /* Basic transition simulation */
                .paragraph-mask { overflow: hidden; }
                .about:not(.in-view) .title,
                .about:not(.in-view) .paragraph,
                .about:not(.in-view) .social-button,
                .about:not(.in-view) .profile-image {
                    opacity: 0;
                    transform: translateY(30px);
                }
                .about.in-view .title,
                .about.in-view .paragraph,
                .about.in-view .social-button,
                .about.in-view .profile-image {
                    opacity: 1;
                    transform: translateY(0);
                    transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .about.in-view .paragraph { transition-delay: 0.2s; }
                .about.in-view .social-button { transition-delay: 0.4s; }
            `}</style>
        </div>
    );
}
