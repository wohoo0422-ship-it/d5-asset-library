import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { FloatingCTA } from './components/FloatingCTA';
import { Footer } from './components/Footer';
import { BottomCTA } from './components/BottomCTA';
import { AdminProvider } from './context/AdminContext';
import { AdminControls } from './components/AdminControls';

const App: React.FC = () => {
  return (
    <AdminProvider>
      <div className="min-h-screen flex flex-col relative bg-brand-beige text-brand-darker">
        <Header />
        
        <main className="flex-grow">
          <Hero />
          <Gallery />
          <BottomCTA />
        </main>

        <Footer />
        <FloatingCTA />
        <AdminControls />
      </div>
    </AdminProvider>
  );
};

export default App;