import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CreditCard } from 'lucide-react';
import { games } from '../data/games';
import SearchBar from './SearchBar';
import PaymentModal from './PaymentModal';

const GamesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentModal, setPaymentModal] = useState<{ isOpen: boolean; gameName: string }>({
    isOpen: false,
    gameName: ''
  });

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPaymentModal = (gameName: string) => {
    setPaymentModal({ isOpen: true, gameName });
  };

  const closePaymentModal = () => {
    setPaymentModal({ isOpen: false, gameName: '' });
  };

  return (
    <>
      <section className="pt-0 pb-4 md:pb-16 relative" id="games">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-6 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-2 md:mb-4">
            Available <span className="text-red-500">Games</span>
          </h2>
        </motion.div>

        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

          <div className="grid grid-cols-3 gap-3 md:gap-4">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              className="bg-navy-800 rounded-full overflow-hidden group aspect-square"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col h-full">
                <div className="w-full h-full relative rounded-full overflow-hidden">
                  <img 
                    src={game.logo}
                    alt={`${game.name} logo`}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center">
                    <h3 className="text-xs md:text-sm font-semibold text-white leading-tight mb-1 md:mb-2">{game.name}</h3>
                    <div className="relative group space-y-1">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                      <motion.a
                        href={game.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center justify-center gap-1 w-full py-1.5 md:py-2 bg-gradient-to-r from-red-500 to-red-400 hover:from-red-400 hover:to-red-300 text-white rounded-full font-medium transition-colors duration-200 text-xs"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {game.name === 'BLUE DRAGON' ? (
                          <>
                            Web <ExternalLink size={12} />
                          </>
                        ) : (
                          <>
                            Play <ExternalLink size={12} />
                          </>
                        )}
                      </motion.a>
                      <motion.button
                        onClick={() => openPaymentModal(game.name)}
                        className="relative flex items-center justify-center gap-1 w-full py-1.5 md:py-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black rounded-full font-medium transition-colors duration-200 text-xs"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CreditCard size={12} />
                        Buy Credits
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </section>

      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        gameName={paymentModal.gameName}
      />
    </>
  );
};

export default GamesList;