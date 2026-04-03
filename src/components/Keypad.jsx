import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, ChevronRight, ChevronLeft } from 'lucide-react';

const scientificButtons = [
  { label: 'sin', type: 'func', value: 'sin(' },
  { label: 'cos', type: 'func', value: 'cos(' },
  { label: 'tan', type: 'func', value: 'tan(' },
  { label: 'log', type: 'func', value: 'log10(' },
  { label: 'ln', type: 'func', value: 'log(' },
  { label: '√', type: 'func', value: 'sqrt(' },
  { label: 'xʸ', type: 'func', value: '^' },
  { label: 'π', type: 'func', value: 'pi' },
  { label: '!', type: 'func', value: '!' },
  { label: 'e', type: 'func', value: 'e' },
];

const basicButtons = [
  { label: 'AC', type: 'clear', action: 'clear' },
  { label: 'DEL', type: 'action', action: 'deleteLast', icon: <Delete size={22} className="mx-auto" /> },
  { label: '(', type: 'action', value: '(' },
  { label: '÷', type: 'operator', value: '÷' },

  { label: '7', type: 'number', value: '7' },
  { label: '8', type: 'number', value: '8' },
  { label: '9', type: 'number', value: '9' },
  { label: '×', type: 'operator', value: '×' },

  { label: '4', type: 'number', value: '4' },
  { label: '5', type: 'number', value: '5' },
  { label: '6', type: 'number', value: '6' },
  { label: '-', type: 'operator', value: '-' },

  { label: '1', type: 'number', value: '1' },
  { label: '2', type: 'number', value: '2' },
  { label: '3', type: 'number', value: '3' },
  { label: '+', type: 'operator', value: '+' },

  { label: ')', type: 'action', value: ')' },
  { label: '0', type: 'number', value: '0' },
  { label: '.', type: 'number', value: '.' },
  { label: '=', type: 'equal', action: 'calculate' },
];

const Keypad = ({ onInput, onAction, isScientific, toggleScientific }) => {

  const renderButton = (btn, idx) => {
    // Dynamic sizing via w-full aspect-square to avoid scrolling container overflow!
    let baseStyle = "flex items-center justify-center transition-all duration-200 select-none rounded-full w-full aspect-square max-w-[80px] ";

    switch (btn.type) {
      case 'number': 
        baseStyle += "bg-[#303134] text-[#e3e3e3] hover:bg-[#4a4b4e] text-xl sm:text-3xl font-normal shadow-sm";
        break;
      case 'operator': 
        baseStyle += "bg-[#303134] text-[#8ab4f8] hover:bg-[#4a4b4e] text-2xl sm:text-4xl font-medium shadow-sm";
        break;
      case 'equal': 
        baseStyle += "bg-[#8ab4f8] text-[#1c1c1c] hover:bg-[#aecdfa] text-2xl sm:text-4xl font-medium shadow-md shadow-[#8ab4f8]/20";
        break;
      case 'clear': 
      case 'action': 
        baseStyle += "bg-[#303134] text-[#8ab4f8] hover:bg-[#4a4b4e] text-sm sm:text-xl font-medium shadow-sm";
        break;
      case 'func': 
        baseStyle += "bg-[#202124] text-[#8ab4f8] hover:bg-[#303134] text-xs sm:text-lg font-medium";
        break;
      default:
        baseStyle += "bg-[#303134] text-[#e3e3e3] hover:bg-[#4a4b4e] text-xl sm:text-3xl font-normal";
        break;
    }

    const handleTap = () => {
      if (btn.value !== undefined) {
        onInput(btn.value);
      } else if (btn.action) {
        onAction(btn.action);
      }
    };

    return (
      <motion.button
        key={`${btn.label}-${idx}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.90, backgroundColor: btn.type === 'equal' ? '#aecdfa' : '#5f6368' }}
        onClick={handleTap}
        className={`${baseStyle}`}
      >
        {btn.icon ? btn.icon : btn.label}
      </motion.button>
    );
  };

  return (
    <div className="flex flex-row gap-0 items-center justify-center relative w-full h-full">

      {/* Expand/Collapse Toggle Button (Android style side arrow) */}
      <div className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20">
         <button 
           onClick={toggleScientific}
           className="w-5 sm:w-8 h-16 sm:h-20 bg-[#303134]/90 flex items-center justify-center rounded-r-xl border-l-2 border-[#8ab4f8] shadow-lg text-[#8ab4f8] opacity-80 hover:opacity-100 transition-all font-bold group"
         >
           {isScientific ? <ChevronRight size={24} className="group-hover:scale-110" /> : <ChevronLeft size={24} className="group-hover:scale-110" />}
         </button>
      </div>

      <AnimatePresence>
        {isScientific && (
          <motion.div
            initial={{ width: 0, opacity: 0, marginLeft: -10 }}
            animate={{ width: "auto", opacity: 1, marginLeft: 0 }}
            exit={{ width: 0, opacity: 0, marginLeft: -10 }}
            className="overflow-hidden flex items-center justify-center h-full"
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mr-2 sm:mr-3 w-[120px] sm:w-[150px] place-items-center">
              {scientificButtons.map(renderButton)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 w-full h-full">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full h-full place-items-center">
          {basicButtons.map(renderButton)}
        </div>
      </div>
    </div>
  );
};

export default Keypad;
