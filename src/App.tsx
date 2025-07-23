import React from 'react';
import GamesList from './components/GamesList';
import CasinoBackground from './components/CasinoBackground';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white relative overflow-hidden">
      <CasinoBackground />
      
      {/* Logo Header */}
      <div className="text-center py-6 md:py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 via-transparent to-red-600/10 pointer-events-none"></div>
        <motion.div
          className="flex items-center justify-center space-x-3 md:space-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-gold-400 via-red-500 to-gold-400 rounded-full blur-lg opacity-90 animate-pulse"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-gold-500 rounded-full blur-sm opacity-75"></div>
            <img 
              src="/shawn.jpeg" 
              alt="Shawn Sweepstakes" 
              className="relative h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full border-4 border-gold-400 shadow-2xl shadow-gold-500/50" 
            />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold">
            <span className="relative">
              <span className="absolute -inset-2 bg-gradient-to-r from-gold-400 to-red-500 blur-lg opacity-50"></span>
              <span className="relative bg-gradient-to-r from-gold-300 via-gold-100 to-gold-300 bg-clip-text text-transparent drop-shadow-2xl">
                Shawn Sweepstakes
              </span>
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