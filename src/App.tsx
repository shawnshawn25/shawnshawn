import React from 'react';
import GamesList from './components/GamesList';
import CasinoBackground from './components/CasinoBackground';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-white relative overflow-hidden">
      <CasinoBackground />
      
      {/* Logo Header */}
      <div className="text-center py-6 md:py-8">
        <motion.div
          className="flex items-center justify-center space-x-3 md:space-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-gold-500 rounded-full blur-sm opacity-75"></div>
            <img 
              src="/shawn.jpeg" 
              alt="Shawn Sweepstakes" 
              className="relative h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full border-2 border-red-500 shadow-lg" 
            />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold">
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-red-600 to-gold-500 blur opacity-25"></span>
              <span className="relative">Shawn Sweepstakes</span>
            </span>
          </h1>
        </motion.div>
      </div>

      {/* Content */}
      <main className="relative z-10">
        <GamesList />
      </main>
    </div>
  );
}

export default App;