import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface font-sans text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TechStack />
        <Skills />
        <Projects />
        <Process />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
