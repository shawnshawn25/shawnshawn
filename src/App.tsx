import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import GamesList from './components/GamesList';
import BackendLinks from './components/BackendLinks';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-white relative overflow-hidden">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Header />
        <main>
          <Hero />
          <GamesList />
          <BackendLinks />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;