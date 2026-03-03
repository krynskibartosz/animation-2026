"use client";
import { motion, useMotionValue } from "framer-motion";
import Hero from "@/components/projects/the-line/sections/Hero";
import ProjectCard from "@/components/projects/the-line/components/ProjectCard";
import HighlightCard from "@/components/projects/the-line/components/HighlightCard";

export default function SectionOfSectionsClient() {
  const backgroundColor = useMotionValue("transparent");
  const projects = [
    {
      videoSrc: "/the-line/assets/videos/projects/the-hex.mp4",
      title: "The Hex - Warframe: 1999",
      linkToProject:
        "https://thelinestudio.com/work/the-hex-warframe-1999-animated-prologue",
    },
    {
      videoSrc: "/the-line/assets/videos/projects/azuki-elementals.mp4",
      title: "Azuki Elementals",
      linkToProject: "https://thelinestudio.com/work/azuki",
    },
    {
      videoSrc: "/the-line/assets/videos/projects/marvel-snap.mp4",
      title: "Marvel Snap / Hero",
      linkToProject: "https://thelinestudio.com/work/hero-marvel-snap",
    },
  ];
  return (
    <>
      <Hero />
      <HighlightCard backgroundColor={backgroundColor} />
      <motion.div
        style={{ backgroundColor }}
        className="relative z-30 flex flex-col gap-[5vh] overflow-x-clip lg:gap-[15vh]"
      >
        {projects.map((eachProject) => (
          <ProjectCard key={eachProject.title} {...eachProject} />
        ))}
      </motion.div>
    </>
  );
}
