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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <motion.button
            onClick={() => handleSectionChange('games')}
            className="flex items-center space-x-3 text-white font-heading font-bold text-xl md:text-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/sweepshublogo.jpg" alt="Sweeps Hub" className="h-10 w-10 rounded-full" />
            <span>Sweeps Hub</span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <div className="flex bg-navy-800 rounded-lg p-1">
              <motion.button
                onClick={() => handleSectionChange('games')}
                className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                  currentSection === 'games'
                    ? 'bg-red-600 text-white'
                    : 'text-white/80 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Games
              </motion.button>
              <motion.button
                onClick={() => handleSectionChange('backend')}
                className={`px-4 py-2 rounded-md font-medium transition duration-200 ${
                  currentSection === 'backend'
                    ? 'bg-red-600 text-white'
                    : 'text-white/80 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Backend Links
              </motion.button>
            </div>
            <motion.a
              href="#contact"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md font-semibold transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
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
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        className={`md:hidden fixed inset-x-0 top-[72px] bg-navy-900/95 backdrop-blur-md shadow-lg ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          y: isMenuOpen ? 0 : -20
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleSectionChange('games')}
              className={`px-4 py-3 rounded-lg font-medium transition duration-200 ${
                currentSection === 'games'
                  ? 'bg-red-600 text-white'
                  : 'text-white/80 hover:text-white hover:bg-navy-800'
              }`}
            >
              Games
            </button>
            <button
              onClick={() => handleSectionChange('backend')}
              className={`px-4 py-3 rounded-lg font-medium transition duration-200 ${
                currentSection === 'backend'
                  ? 'bg-red-600 text-white'
                  : 'text-white/80 hover:text-white hover:bg-navy-800'
              }`}
            >
              Backend Links
            </button>
            <a
              href="#contact"
              className="px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold text-center transition duration-200"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
                setIsMenuOpen(false);
              }}
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