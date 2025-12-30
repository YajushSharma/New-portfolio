import React, { Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Background } from './components/ui/Background';
import { CustomCursor } from './components/ui/CustomCursor';

// Optimization: Lazy load below-the-fold components
// We use a promise wrapper to handle named exports
const ShortsGallery = React.lazy(() => import('./components/ShortsGallery').then(module => ({ default: module.ShortsGallery })));
const LongFormGallery = React.lazy(() => import('./components/LongFormGallery').then(module => ({ default: module.LongFormGallery })));
const Features = React.lazy(() => import('./components/Features').then(module => ({ default: module.Features })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.Testimonials })));
const About = React.lazy(() => import('./components/About').then(module => ({ default: module.About })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));

// Loading placeholder component
const SectionLoader = () => <div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent-purple border-t-transparent rounded-full animate-spin"></div></div>;

function App() {
  return (
    <div className="relative min-h-screen bg-bg-primary text-slate-100 font-sans selection:bg-accent-purple/30 selection:text-white">
      <CustomCursor />
      <Background />
      <Navbar />
      
      <main className="relative z-10 flex flex-col gap-0">
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <ShortsGallery />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <LongFormGallery />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Features />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

export default App;