'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Power2, Power4 } from 'gsap/gsap-core';
import { BiMenu } from 'react-icons/bi';
import { LuArrowUpRight } from 'react-icons/lu';
import LocomotiveScroll from 'locomotive-scroll';
import './MotionWebsite.css';

gsap.registerPlugin(ScrollTrigger);

// --- Shared Components ---

const Button = ({ bgColor, text }: { bgColor: string; text: string }) => {
    return (
        <div className={`${bgColor} motion-section w-fit px-4 py-[1.6vh] border-[1px] border-[--black] group`}>
            <div className="flex items-center gap-2 overflow-hidden relative cursor-pointer">
                <span className="font-[Sansita] text-[1.8vh] capitalize tracking-normal font-semibold transition-transform duration-500 group-hover:-translate-y-full">
                    {text}
                </span>
                <span className="font-[Sansita] text-[1.8vh] capitalize tracking-normal font-semibold absolute top-full transition-transform duration-500 group-hover:-translate-y-full">
                    {text}
                </span>
                <LuArrowUpRight style={{ fontSize: '24px', color: 'black' }} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
        </div>
    );
};

const Row = ({ translateClass, direction }: { translateClass: string; direction: string }) => {
    const items = [
        { text: 'useful', image: '/motion-website/images/img7.png' },
        { text: 'intuitive', image: '/motion-website/images/img2.png' },
        { text: 'empathetic', image: '/motion-website/images/img3.png' },
        { text: 'useful', image: '/motion-website/images/img4.png' },
        { text: 'empathetic', image: '/motion-website/images/img5.png' },
        { text: 'intuitive', image: '/motion-website/images/img2.png' },
        { text: 'useful', image: '/motion-website/images/img4.png' },
        { text: 'empathetic', image: '/motion-website/images/img5.png' },
        { text: 'intuitive', image: '/motion-website/images/img2.png' },
        { text: 'empathetic', image: '/motion-website/images/img6.png' },
        { text: 'useful', image: '/motion-website/images/img1.png' },
        { text: 'empathetic', image: '/motion-website/images/img6.png' },
        { text: 'empathetic', image: '/motion-website/images/img5.png' },
        { text: 'intuitive', image: '/motion-website/images/img2.png' },
        { text: 'useful', image: '/motion-website/images/img4.png' },
    ];

    return (
        <div className={`${translateClass} ${direction} row w-full flex items-center gap-8 whitespace-nowrap mb-2`}>
            {items.map((item, index) => (
                <div key={index} className="elem flex items-center gap-8">
                    <h1 className="font-[SansitaBold] text-[6vh] sm:text-[8.4vh] leading-[6vh] sm:leading-[9vh]">
                        {item.text}
                    </h1>
                    <div className="imgdiv w-[5vh] h-[5vh]">
                        <img className="w-full h-full object-contain" src={item.image} alt={item.text} />
                    </div>
                </div>
            ))}
        </div>
    );
};

