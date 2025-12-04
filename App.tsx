import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShortsGallery } from './components/ShortsGallery';
import { LongFormGallery } from './components/LongFormGallery';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Background } from './components/ui/Background';

function App() {
  return (
    <div className="relative min-h-screen bg-brand-dark text-slate-100 font-sans selection:bg-brand-primary/30 selection:text-white">
      <Background />
      <Navbar />
      
      <main className="relative z-10 flex flex-col gap-0">
        <Hero />
        <ShortsGallery />
        <LongFormGallery />
        <Features />
        <Testimonials />
        <About />
        <Contact />
      </main>
    </div>
  );
}

export default App;