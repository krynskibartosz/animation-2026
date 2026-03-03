import About from "@/components/projects/nextjs-portfolio/about";
import Contact from "@/components/projects/nextjs-portfolio/contact";
import Experience from "@/components/projects/nextjs-portfolio/experience";
import Intro from "@/components/projects/nextjs-portfolio/intro";
import Projects from "@/components/projects/nextjs-portfolio/projects";
import SectionDivider from "@/components/projects/nextjs-portfolio/section-divider";
import Skills from "@/components/projects/nextjs-portfolio/skills";


export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About/>
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
