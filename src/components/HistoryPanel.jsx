import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2 } from 'lucide-react';

const HistoryPanel = ({ history, onSelect, onClear, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="absolute right-0 top-0 bottom-0 w-[85%] bg-[#202124] shadow-[-10px_0_40px_rgba(0,0,0,0.5)] z-30 flex flex-col sm:rounded-r-[2.5rem] overflow-hidden border-l border-[#303134]"
        >
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#303134]">
            <div className="flex items-center gap-3 text-white">
              <Clock size={22} className="text-[#8ab4f8]" />
              <h3 className="font-medium text-xl tracking-wide">History</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-[#e3e3e3] hover:bg-[#303134] p-2 rounded-full transition active:bg-[#4a4b4e]"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 sm:p-4 space-y-2 pb-20 pr-1">
            {history.length === 0 ? (
              <div className="text-center text-[#9aa0a6] mt-20 text-lg font-normal">
                No history yet
              </div>
            ) : (
              history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileTap={{ scale: 0.98, backgroundColor: '#303134' }}
                  onClick={() => onSelect(item.expr)}
                  className="p-4 rounded-2xl cursor-pointer hover:bg-[#303134] transition-colors border-b border-[#303134]/50"
                >
                  <div className="text-sm sm:text-lg text-[#9aa0a6] break-all mb-2">
                    {item.expr}
                  </div>
                  <div className="text-2xl sm:text-3xl font-normal text-right text-white">
                    = {item.result}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {history.length > 0 && (
            <div className="absolute bottom-0 w-full p-4 border-t border-[#303134] bg-[#202124]/90 backdrop-blur-md">
              <button
                onClick={onClear}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#f28b82]/10 text-[#f28b82] hover:bg-[#f28b82]/20 active:bg-[#f28b82]/30 transition-colors font-medium text-sm sm:text-lg border border-[#f28b82]/20"
              >
                <Trash2 size={20} />
                Clear History
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HistoryPanel;
