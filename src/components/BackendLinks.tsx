import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { games } from '../data/games';
import SearchBar from './SearchBar';

const BackendLinks = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = games.filter(game =>
    game.adminUrl && game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-8 md:py-16 relative" id="backend-links">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-6 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-2 md:mb-4">
            Admin <span className="text-red-500">Backend Links</span>
          </h2>
        </motion.div>

        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search backend links..."
        />

        <motion.ul 
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 md:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {filteredGames.map((game) => (
            <motion.li
              key={game.id}
              className="bg-navy-800 rounded-xl overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 md:p-4">
                <div className="aspect-square overflow-hidden rounded-lg mb-2 md:mb-4">
                  <img 
                    src={game.logo}
                    alt={`${game.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xs md:text-sm font-medium text-center mb-2 md:mb-3 leading-tight">{game.name}</h3>
                <motion.a
                  href={game.adminUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 md:gap-2 w-full py-1.5 md:py-2 px-2 md:px-4 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium text-xs md:text-sm transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="hidden sm:inline">Backend</span> Login <ExternalLink size={12} className="md:hidden" /><ExternalLink size={14} className="hidden md:inline" />
                </motion.a>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default BackendLinks;