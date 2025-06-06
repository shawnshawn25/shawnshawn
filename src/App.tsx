import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import GamesList from './components/GamesList';
import BackendLinks from './components/BackendLinks';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [currentSection, setCurrentSection] = React.useState<'games' | 'backend'>('games');

  return (
    <div className="min-h-screen bg-dark-950 text-white relative overflow-hidden">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Header currentSection={currentSection} onSectionChange={setCurrentSection} />
        <main>
          <Hero onSectionChange={setCurrentSection} />
          {currentSection === 'games' ? (
            <>
              <GamesList />
              <div className="container mx-auto px-4 pb-16">
                <motion.button
                  onClick={() => setCurrentSection('backend')}
                  className="mx-auto block px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Backend Links
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <BackendLinks />
              <div className="container mx-auto px-4 pb-16">
                <motion.button
                  onClick={() => setCurrentSection('games')}
                  className="mx-auto block px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Games
                </motion.button>
              </div>
            </>
          )}
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;