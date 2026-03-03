"use client";

import About from "@/components/projects/nextjs-portfolio/about";
import Contact from "@/components/projects/nextjs-portfolio/contact";
import Experience from "@/components/projects/nextjs-portfolio/experience";
import Intro from "@/components/projects/nextjs-portfolio/intro";
import Projects from "@/components/projects/nextjs-portfolio/projects";
import SectionDivider from "@/components/projects/nextjs-portfolio/section-divider";
import Skills from "@/components/projects/nextjs-portfolio/skills";
import ActiveSectionContextProvider from "@/components/projects/nextjs-portfolio/context/active-section-context";
import ThemeContextProvider from "@/components/projects/nextjs-portfolio/context/theme-context";
import "@/components/projects/nextjs-portfolio/globals.css";

export default function NextjsPortfolioClient() {
  return (
    <ThemeContextProvider>
      <ActiveSectionContextProvider>
        <main className="flex flex-col items-center px-4">
          <Intro />
          <SectionDivider />
          <About/>
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
      </ActiveSectionContextProvider>
    </ThemeContextProvider>
  );
}
