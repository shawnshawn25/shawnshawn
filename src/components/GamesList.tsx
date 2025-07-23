import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { games } from '../data/games';
import SearchBar from './SearchBar';

const GamesList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="h-full flex flex-col px-4" id="games">
      <div className="container mx-auto flex-1 flex flex-col">
        <motion.div
          className="text-center mb-4 flex-shrink-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold mb-2">
            Available <span className="text-red-500">Games</span>
          </h2>
        </motion.div>

        <div className="flex-shrink-0 mb-4">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3 pb-4">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              className="bg-navy-800 rounded-lg overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col">
                <div className="w-full aspect-square relative overflow-hidden">
                  <img 
                    src={game.logo}
                    alt={`${game.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-1.5 md:p-2 flex flex-col gap-1.5 md:gap-2">
                  <h3 className="text-xs md:text-sm font-semibold text-center leading-tight line-clamp-2">{game.name}</h3>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                    <motion.a
                      href={game.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center justify-center gap-1 w-full py-1.5 md:py-2 bg-gradient-to-r from-red-500 to-red-400 hover:from-red-400 hover:to-red-300 text-white rounded-lg font-medium transition-colors duration-200 text-xs"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Play <ExternalLink size={12} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GamesList;