const Card = () => {
    const items = [
        {
            title: 'Driven by Purpose',
            description: 'We believe technology can dramatically improve the experience of managing health, and when crafted with empathy, intention, and expertise, impact lives at scale.',
            image: `<svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.2" d="M45.9998 10H31.9998L19.7271 26L31.9998 56L59.9998 26L45.9998 10Z" fill="currentColor"></path>
        <path d="M18 10H46L60 26L32 56L4 26L18 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M44.2726 26L31.9998 56L19.7271 26L31.9998 10L44.2726 26Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M4 26H60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>`,
        },
        {
            title: 'Custom Products',
            description: 'We see a need and we develop a solution. Our proprietary technology is available to integrate with your systems, to license, or to customize to meet your needs.',
            image: `<svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.2" d="M49.0005 54C52.8665 54 56.0005 50.866 56.0005 47C56.0005 43.134 52.8665 40 49.0005 40C45.1345 40 42.0005 43.134 42.0005 47C42.0005 50.866 45.1345 54 49.0005 54Z" fill="currentColor"></path>
        <path opacity="0.2" d="M15 24C18.866 24 22 20.866 22 17C22 13.134 18.866 10 15 10C11.134 10 8 13.134 8 17C8 20.866 11.134 24 15 24Z" fill="currentColor"></path>
        <path d="M49.0005 54C52.8665 54 56.0005 50.866 56.0005 47C56.0005 43.134 52.8665 40 49.0005 40C45.1345 40 42.0005 43.134 42.0005 47C42.0005 50.866 45.1345 54 49.0005 54Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M49.0006 40L49.0002 29.9703C49.0001 26.7878 47.7358 23.7358 45.4855 21.4855L36 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M36 22V12H46" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M15 24C18.866 24 22 20.866 22 17C22 13.134 18.866 10 15 10C11.134 10 8 13.134 8 17C8 20.866 11.134 24 15 24Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M15 24L15.0004 34.0297C15.0005 37.2122 16.2648 40.2642 18.5151 42.5145L28.0006 52" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M28.0003 42V52H18.0003" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>`,
        },
        {
            title: 'Partnerships',
            description: 'We partner with like-minded benefits providers, insurance, and health companies to create custom solutions and technology.',
            image: `<svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.2" d="M50 38.2155L40.8007 47.4147C40.5565 47.659 40.2532 47.8358 39.9204 47.928C39.5875 48.0201 39.2365 48.0246 38.9014 47.9408L24.4122 44.3185C24.1404 44.2506 23.886 44.1263 23.6653 43.9537L10 33.268L18.1436 17.9475L30.9736 14.2071C31.4319 14.0735 31.9229 14.1082 32.3578 14.3051L41 18.2155H35.8284C35.5658 18.2155 35.3057 18.2672 35.0631 18.3677C34.8204 18.4682 34.5999 18.6155 34.4142 18.8012L24.6306 28.5848C24.428 28.7875 24.2713 29.0313 24.1711 29.2997C24.0709 29.5682 24.0295 29.855 24.0498 30.1408C24.0702 30.4267 24.1517 30.7048 24.2888 30.9564C24.426 31.208 24.6156 31.4271 24.8448 31.5991L26.2 32.6155C27.5848 33.654 29.269 34.2155 31 34.2155C32.731 34.2155 34.4152 33.654 35.8 32.6155L39 30.2155L50 38.2155Z" fill="currentColor"></path>
        <path d="M60.1794 30.4462L54 33.5359L46 18.2154L52.2423 15.0942C52.7113 14.8597 53.2536 14.8188 53.7525 14.9802C54.2514 15.1416 54.6669 15.4925 54.9096 15.9573L61.0578 27.7316C61.1808 27.967 61.2556 28.2246 61.2779 28.4892C61.3002 28.7539 61.2696 29.0204 61.1878 29.2731C61.1061 29.5258 60.9748 29.7596 60.8016 29.9611C60.6285 30.1625 60.417 30.3274 60.1794 30.4462V30.4462Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M10.0011 33.2681L3.8217 30.1784C3.58414 30.0596 3.37261 29.8947 3.19947 29.6932C3.02633 29.4918 2.89504 29.258 2.81327 29.0052C2.7315 28.7525 2.70088 28.4861 2.7232 28.2214C2.74552 27.9568 2.82033 27.6992 2.94327 27.4638L9.09151 15.6895C9.33421 15.2247 9.74973 14.8738 10.2486 14.7124C10.7475 14.551 11.2898 14.5919 11.7588 14.8264L18.0011 17.9475L10.0011 33.2681Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M54 33.5359L50 38.2154L40.8007 47.4147C40.5565 47.6589 40.2532 47.8357 39.9204 47.9279C39.5875 48.0201 39.2365 48.0245 38.9014 47.9407L24.4122 44.3184C24.1404 44.2505 23.886 44.1262 23.6653 43.9537L10 33.2679" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M50 38.2155L39 30.2155L35.8 32.6155C34.4152 33.654 32.7309 34.2155 31 34.2155C29.269 34.2155 27.5848 33.654 26.2 32.6155L24.8448 31.5991C24.6156 31.4271 24.4259 31.208 24.2888 30.9564C24.1516 30.7048 24.0701 30.4267 24.0498 30.1408C24.0295 29.855 24.0709 29.5682 24.1711 29.2997C24.2713 29.0313 24.428 28.7875 24.6306 28.5849L34.4142 18.8012C34.5999 18.6155 34.8204 18.4682 35.063 18.3677C35.3057 18.2672 35.5658 18.2155 35.8284 18.2155H46" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M18.1433 17.9475L30.9733 14.2071C31.4316 14.0735 31.9226 14.1082 32.3576 14.3051L40.9997 18.2155" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M28 53.2154L20.4651 51.3317C20.1594 51.2552 19.876 51.1076 19.6381 50.9008L14 46" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>`,
        },
        {
            title: 'Security & Compliance',
            description: 'Not just technology experts. Health experts. We are able to navigate both stringent regulatory environments and the complexities of technology and data.',
            image: `<svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.2" d="M10 26.6667V12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10H52C52.5304 10 53.0391 10.2107 53.4142 10.5858C53.7893 10.9609 54 11.4696 54 12V26.6667C54 47.6705 36.1735 54.6292 32.6141 55.8093C32.2161 55.9463 31.7839 55.9463 31.386 55.8093C27.8265 54.6292 10 47.6705 10 26.6667Z" fill="currentColor"></path>
        <path d="M10 26.6667V12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10H52C52.5304 10 53.0391 10.2107 53.4142 10.5858C53.7893 10.9609 54 11.4696 54 12V26.6667C54 47.6705 36.1735 54.6292 32.6141 55.8093C32.2161 55.9463 31.7839 55.9463 31.386 55.8093C27.8265 54.6292 10 47.6705 10 26.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M43 24L28.3333 38L21 31" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>`,
        },
    ];

    return (
        <div className="card-container flex sm:flex-col gap-10 mt-20">
            {items.map((item, index) => (
                <div key={index} className="card min-w-[40vh] sm:w-[30vw] flex flex-col sm:flex-row items-center gap-6 border-[1px] border-[--black] py-8 px-8">
                    <div className="rightdata w-[10vh] h-[10vh] sm:w-[28vh] sm:h-[10vh]" dangerouslySetInnerHTML={{ __html: item.image }} />
                    <div className="font-[Sansita] leftdata">
                        <h1 className="text-[3vh] font-bold whitespace-nowrap sm:text-[2.8vh] sm:font-bold mb-2">{item.title}</h1>
                        <p className="text-[2.2vh] sm:text-[2vh] font-medium">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const List = () => {
    const data = [
        { key: 1, title: 'Dr. Rick McCartney', role: 'CEO', img: '/motion-website/images/team1.png' },
        { key: 2, title: 'Chris Koha', role: 'COO', img: '/motion-website/images/team2.png' },
        { key: 3, title: 'Caroline Nieto', role: 'Chief Product Officer', img: '/motion-website/images/team3.png' },
        { key: 4, title: 'Victor Albertos', role: 'CTO', img: '/motion-website/images/team4.png' },
        { key: 5, title: 'Dr. Jana Hapfelmeier', role: 'Chief Innovation Officer', img: '/motion-website/images/team5.png' },
        { key: 6, title: 'Michael Robin', role: 'VP of Marketing', img: '/motion-website/images/team6.png' },
        { key: 7, title: 'Adrian Rubio', role: 'VP of Engineering', img: '/motion-website/images/team7.png' },
        { key: 8, title: 'Cy Serrano', role: 'VP of Product', img: '/motion-website/images/team8.png' },
        { key: 9, title: 'Lenya McGrath', role: 'VP of Partnerships', img: '/motion-website/images/team9.png' },
    ];

    const listRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        listRefs.current.forEach((el) => {
            if (!el) return;
            let rotate = 0;
            let diffrot = 0;

            const onMouseMove = (dets: MouseEvent) => {
                const rect = el.getBoundingClientRect();
                const diff = dets.clientY - rect.top;
                diffrot = dets.clientX - rotate;
                rotate = dets.clientX;

                gsap.to(el.querySelector('.picture'), {
                    opacity: 1,
                    ease: Power4.easeOut,
                    top: diff,
                    left: dets.clientX - rect.left,
                    rotate: gsap.utils.clamp(-20, 20, diffrot * 0.2),
                });

                gsap.to(el.querySelector('.bluelayer'), {
                    height: '100%',
                    ease: Power4.easeOut,
                    duration: 0.1,
                });
            };

            const onMouseLeave = () => {
                gsap.to(el.querySelector('.picture'), { opacity: 0, ease: Power4.easeOut, duration: 0.5 });
                gsap.to(el.querySelector('.bluelayer'), {
                    height: '0%',
                    ease: Power4.easeOut,
                    duration: 0.1,
                });
            };

            el.addEventListener('mousemove', onMouseMove);
            el.addEventListener('mouseleave', onMouseLeave);

            return () => {
                el.removeEventListener('mousemove', onMouseMove);
                el.removeEventListener('mouseleave', onMouseLeave);
            };
        });
    }, []);

    return (
        <div className="list-container">
            {data.map((item, index) => (
                <div
                    key={index}
                    ref={(el) => { listRefs.current[index] = el; }}
                    className="listelem w-full py-[3vh] sm:px-[4vh] sm:py-[6vh] flex justify-between items-center border-b-2 border-black sm:relative overflow-hidden"
                >
                    <div className="relative w-full sm:flex sm:items-center justify-between z-[3]">
                        <div className="left sm:flex items-center gap-14 sm:text-5xl">
                            <h3 className="hidden sm:inline-block opacity-25">0{item.key}</h3>
                            <h1 className="text-blue-600 text-3xl sm:text-black sm:text-[6vh]">{item.title}</h1>
                        </div>
                        <h3 className="font-[Sansita] text-[3vh] sm:text-[2.4vh] font-medium tracking-tight">
                            {item.role}
                        </h3>
                    </div>
                    <div className="picture w-[14vh] h-[14vh] sm:opacity-0 sm:absolute z-[4] pointer-events-none overflow-hidden rounded-full">
                        <img src={item.img} className="w-full h-full object-contain" alt={item.title} />
                    </div>
                    <div className="hidden sm:inline-block bluelayer sm:absolute top-0 left-0 z-[2] w-full h-0 bg-[#f5f19c]"></div>
                </div>
            ))}
        </div>
    );
};

// --- Sections ---

const Home = () => {
    const container = useRef(null);
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 50) setHidden(true);
        else setHidden(false);
    });

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
            },
        });
        tl.to('.vdodiv', { clipPath: 'circle(0% at 50% 50%)', ease: Power4.easeInOut }, 'start');
        tl.to('.slidesm', { scale: 1, ease: Power2.easeInOut }, 'start');
        tl.to('.lft', { xPercent: -10, stagger: 0.03, ease: Power4.easeInOut, duration: 1 }, 'start');
        tl.to('.rgt', { xPercent: 10, stagger: 0.03, ease: Power4.easeInOut, duration: 1 }, 'start');

        // Text reveal
        const para = document.querySelector('.toptext');
        if (para) {
            const text = para.textContent || '';
            para.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
            gsap.set('.toptext span', { opacity: 0.1 });
            gsap.to('.toptext span', {
                scrollTrigger: {
                    trigger: '.home',
                    start: 'top 50%',
                    end: 'bottom 90%',
                    scrub: 1,
                },
                opacity: 1,
                stagger: 0.03,
            });
        }
    }, { scope: container });

    return (
        <div ref={container} data-color="black" className="home motion-section w-full h-[200vh] relative">
            <div className="w-full sticky top-0 left-0 h-screen overflow-hidden">
                <motion.div
                    animate={hidden ? { y: '-100%' } : { y: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="w-full px-6 fixed top-0 left-0 z-[9] py-4"
                >
                    <div className="w-full flex items-center justify-between">
                        <div className="logo w-[12vh] h-[10vh] cursor-pointer">
                            <svg viewBox="0 0 141 41" fill="none" className="w-full h-full">
                                <path d="M-0.43052 20.9465C0.652448 20.9465 1.68707 20.941 2.72169 20.9588C2.79352 20.9588 2.91508 21.1241 2.92475 21.2211C3.02144 22.1886 3.23002 23.1274 3.61541 24.0225C4.50638 26.0928 6.05623 27.4402 8.25256 27.995C10.6602 28.6031 13.043 28.4213 15.3402 27.4989C16.8251 26.9031 17.9261 25.8687 18.3391 24.2903C18.7991 22.533 18.6223 20.8699 17.2382 19.5253C16.4757 18.7846 15.5156 18.3282 14.4907 18.0973C12.6576 17.686 10.8094 17.3416 8.9598 17.0054C7.32016 16.7075 5.68189 16.4124 4.14723 15.7332C2.00201 14.7835 0.666261 13.2243 0.395519 10.8616C0.177268 8.95665 0.428671 7.14329 1.45915 5.48297C2.13186 4.40069 3.07255 3.59718 4.19143 2.99591C5.71228 2.17873 7.35884 1.80704 9.07169 1.67312C10.2514 1.5802 11.4338 1.56107 12.6079 1.71412C14.7932 2.00109 16.7644 2.78273 18.346 4.34603C19.5574 5.54446 20.3669 6.9916 20.7647 8.63962C20.9678 9.47593 21.0755 10.3341 21.2219 11.1841C21.233 11.2483 21.2109 11.3166 21.2012 11.43C20.8517 11.43 20.5092 11.43 20.1666 11.43C19.5339 11.43 18.8999 11.4109 18.2673 11.4382C17.9122 11.4533 17.8183 11.3043 17.7948 10.99C17.6926 9.65221 17.3197 8.40048 16.5585 7.27584C15.5405 5.76994 14.0859 4.93363 12.3109 4.62753C10.5718 4.3269 8.8493 4.42255 7.1765 4.99786C5.46917 5.58546 4.2453 6.67184 3.8903 8.4893C3.48833 10.5459 4.06573 12.2267 6.34079 13.2147C7.65859 13.7873 9.06617 14.021 10.4737 14.2574C12.0899 14.5293 13.7157 14.7657 15.314 15.1196C16.8873 15.4681 18.4012 16.0065 19.6804 17.0437C20.7951 17.9483 21.5452 19.0784 21.7979 20.4859C21.9361 21.2526 22.0604 22.0383 22.0424 22.8118C21.9844 25.3029 21.0672 27.4169 19.0104 28.9461C17.6926 29.9258 16.18 30.4902 14.5736 30.8154C13.206 31.0928 11.8233 31.2117 10.4309 31.1776C7.97077 31.1174 5.65012 30.5872 3.60713 29.1428C2.0103 28.0127 0.95496 26.4932 0.280868 24.6907C-0.103144 23.6617 -0.3062 22.5945 -0.427757 21.5095C-0.445715 21.3428 -0.43052 21.1733 -0.43052 20.9478V20.9465Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <div className="hidden md:flex gap-2 items-center cursor-pointer">
                            {['Solutions', 'About', 'Insight', 'Team', 'Careers'].map((item, index) => (
                                <div key={index} className="motion-links h-[3vh] relative px-[2.2vh] text-center flex flex-col font-[Sansita] text-[2.1vh] overflow-hidden font-medium leading-[2.5vh]">
                                    <a>{item}</a>
                                    <a>{item}</a>
                                </div>
                            ))}
                        </div>
                        <BiMenu style={{ fontSize: '5.5vw' }} className="inline-block sm:hidden cursor-pointer" />
                    </div>
                </motion.div>

                <div className="btmtext absolute z-[4] bottom-[4%] left-1/2 -translate-x-1/2 text-center sm:text-start sm:bottom-[7%] sm:left-8 w-48">
                    <h1 className="sm:text-[2vh] font-semibold text-white">We build big ideas. Software. Apps. Tools. For real people. Real lives.</h1>
                </div>

                <div className="vdodiv w-full h-screen absolute z-[3] top-0 left-0 overflow-hidden motion-vdodiv">
                    <video className="absolute w-full h-screen object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" autoPlay loop muted src="/motion-website/video/1ENIoa5sjq.mp4"></video>
                </div>

                <div className="marqueecontainer w-full h-screen relative overflow-hidden flex flex-col justify-center items-center">
                    <div className="heading absolute top-[12%] sm:top-[7%] left-1/2 -translate-x-1/2 w-72">
                        <h2 className="toptext text-[2.2vh] font-[Sansita] tracking-wide font-medium text-center">Crafting a new paradigm of healthcare, one that is</h2>
                    </div>
                    <div className="slidesm absolute scale-[5] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]">
                        <Row translateClass="-translate-x-1/2" direction="lft" />
                        <Row translateClass="-translate-x-2/3" direction="rgt" />
                        <Row translateClass="-translate-x-1/4" direction="lft" />
                        <Row translateClass="-translate-x-1/3" direction="rgt" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Craft = () => {
    const container = useRef(null);

    useGSAP(() => {
        const para = document.querySelector('.texthead');
        if (para) {
            const text = para.textContent || '';
            para.innerHTML = text.split('').map(char => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.ltext',
                    start: 'top 100%',
                    end: 'bottom 50%',
                    scrub: 0.5,
                },
            });
            tl.from('.texthead span', { y: 100, opacity: 0, duration: 0.5, stagger: 0.1 });
        }

        gsap.matchMedia().add("(min-width: 768px)", () => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".cards",
                    start: "top 10%",
                    scrub: 1,
                }
            }).fromTo('.card', { y: 600, scale: 0.9 }, { y: 0, scale: 1.1, duration: 0.5, ease: Power4.easeOut, transformOrigin: 'bottom 50% -50' });
        });
    }, { scope: container });

    return (
        <div data-color="cyan" className="craft motion-section w-full sm:flex gap-x-40 justify-between items-center px-8 py-32 sm:px-10 relative">
            <div className="ltext sm:sticky sm:top-[10%] left-0 sm:w-1/2">
                <p className="font-[Sansita] text-[2.6vh] sm:text-[2.9vh] font-medium leading-[4.4vh] sm:leading-[4.2vh]">
                    Significo is a custom health software developer founded on the belief that technology can transform healthcare to put people first. We put humanity back at the center of healthcare by simplifying complexity, accelerating capacity, and improving outcomes.
                </p>
                <h1 className="texthead font-[SansitaReg] text-[5vh] leading-[6vh] sm:text-[9.8vh] sm:leading-[12vh] mt-10 mb-10">We Craft Human-Centric Health Software</h1>
                <Button bgColor="bg-none" text="OUR SOLUTIONS" />
            </div>
            <div ref={container} className="right cards sm:w-1/2 flex items-center justify-center">
                <Card />
            </div>
        </div>
    );
};

