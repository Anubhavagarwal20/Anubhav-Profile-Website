import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExpertiseMarquee } from './components/ExpertiseMarquee';
import { About } from './components/About';
import { Services } from './components/Services';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Experience } from './components/Experience';
import { SkillsTools } from './components/SkillsTools';
import { CreativeGallery } from './components/CreativeGallery';
import { EducationCertifications } from './components/EducationCertifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { AmbientGlow } from './components/AmbientGlow';

export const App: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans relative selection:bg-cyan-500 selection:text-black">
      {/* Cinematic Ambient Mouse Glow */}
      <AmbientGlow />

      {/* Navigation Bar */}
      <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Main Sections in Required Order */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Animated Expertise Marquee */}
        <ExpertiseMarquee />

        {/* 3. About Me */}
        <About />

        {/* 4. Services ("WHAT I DO") - White Canvas Transition */}
        <Services />

        {/* 5. Featured Projects ("SELECTED WORK") - Dark Canvas & Sticky Cards */}
        <FeaturedProjects />

        {/* 6. Professional Experience ("MY JOURNEY") */}
        <Experience />

        {/* 7. Skills and Tools ("MY TOOLKIT") */}
        <SkillsTools />

        {/* 8. Creative Portfolio ("CREATIVE GALLERY") */}
        <CreativeGallery />

        {/* 9. Education and Certifications */}
        <EducationCertifications />

        {/* 10. Contact Section */}
        <Contact onOpenResume={() => setIsResumeModalOpen(true)} />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Verified Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default App;
