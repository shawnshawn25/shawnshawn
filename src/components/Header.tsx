import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex justify-between items-center">
          <motion.a
            href="#"
            className="flex items-center space-x-3 text-white font-heading font-bold text-xl md:text-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/sweepshublogo.jpg" alt="Sweeps Hub" className="h-10 w-10 rounded-full" />
            <span>Sweeps Hub</span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <motion.a
              href="#games"
              className="text-white/80 hover:text-white font-medium transition duration-200"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Games
            </motion.a>
            <motion.a
              href="#backend-links"
              className="text-white/80 hover:text-white font-medium transition duration-200"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Backend Links
            </motion.a>
            <motion.a
              href="#contact"
              className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-900 rounded-md font-semibold transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        className={`md:hidden absolute w-full bg-navy-800 shadow-lg ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            <a
              href="#games"
              className="text-white/80 hover:text-white py-2 font-medium transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Games
            </a>
            <a
              href="#backend-links"
              className="text-white/80 hover:text-white py-2 font-medium transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Backend Links
            </a>
            <a
              href="#contact"
              className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-900 rounded-md font-semibold text-center transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      </motion.nav>
    </motion.header>
  );
};

export default Header;