const Real = () => {
    const container = useRef(null);
    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".real",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        }).to(".slide", { xPercent: -300, ease: Power2.easeInOut })
            .to(".image7", { opacity: 0 });
    }, { scope: container });

    return (
        <div data-color="salmon" ref={container} className="real motion-section sm:w-full px-8 mt-32">
            <div className="cont h-[400vh] relative">
                <div className="slides w-full h-[130vh] overflow-hidden sticky top-0 left-0 flex">
                    <div className="slide w-full flex items-center justify-center h-screen flex-shrink-0 relative">
                        <div className="text1 font-[SansitaReg] text-[7vh] leading-[8vh] sm:text-[15vh] sm:leading-[18vh]">
                            <h1>Real Talk,</h1>
                            <h1>Real Impact</h1>
                        </div>
                        <div className="absolute w-[20vh] h-[20vh] sm:w-[45vh] sm:h-[45vh] top-1/2 right-0 -translate-y-1/2">
                            <img src="/motion-website/images/real4.jpg" className="w-full h-full object-contain rounded-full" alt="real talk" />
                        </div>
                    </div>
                    <div className="slide w-full h-screen flex items-center justify-center flex-shrink-0 relative">
                        <div className="absolute w-[20vh] h-[20vh] sm:w-[40vh] sm:h-[40vh] top-10 right-1/6">
                            <img src="/motion-website/images/real2.jpg" className="w-full h-full object-contain rounded-full" alt="impact" />
                        </div>
                        <div className="w-[60%] text-center font-[SansitaReg] relative">
                            <h3 className="font-[Sansita] sm:w-1/3 text-left font-semibold tracking-tight text-[2.2vh] sm:absolute top-0 left-0 z-[3] -translate-y-1/2 -translate-x-1/3">
                                We’re on a mission to impact as many lives as possible and build a better company while we do it. Here’s our progress.
                            </h3>
                            <h1 className="font-semibold text-[10vh] sm:text-[20vh] leading-none text-white">20.4M</h1>
                            <h3 className="text-[2vh] sm:text-[5vh] font-semibold sm:leading-[7vh]">Real people — real lives — we have built products and solutions for.</h3>
                        </div>
                        <div className="absolute w-[12vh] sm:w-[20vh] sm:h-[20vh] bottom-[10vh] sm:top-2/3 sm:left-1/4">
                            <img src="/motion-website/images/real1.jpg" className="w-full h-full object-contain rounded-full" alt="impact" />
                        </div>
                    </div>
                    <div className="slide w-full h-screen flex items-center justify-center flex-shrink-0 relative">
                        <div className="absolute w-[20vh] h-[20vh] sm:w-[45vh] sm:h-[45vh] bottom-[20vh] right-[20vh] sm:top-20 sm:right-1/6 sm:-translate-y-1/2">
                            <img src="/motion-website/images/icon2.png" className="w-full h-full object-contain rounded-full" alt="icon" />
                        </div>
                        <div className="w-[60%] text-center font-[SansitaReg] relative">
                            <h1 className="font-semibold text-[10vh] sm:text-[20vh] leading-none text-white">49%</h1>
                            <h3 className="text-[3.5vh] sm:text-[6vh] font-semibold">Expert Women in Tech.</h3>
                        </div>
                    </div>
                    <div className="slide w-full h-screen flex items-center justify-center flex-shrink-0 relative">
                        <div className="w-[60%] text-center font-[SansitaReg] relative">
                            <h1 className="font-semibold text-[10vh] sm:text-[20vh] leading-none text-white">13</h1>
                            <h3 className="text-[3.1vh] sm:text-[6vh] font-semibold">Nationalities Represented on Our Team.</h3>
                        </div>
                        <div className="image7 absolute sm:w-[45vh] sm:h-[45vh] bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                            <img src="/motion-website/images/real7.jpg" className="w-full h-full object-contain rounded-full" alt="team" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Para = () => {
    useEffect(() => {
        const para = document.querySelector('.textpara');
        if (para) {
            para.innerHTML = (para.textContent || '').split('').map(char => `<span>${char}</span>`).join('');
            gsap.set('.textpara span', { opacity: 0.1 });
            gsap.to('.textpara span', {
                scrollTrigger: { trigger: '.para', start: 'top 70%', end: 'bottom 90%', scrub: 1 },
                opacity: 1,
                stagger: 0.03,
            });
        }
    }, []);

    return (
        <div data-color="white" className="para motion-section w-full flex items-center justify-center px-8 py-32">
            <div className="text sm:w-[80%] flex flex-col items-center sm:items-start justify-between">
                <hr className="hidden sm:block bg-zinc-400 w-[20%] h-[.3vh] mb-12" />
                <h3 className="textpara sm:w-[100%] text-blue-600 font-[Sansita] tracking-wide text-[2.4vh] sm:text-[3.5vh] font-medium text-center leading-[5vh] mb-10">
                    Working with the Significo team has been such a pleasure! We took on a significant project to rebuild our entire platform and the team approached the project with our best interests in mind...
                </h3>
                <div className="pers w-full flex flex-col items-center justify-center gap-2">
                    <img src="/motion-website/images/review1.jpeg" className="w-24 h-24 rounded-full" alt="review" />
                    <h1 className="text-[2.8vh] sm:text-[3.8vh] font-medium">Miranda Ernst</h1>
                    <h3 className="text-zinc-500 text-[2.4vh]">Product Manager @ HealthCheck360</h3>
                </div>
            </div>
        </div>
    );
};

