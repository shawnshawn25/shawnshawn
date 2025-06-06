import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { games } from '../data/games';

const BackendLinks = () => {
  return (
    <section className="py-16 md:py-24 relative" id="backend-links">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Admin <span className="text-red-500">Backend Links</span>
          </h2>
        </motion.div>

        <motion.ul 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {games.map((game) => (
            game.adminUrl && (
              <motion.li
                key={game.id}
                className="bg-navy-800 rounded-xl overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4">
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <img 
                      src={game.logo}
                      alt={`${game.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-center mb-3">{game.name}</h3>
                  <motion.a
                    href={game.adminUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium text-sm transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Backend Login <ExternalLink size={14} />
                  </motion.a>
                </div>
              </motion.li>
            )
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default BackendLinks;