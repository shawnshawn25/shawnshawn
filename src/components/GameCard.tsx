import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import type { Game } from '../data/games';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <motion.div
      className="bg-dark-800 rounded-xl overflow-hidden h-full flex flex-col group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {game.popular && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            <Star size={12} fill="white" /> Popular
          </div>
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent opacity-60 z-10"></div>
        <img 
          src={game.imageUrl} 
          alt={game.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 z-10">
          <h3 className="text-xl font-semibold text-white">{game.name}</h3>
          <div className="text-xs font-medium text-white/70 mt-1">
            {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-white/70 text-sm line-clamp-3 mb-4 flex-grow">{game.description}</p>
        
        <div className="mt-auto">
          <div className="bg-dark-700 p-3 rounded-lg mb-4">
            <p className="text-xs text-white/60 uppercase font-medium mb-1">Points Rate</p>
            <p className="text-white font-semibold">{game.pointsRate}</p>
          </div>
          
          <motion.a
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Play Now <ExternalLink size={16} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;