const Team = () => {
    return (
        <div data-color="white" className="team motion-section font-[SansitaReg] py-20">
            <h1 className="text-5xl sm:text-6xl text-center tracking-tight">Our Team</h1>
            <div className="list mt-10 w-full px-8">
                <List />
                <div className="flex items-center justify-center py-20">
                    <Button bgColor="bg-[#f5f19c]" text="MEET THE ENTIRE TEAM" />
                </div>
            </div>
        </div>
    );
};

const Capsule = () => {
    const container = useRef(null);
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: { trigger: ".capsules", start: "top 60%", end: "bottom bottom", scrub: 0.5 }
        });
        tl.to(".capsule:nth-child(2)", { y: 0, marginTop: 32, ease: Power4.easeInOut });
        tl.to(".capsule:nth-child(1)", { marginTop: 32, ease: Power4.easeInOut });
    }, { scope: container });

    return (
        <div data-color="white" ref={container} className="capsules motion-section w-full sm:h-[115vh] mb-32 sm:flex items-start sm:justify-between px-8 gap-40">
            <div className="left sm:w-1/3 h-full flex flex-col sm:justify-between py-10 items-start">
                <h1 className="w-2/3 font-[Sansita] text-[2.8vh] leading-[4vh] font-medium">Stay up-to-date on the latest healthcare innovations...</h1>
                <div>
                    <h1 className="font-[SansitaReg] text-[5vh] leading-[6.5vh] sm:text-[8vh] py-5">Explore <br /> Our Insights</h1>
                    <Button bgColor="bg-[#f5f19c]" text="VIEW ALL ARTICLES" />
                </div>
            </div>
            <div className="right font-[SansitaReg] mt-10 sm:w-2/3 space-y-10 sm:flex items-start justify-start sm:gap-20">
                <div className="capsule flex flex-col items-center gap-4 p-6 sm:-rotate-[16deg] sm:translate-y-10 rounded-full border-[1px] border-black">
                    <img className="w-[74vw] h-[74vw] sm:w-[40vh] sm:h-[40vh] rounded-full object-cover" src="/motion-website/images/cap1.png" alt="insight" />
                    <h3 className="text-center text-[6vw] sm:text-[3.2vh] font-semibold mt-10">Equity in Tech: A Women's Day Conversation</h3>
                    <button className="bg-[#e9bbff] text-black px-4 rounded-full py-3 mt-10 font-semibold">Thought Leadership</button>
                </div>
                <div className="capsule flex flex-col items-center gap-4 p-6 sm:-rotate-[16deg] sm:translate-y-40 rounded-full border-[1px] border-black">
                    <button className="bg-[#e9bbff] text-black px-4 rounded-full py-3 mt-10 font-semibold">Thought Leadership</button>
                    <h3 className="text-center text-[3.2vh] font-semibold">How to Use Digital Health Interventions</h3>
                    <img className="w-[74vw] h-[74vw] sm:w-[40vh] sm:h-[40vh] rounded-full object-cover" src="/motion-website/images/cap2.jpg" alt="insight" />
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <div data-color="black" className="motion-section w-full bg-black text-white p-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <h1 className="text-4xl font-[SansitaReg]">Significo.</h1>
                    <p className="mt-4 font-[Sansita]">People-centered design for health technology.</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Links</h2>
                    <ul className="space-y-2 opacity-70">
                        <li>Home</li>
                        <li>Solutions</li>
                        <li>About</li>
                        <li>Team</li>
                        <li>Insight</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Newsletter</h2>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Email" className="bg-white/10 p-2 flex-grow" />
                        <button className="bg-[#f5f19c] text-black px-4 py-2 font-bold">JOIN</button>
                    </div>
                </div>
            </div>
            <div className="mt-20 pt-10 border-t border-white/10 text-center opacity-50">
                &copy; 2026 Significo / Ported to Animation Hub
            </div>
        </div>
    );
};

// --- Main Wrapper ---

export default function MotionWebsite() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize Locomotive Scroll
        const scroll = new LocomotiveScroll({
            el: containerRef.current || undefined,
            smooth: true,
            smartphone: { smooth: true },
            tablet: { smooth: true },
        } as any);

        // GSAP Theme Switcher logic
        const sections = containerRef.current?.querySelectorAll('.motion-section');
        sections?.forEach((section) => {
            const color = (section as HTMLElement).dataset.color;
            if (color) {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 50%",
                    end: "bottom 50%",
                    onEnter: () => containerRef.current?.setAttribute('data-motion-theme', color),
                    onEnterBack: () => containerRef.current?.setAttribute('data-motion-theme', color),
                });
            }
        });

        return () => {
            scroll.destroy();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} data-motion-theme="black" className="motion-container font-[SansitaReg]">
            <Home />
            <Craft />
            <Real />
            <Team />
            <Para />
            <Capsule />
            <Footer />
        </div>
    );
}
