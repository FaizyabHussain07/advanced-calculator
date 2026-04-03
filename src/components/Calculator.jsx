import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculator } from '../hooks/useCalculator';
import Display from './Display';
import Keypad from './Keypad';
import HistoryPanel from './HistoryPanel';
import { History, PenLine, Check, Trash } from 'lucide-react';

const Calculator = () => {
  const calc = useCalculator();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key;

      if (isEditable) {
        if (key === 'Enter') {
           e.preventDefault();
           setIsEditable(false); // Save/Exit edit mode on Enter
        }
        return;
      }
      
      if (/^[0-9a-zA-Z.]$/.test(key) || ['+', '-', '*', '/', '(', ')', 'Enter', '=', 'Backspace', 'Escape'].includes(key)) {
        if (key !== 'F5' && key !== 'F12') {
           e.preventDefault();
        }
      }

      // Allow only numbers and specific valid math letters
      if (/^[0-9a-zA-Z.]$/.test(key)) {
        if (/[a-zA-Z]/.test(key) && !/^[episncoalgqrt]$/i.test(key)) return;
        calc.handleInput(key.toLowerCase());
      } else if (['+', '-', '*', '/'].includes(key)) {
        const opMap = { '*': '×', '/': '÷' };
        calc.handleInput(opMap[key] || key);
      } else if (key === 'Enter' || key === '=') {
        calc.calculate();
      } else if (key === 'Backspace') {
        calc.deleteLast();
      } else if (key === 'Escape') {
        calc.clear();
      } else if (key === '(' || key === ')') {
        calc.handleInput(key);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [calc, isEditable]);

  return (
    <div className="flex items-center justify-center h-screen w-screen p-0 sm:p-4 bg-gray-900 transition-colors duration-500 font-sans overflow-hidden">
      
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ 
            opacity: 1, 
            scale: 1,
            maxWidth: isScientific ? 700 : 420
         }}
         transition={{ 
            duration: 0.4, 
            type: "spring", 
            bounce: 0.2
         }}
        className="w-full h-full max-h-none sm:max-h-[850px] bg-[#202124] sm:rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col p-4 sm:p-6 sm:border-8 sm:border-black mx-auto"
      >
        
        {/* Top Navbar Actions */}
        <div className="flex justify-between items-center z-10 w-full px-2 shrink-0">
          <div className="text-[#8ab4f8] font-medium tracking-widest text-sm uppercase flex items-center gap-2">
            Faizu Calc {isEditable && <span className="text-xs text-orange-400 normal-case bg-orange-400/20 px-2 py-0.5 rounded-sm">Editing Mode</span>}
          </div>
          <div className="flex gap-2 sm:gap-4">
            
            {/* Action buttons inside edit mode: Clear and Save */}
            <AnimatePresence>
              {isEditable && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={calc.clear}
                  className="p-2 rounded-full text-[#f28b82] hover:bg-[#303134] transition active:bg-[#4a4b4e]"
                  title="Clear Input"
                >
                  <Trash size={20} />
                </motion.button>
              )}
            </AnimatePresence>

            <button 
              onClick={() => setIsEditable(!isEditable)}
              className={`p-2 rounded-full transition active:bg-[#4a4b4e] ${isEditable ? 'bg-[#8ab4f8]/20 text-[#8ab4f8]' : 'text-[#e3e3e3] hover:bg-[#303134]'}`}
              title={isEditable ? "Save / Done" : "Edit Expression"}
            >
              {isEditable ? <Check size={22} className="text-green-400" /> : <PenLine size={22} />}
            </button>
            
            {!isEditable && (
              <button 
                onClick={() => setIsHistoryOpen(true)}
                className="p-2 rounded-full text-[#e3e3e3] hover:bg-[#303134] transition active:bg-[#4a4b4e]"
                title="History"
              >
                <History size={22} />
              </button>
            )}
          </div>
        </div>

        {/* Display Section */}
        <div className="flex-1 flex flex-col justify-end min-h-[100px] border-b border-[#303134] mb-2 sm:mb-4 shrink">
          <Display 
            input={calc.input}
            result={calc.result}
            error={calc.error}
            memory={calc.memory}
            isEditable={isEditable}
            onInputChange={calc.setExpression}
            saveEdit={() => setIsEditable(false)}
          />
        </div>

        {/* Keypad Section */}
        <div className="shrink-0 w-full h-[60%] sm:h-[65%] mt-2 relative flex justify-center">
           <Keypad 
            onInput={calc.handleInput}
            onAction={(action) => {
               if (calc[action]) calc[action]();
            }}
            isScientific={isScientific}
            toggleScientific={() => setIsScientific(!isScientific)}
          />
        </div>

        <HistoryPanel 
          isOpen={isHistoryOpen} 
          onClose={() => setIsHistoryOpen(false)}
          history={calc.history}
          onSelect={calc.setExpression}
          onClear={calc.clearHistory}
        />
        
      </motion.div>
    </div>
  );
};

export default Calculator;
