import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentSection: 'games' | 'backend';
  onSectionChange: (section: 'games' | 'backend') => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, onSectionChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionChange = (section: 'games' | 'backend') => {
    onSectionChange(section);
    setIsMenuOpen(false);
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
      <div className="container mx-auto px-4 py-2 md:py-3">
        <div className="flex justify-between items-center">
          <motion.button
            onClick={() => handleSectionChange('games')}
            className="flex items-center space-x-2 md:space-x-4 text-white font-heading font-bold text-xl md:text-2xl lg:text-3xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-gold-500 rounded-full blur-sm opacity-75"></div>
              <img 
                src="/sweepshublogo.jpg" 
                alt="Sweeps Hub" 
                className="relative h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-full border-2 border-red-500 shadow-lg" 
              />
            </div>
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-red-600 to-gold-500 blur opacity-25"></span>
              <span className="relative">Sweeps Hub</span>
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <motion.a
              href="#contact"
              className="px-3 md:px-4 py-1.5 md:py-2 bg-red-600 hover:bg-red-500 text-white rounded-md font-semibold transition duration-200 text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
            >
              Contact Us
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        className={`md:hidden fixed inset-x-0 top-[60px] bg-navy-900/95 backdrop-blur-md shadow-lg ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          y: isMenuOpen ? 0 : -20
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col space-y-2">
            <a
              href="#contact"
              className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold text-center transition duration-200 text-sm"
              onClick={scrollToContact}
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