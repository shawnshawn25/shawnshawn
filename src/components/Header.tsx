import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('games');

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
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
          <nav className="hidden md:flex items-center space-x-4">
            <motion.button
              onClick={() => scrollToSection('games')}
              className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                activeSection === 'games'
                  ? 'bg-red-600 text-white'
                  : 'bg-navy-800 text-white/80 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Games
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('backend-links')}
              className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                activeSection === 'backend-links'
                  ? 'bg-red-600 text-white'
                  : 'bg-navy-800 text-white/80 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Backend Links
            </motion.button>
            <motion.a
              href="#contact"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md font-semibold transition duration-200"
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
            <button
              onClick={() => scrollToSection('games')}
              className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                activeSection === 'games'
                  ? 'bg-red-600 text-white'
                  : 'bg-navy-700 text-white/80 hover:text-white'
              }`}
            >
              Games
            </button>
            <button
              onClick={() => scrollToSection('backend-links')}
              className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                activeSection === 'backend-links'
                  ? 'bg-red-600 text-white'
                  : 'bg-navy-700 text-white/80 hover:text-white'
              }`}
            >
              Backend Links
            </button>
            <a
              href="#contact"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md font-semibold text-center transition duration-200"
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