import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

interface HeroProps {
  onSectionChange: (section: 'games' | 'backend') => void;
}

const Hero: React.FC<HeroProps> = ({ onSectionChange }) => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden" id="home">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="mb-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-red-600 via-gold-500 to-red-600 rounded-lg blur-lg opacity-75"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
                <div className="relative bg-dark-950/90 rounded-lg p-6 backdrop-blur-sm">
                  <motion.div
                    className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gold-400 to-red-500"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    🎮 LARGEST GAME COLLECTION
                  </motion.div>
                  <div className="mt-2 text-lg md:text-xl text-white/90">
                    Access to <span className="text-gold-400 font-bold">40+ Premium Games</span> in the industry
                  </div>
                </div>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Premium <span className="text-red-500">Game Credits</span> for Your Gameroom
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              The leading distributor of game credits for gameroom owners. Get competitive rates and reliable service for your gaming business.
            </p>
            <div className="mt-8 space-y-4">
              {[
                'Bulk credit packages',
                'Competitive wholesale rates',
                'Reliable service',
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="mr-2 mt-1 text-red-500 flex-shrink-0" size={20} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => onSectionChange('games')}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold text-center flex items-center justify-center gap-2 transition duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Games <ArrowRight size={18} />
              </motion.button>
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-transparent hover:bg-white/10 border border-white/20 text-white rounded-lg font-semibold text-center transition duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              <div className="relative bg-navy-800 p-6 rounded-2xl shadow-xl">
                <img 
                  src="/sweepshub.jpg" 
                  alt="Sweeps Hub Gaming" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;