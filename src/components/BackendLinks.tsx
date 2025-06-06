import React from 'react';
import { motion } from 'framer-motion';

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
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <a 
                  href={game.adminUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <img 
                      src={game.logo}
                      alt={`${game.name} logo`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-medium">{game.name}</p>
                    </div>
                  </div>
                </a>
              </motion.li>
            )
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default BackendLinks;