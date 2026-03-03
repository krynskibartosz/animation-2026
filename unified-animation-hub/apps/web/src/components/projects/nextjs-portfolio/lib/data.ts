import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { FaServer } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

// Fallback images for all assets
const fallbackImages = {
  cubertoImg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ECuberto%3C/text%3E%3C/svg%3E",
  youtubeImg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EYouTube Clone%3C/text%3E%3C/svg%3E",
  heroSectionImg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EHero Section%3C/text%3E%3C/svg%3E",
  disneyNew: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EDisney%3C/text%3E%3C/svg%3E",
  webImg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EWeb Project%3C/text%3E%3C/svg%3E",
  moveMouseImg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EMove Mouse%3C/text%3E%3C/svg%3E",
  website3d: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3E3D Website%3C/text%3E%3C/svg%3E",
  discord: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EDiscord%3C/text%3E%3C/svg%3E",
  pill_image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EPill Image%3C/text%3E%3C/svg%3E",
  motion1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EMotion 1%3C/text%3E%3C/svg%3E",
  motion2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EMotion 2%3C/text%3E%3C/svg%3E",
  obysPick: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EObys%3C/text%3E%3C/svg%3E",
  makeImg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EMake%3C/text%3E%3C/svg%3E",
  pine: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EPine%3C/text%3E%3C/svg%3E",
  brndbt: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EBrand%3C/text%3E%3C/svg%3E",
  airbnb: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EAirbnb%3C/text%3E%3C/svg%3E",
  refo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ERefo%3C/text%3E%3C/svg%3E"
};

// Use fallback images directly to avoid import issues
const cubertoImg = fallbackImages.cubertoImg;
const youtubeImg = fallbackImages.youtubeImg;
const heroSectionImg = fallbackImages.heroSectionImg;
const disneyNew = fallbackImages.disneyNew;
const webImg = fallbackImages.webImg;
const moveMouseImg = fallbackImages.moveMouseImg;
const website3d = fallbackImages.website3d;
const discord = fallbackImages.discord;
const pill_image = fallbackImages.pill_image;
const motion1 = fallbackImages.motion1;
const motion2 = fallbackImages.motion2;
const obysPick = fallbackImages.obysPick;
const makeImg = fallbackImages.makeImg;
const pine = fallbackImages.pine;
const brndbt = fallbackImages.brndbt;
const airbnb = fallbackImages.airbnb;
const refo = fallbackImages.refo;

// Try to import images, fallback to placeholder if failed
const getImage = (importedImage: any, fallbackKey: keyof typeof fallbackImages): string => {
  try {
    return importedImage;
  } catch (error) {
    return fallbackImages[fallbackKey];
  }
};

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Product Designer",
    location: "SIERRA INNOVATIONS PVT. LTD.",
    description:
      "Led the product design management for an e-learning Mobile & Web application, overseeing the implementation of various features to enhance user experience.",
    icon: React.createElement(CgWorkAlt),
    date: "2022-2023",
  },
  {
    title: "Post Graduate in Software Development",
    location: "International Institute of Information Technology",
    description:
      "I enrolled in software development course with Upgard, also upskilled to the full stack.",
    icon: React.createElement(LuGraduationCap),
    date: "2022 - 2023",
  },
  {
    title: "Master in Computer Science",
    location: "Liverpool John Moore's University",
    description:
      "I enrolled for master's in Computer Science in Liverpool John Moore's University.",
    icon: React.createElement(LuGraduationCap),
    date: "2023 - 2024",
  },
  {
    title: "Frontend Developer",
    location: "Delhi, India",
    description:
      "Developed 10+ Projects in frontend. My stack includes React, Next.js, TypeScript, Tailwind, Sanity and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2022 - 2024",
  },
  {
    title: "Software Engineer II",
    location: "JP Morgan Chase & Co",
    description:
      "Developed DP Studio, a one-stop web application for CIB Engineers and Product Owners to onboard, configure, deploy, and monitor shared services, improving internal workflows and reducing operational friction. Optimisation from JPMM Admin to DP Studio, delivering a unified interface for JP Morgan Markets and enhancing collaboration and teamwork across developers, product managers, platform engineers, and risk teams.",
    icon: React.createElement(FaServer),
    date: "2024 - present",
  }, 
] as const;

