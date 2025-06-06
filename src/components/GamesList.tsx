import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { games } from '../data/games';
import SearchBar from './SearchBar';

type GameCategory = 'all' | 'slots' | 'fish' | 'tables';

const GamesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<GameCategory>('all');

  const categories: { id: GameCategory; label: string }[] = [
    { id: 'all', label: 'All Games' },
    { id: 'slots', label: 'Slots' },
    { id: 'fish', label: 'Fish Tables' },
    { id: 'tables', label: 'Table Games' }
  ];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeCategory === 'all') return matchesSearch;
    
    const categoryMatches = {
      slots: ['slots', 'casino', 'jackpot'],
      fish: ['fish', 'fishing', 'kirin', 'dragon'],
      tables: ['poker', 'blackjack', 'roulette', 'table']
    };

    const gameNameLower = game.name.toLowerCase();
    return matchesSearch && categoryMatches[activeCategory].some(keyword => 
      gameNameLower.includes(keyword)
    );
  });

  return (
    <section className="pt-8 pb-16 md:pb-24 relative" id="games">
      {/* Category Tabs - Moved to top */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex justify-center">
          <div className="inline-flex bg-navy-800 rounded-lg p-1 shadow-xl">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-8 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-navy-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Available <span className="text-red-500">Games</span>
          </h2>
        </motion.div>

        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              className="bg-navy-800 rounded-xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col h-full">
                <div className="w-full aspect-square relative">
                  <img 
                    src={game.logo}
                    alt={`${game.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <h3 className="text-lg font-semibold">{game.name}</h3>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                    <motion.a
                      href={game.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-red-500 to-red-400 hover:from-red-400 hover:to-red-300 text-white rounded-lg font-medium transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Play Game <ExternalLink size={16} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GamesList;