import { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ValentineCard.css';

const ValentineCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card-scene">
      {/* Sobre */}
      <div className={`envelope ${isOpen ? 'open' : ''}`}>
        <div className="envelope-flap"></div>
        <div className="envelope-front">
          <Heart className="heart-seal" fill="#ff6b95" size={30} />
        </div>
      </div>

      {/* Carta */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div 
            className="letter"
            initial={{ y: 0, opacity: 0, scale: 0.8 }}
            animate={{ 
              y: -200,
              opacity: 1, 
              scale: 1,
              transition: { type: "spring", damping: 12 }
            }}
            exit={{ 
              y: 0,
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.3 }
            }}
            onClick={() => setIsOpen(false)}
          >
            <div className="letter-content">
              <Heart className="letter-heart" fill="#ff6b95" size={30} />
              <h2>¡Feliz San Valentín!</h2>
              <p>Toca para cerrar ❤️</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="envelope-clickable"
            onClick={() => setIsOpen(true)}
          >
            <p className="click-text">Toca para abrir ❤️</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentineCard;