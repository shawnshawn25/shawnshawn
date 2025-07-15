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
    <section className="pt-20 pb-12 md:pt-32 md:pb-20 relative overflow-hidden" id="home">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="mb-4 md:mb-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Game Categories Grid */}
              <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                <div className="relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                  <img 
                    src="/firekirin.jpg" 
                    alt="Slots Games" 
                    className="w-full h-24 md:h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-2 md:p-4 z-20">
                    <h3 className="text-sm md:text-xl font-bold text-white">Slots Games</h3>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                  <img 
                    src="/fishglory.jpg" 
                    alt="Fish Tables" 
                    className="w-full h-24 md:h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-2 md:p-4 z-20">
                    <h3 className="text-sm md:text-xl font-bold text-white">Fish Tables</h3>
                  </div>
                </div>
              </div>

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
                <div className="relative bg-dark-950/90 rounded-lg p-3 md:p-6 backdrop-blur-sm">
                  <motion.div
                    className="text-lg md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gold-400 to-red-500 flex items-center"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    <div className="relative mr-2 md:mr-4">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-gold-500 rounded-2xl blur-sm opacity-75"></div>
                      <img 
                        src="/sweepshublogo.jpg" 
                        alt="Sweeps Hub" 
                        className="relative h-12 w-16 md:h-20 md:w-28 lg:h-24 lg:w-36 rounded-2xl border-2 border-red-500 shadow-lg object-cover" 
                      />
                    </div>
                    LARGEST GAME COLLECTION
                  </motion.div>
                  <div className="mt-1 md:mt-2 text-sm md:text-lg lg:text-xl text-white/90">
                    Access to <span className="text-gold-400 font-bold">45+ Premium Games</span> in the industry
                  </div>
                </div>
              </div>
            </motion.div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight">
              Premium <span className="text-red-500">Game Credits</span> for Your Gameroom
            </h1>
            <p className="mt-3 md:mt-6 text-sm md:text-lg text-white/80 max-w-xl">
              The leading distributor of game credits for gameroom owners. Get competitive rates and reliable service for your gaming business.
            </p>
            <div className="mt-4 md:mt-8 space-y-2 md:space-y-4">
              {[
                'Bulk credit packages',
                'Competitive wholesale rates',
                'Reliable service',
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="mr-2 mt-0.5 text-red-500 flex-shrink-0" size={16} />
                  <span className="text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4">
              <motion.button
                onClick={() => onSectionChange('games')}
                className="px-4 md:px-6 py-2.5 md:py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold text-center flex items-center justify-center gap-2 transition duration-200 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Games <ArrowRight size={16} />
              </motion.button>
              <motion.a
                href="#contact"
                className="px-4 md:px-6 py-2.5 md:py-3 bg-transparent hover:bg-white/10 border border-white/20 text-white rounded-lg font-semibold text-center transition duration-200 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center mt-6 md:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-sm md:max-w-lg">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              <div className="relative bg-navy-800 p-3 md:p-6 rounded-2xl shadow-xl">
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