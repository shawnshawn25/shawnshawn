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
            <span className="bg-gradient-to-r from-gold-300 via-gold-100 to-gold-300 bg-clip-text text-transparent drop-shadow-lg">
              Epic Gaming
            </span>{' '}
            <span className="bg-gradient-to-r from-red-400 via-red-300 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
              Collection
            </span>
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
              className="bg-gradient-to-br from-red-900/80 via-red-800/60 to-black/80 rounded-full overflow-hidden group aspect-square border-2 border-gold-500/30 shadow-xl shadow-red-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4), 0 0 30px rgba(251, 191, 36, 0.3)",
                transition: { duration: 0.3 } 
              }}
            >
              <div className="flex flex-col h-full">
                <div className="w-full h-full relative rounded-full overflow-hidden">
                  <img 
                    src={game.logo}
                    alt={`${game.name} logo`}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 rounded-full"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-red-500/20 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center">
                    <h3 className="text-xs md:text-sm font-semibold text-white leading-tight mb-1 md:mb-2">{game.name}</h3>
                    <div className="relative group space-y-1">
                      <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-red-500 to-gold-400 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                      <motion.a
                        href={game.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center justify-center gap-1 w-full py-1.5 md:py-2 bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:via-red-400 hover:to-red-500 text-white rounded-full font-bold transition-all duration-300 text-xs shadow-lg border border-red-400/50"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)" }}
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
                        className="relative flex items-center justify-center gap-1 w-full py-1.5 md:py-2 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:via-gold-400 hover:to-gold-500 text-black rounded-full font-bold transition-all duration-300 text-xs shadow-lg border border-gold-400/50"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(251, 191, 36, 0.6)" }}
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