import React from 'react';
import GamesList from './components/GamesList';
import { motion } from 'framer-motion';

function App() {

  return (
    <div className="h-screen bg-dark-950 text-white relative overflow-hidden flex flex-col">
      {/* Logo Header */}
      <div className="text-center py-4 md:py-6 flex-shrink-0">
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
              className="relative h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full border-2 border-red-500 shadow-lg" 
            />
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold">
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-red-600 to-gold-500 blur opacity-25"></span>
              <span className="relative">Shawn Sweepstakes</span>
            </span>
          </h1>
        </motion.div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-hidden">
        <GamesList />
      </main>
    </div>
  );
}

export default App;