export const projectsData = [
  {
    title: "Cuberto Clone",
    description:
      "I made Awwwards winning website Cuberto. It's a single page website with a lot of animations and interactions.",
    tags: ["HTML", "CSS", "Javascript", "GSAP", "Locomotive"],
    imageUrl: cubertoImg,
    imagePath: "https://poojahooda22.github.io/Cuberto-newWebsite-Clone/",
  },
  
  {
    title: "Design Agency Website",
    description:
      "An Awwwards winning Brandbeet design studio website, with a lot of animations and interactions.",
    tags: ["Nextjs","React", "Javascript", "Framer Motion", "lenis-locomotive-scroll", "Tailwindcss", "GSAP"],
    imageUrl: brndbt,
    imagePath: "https://designwebsite-nu.vercel.app/"
  },
  {
    title: "Refokus Website",
    description:
      "An Awwwards winning design studio website, with a lot of animations and interactions and navigate through pages",
    tags: ["Nextjs","React", "Typescript", "Framer Motion", "lenis-locomotive-scroll", "Tailwindcss", "GSAP"],
    imageUrl: refo,
    imagePath: "https://refokus-websitedesign.vercel.app/"
  },
  {
    title: "Design Studio Clone",
    description:
      "An Awwwards winning Significo design studio website, with a lot of animations and interactions.",
    tags: ["Vite","React", "Javascript", "Framer Motion", "locomotive-scroll", "Tailwindcss", "GSAP"],
    imageUrl: motion2,
    imagePath: "https://motion-project-alpha.vercel.app/"
  },
  {
    title: "Makepill Clone",
    description:
      "An Awwwards winning Makepill studio website, with a lot of animations and interactions.",
    tags: ["Nextjs","React", "Javascript", "Framer Motion", "lenis", "Tailwindcss", "GSAP"],
    imageUrl: makeImg,
    imagePath: "https://makepill-redesign.vercel.app/"
  },  
  {
    title: "Motion Website",
    description:
      "An Awwwards winning Ochi design website, with a lot of animations and interactions.",
    tags: ["Vite","React", "Typescript", "Framer Motion", "locomotive-scroll", "Tailwindcss", 'GSAP'],
    imageUrl: motion1,
    imagePath: "https://motion-website-rose.vercel.app/"
  },
  {
    title: "Obys Agency Clone",
    description:
      "An Awwwards winning Obys design website, with a lot of animations and interactions.",
    tags: ["Vite","React", "Javascript", "Framer Motion", "locomotive-scroll", "Tailwindcss", 'GSAP'],
    imageUrl: obysPick,
    imagePath: "https://obys-clone-ten.vercel.app/"
  },
  {
    title: "Youtube Clone",
    description:
      "Clone of youtube homepage, with a search bar that fetches videos from the youtube API.",
    tags: ["React", "Javascript", "API", "Redux"],
    imageUrl: youtubeImg,
    imagePath: "https://poojahooda22.github.io/youtube-clone/"
  },
  {
    title: "Portfolio Website",
    description:
      "My portfolio website, built with vanilla javascript and GSAP for motion.",
    tags: ["HTML", "CSS", "Javascript", "GSAP"],
    imageUrl: webImg,
    imagePath: "https://poojahooda22.github.io/modern-website/"
  },
  {
    title: "Disney+ Clone",
    description:
      "Clone the Disney+ homepage, with a slider that fetches movies from the TMDB API.",
    tags: ["React", "Next js", "Typescript", "Motion"],
    imageUrl: disneyNew,
    imagePath: "https://disney-clone-eight-azure.vercel.app/"
  },
  {
    title: "Discord Web App",
    description:
      "Integrated PlanetScale and Prisma/client for seamless database management and employed planetscale with mysql.",
    tags: ["React", "Next js", "Typescript", "Prisma", "Tailwind", "Mysql", "Zustand", "Socket.io" ],
    imageUrl: discord,
    imagePath: "https://discord-clone-git-master-pooja-hoodas-projects.vercel.app/"
  },
  {
    title: "Three js Website",
    description:
      "A 3D website with animations and interactions. Used prismic for dynamic content slides.",
    tags: ["React", "Next js", "Typescript", "Three.js", "Prismic", "Framer Motion"],
    imageUrl: website3d,
    imagePath: "https://pooja-portfolio-pink.vercel.app/"
  }, 
  
  {
    title: "Airbnb Web App",
    description:
      "It is a clone of Airbnb website, with a search bar that fetches hotels from the API.",
    tags: ["React", "Next js", "Typescript", "Three.js", "Prismic", "Framer Motion"],
    imageUrl: airbnb,
    imagePath: "https://airbnb-video-seven.vercel.app/"
  },
  {
    title: "Landing Page",
    description:
      "A web page that display a video and animations.",
    tags: ["HTML", "CSS", "Javascript", "GSAP"],
    imageUrl: heroSectionImg,
    imagePath: "https://poojahooda22.github.io/landing-page-03/"
  },
  {
    title: "Webpage 3D Rotation Animation",
    description:
      "A web page that display a title and 3D rotation animation.",
    tags: ["React", "Javascript", "GSAP", "Framer-motion"],
    imageUrl: pine,
    imagePath: "https://webpage-3danime.vercel.app/"
  },
  {
    title: "GSAP Animation",
    description:
      "A webpage featuring animations, where images emerge from the bottom to the top as the mouse is moved.",
    tags: ["HTML", "CSS", "Javascript", "GSAP"],
    imageUrl: moveMouseImg,
    imagePath: "https://poojahooda22.github.io/mousemove-images-animation/"
  },
  {
    title: "Text-pill Animation",
    description:
      "A webpage featuring animations, where text pills emerge from the top to the bottom and move via mouse move.",
    tags: ["HTML", "CSS", "Javascript", "P5", "Matter.js"],
    imageUrl: pill_image,
    imagePath: "https://poojahooda22.github.io/pill-text-animate/"
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "React Native",
  "Nextjs",
  "Nodejs",
  "ReactQuery",
  "Tanstack Query",
  "Git",
  "TailwindCSS",
  "Sanity",
  "MongoDB",
  "MySql",
  "Redux",
  "Framer Motion",
  "GSAP",
  "LocomotiveScroll",
  "Java",
  "p5",
  "matter.js",
  "Three js",
  "Prismic",
  "Git",
  "Github",
  "Postman",
  "AWS"
] as const;