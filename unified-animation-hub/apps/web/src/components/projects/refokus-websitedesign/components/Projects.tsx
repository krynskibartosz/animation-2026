"use client";

import Image from 'next/image';
import Project from './Project';

export default function Projects() {
    const projects = [
        {
            val: {
                title: "Arqitel",
                description: "With a continuous 3D animation, we showcase Arqitel approach and show how migration data translates into real estate.",
                tags: ["Concept", "Design", "3D", "Webflow+WebGL Development"],
                logo: 'https://assets-global.website-files.com/6334198f239547f2fccd84c1/64c1cdf5425388ed4532f603_Arqitel%20Logo%20White.svg',
                src: 'https://assets-global.website-files.com/6334198f239547f2fccd84c1/64c1ce90a51cd75d563689fd_Arqitel%20Project%20Thumb%201-p-800.webp',
                color: "#818181"
            }
        },
        {
            val: {
                title: "Cula",
                description: "We immersed ourselves in a 3D world we created to explain how Cula's platform collects data from carbon removal processes and converts them into carbon credit certificates.",
                tags: ["Concept", "Design", "3D", "Webflow+WebGL Development"],
                logo: 'https://assets-global.website-files.com/6334198f239547f2fccd84c1/65b4127d91ec4fa9b1124008_Logo%20White%202.svg',
                src: 'https://assets-global.website-files.com/6334198f239547f2fccd84c1/65b4131f8a4b2b9e6e5b8c9a_Cula%20Project%20Thumb%201-p-800.webp',
                color: "#818181"
            }
        },
        {
            val: {
                title: "TTR",
                description: "We've created an interactive site using generative AI to allow users to engage with our thinking about Ai, industry trends and design.",
                tags: ["Concept", "Design", "3D", "Webflow+WebGL Development", "AI Integrations"],
                logo: 'https://assets-global.website-files.com/6334198f239547f2fccd84c1/660191edcdb42d79ba8c23aa_Logo.svg',
                src: 'https://assets-global.website-files.com/6334198f239547f2fccd84c1/660191f7c8f8b8c0f8e8e8f_TTR%20Project%20Thumb%201-p-800.webp',
                color: "#818181"
            }
        }
    ]

    return (
        <div className='w-full relative flex flex-col items-center px-[5vw] py-[10vw] bg-primary'>
            <div className='max-w-screen-xl mx-auto w-full flex flex-col gap-[5vw]'>
                <div className='flex items-center justify-between w-full'>
                    <h2 className='text-[8vw] leading-[7vw] sm:text-[6vw] sm:leading-[5vw] lg:text-[4vw] lg:leading-[3.5vw] xl:text-[3vw] xl:leading-[2.5vw] text-primary font-bold'>
                        Featured
                    </h2>
                    <button className='text-[1.2vw] text-accent hover:underline'>
                        View all projects
                    </button>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[3vw]'>
                    {projects.map((project, index) => (
                        <Project key={index} val={project.val} />
                    ))}
                </div>
            </div>
        </div>
    )
}
