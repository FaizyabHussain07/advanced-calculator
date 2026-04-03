import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Display = ({ input, result, error, memory, isEditable, onInputChange, saveEdit }) => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of input if it wraps significantly
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [input, result]);

  // Focus textarea when edit mode activates
  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  // Block irrelevant keys directly at the DOM level for pure UX
  const handleKeyDown = (e) => {
    // Let meta commands through (ctrl+A, arrows, backspace, enter)
    if (e.ctrlKey || e.metaKey || e.altKey || e.key.length > 1) {
      if (e.key === 'Enter') {
         e.preventDefault();
         if (saveEdit) saveEdit();
      }
      return; 
    }
    
    // Strict regex blocking DOM level rendering of useless alphabet
    if (!/^[0-9.+\-*\/×÷^!()episncoalgqrt ]$/i.test(e.key)) {
      e.preventDefault();
    }
  };

  // Determine font size classes based on length
  const inputLen = input?.length || 0;
  const resLen = String(result || error || '').length;

  let inputSize = 'text-4xl sm:text-5xl';
  if (inputLen > 25) {
    inputSize = 'text-xl sm:text-2xl';
  } else if (inputLen > 15) {
    inputSize = 'text-2xl sm:text-3xl';
  }

  let resultSize = 'text-5xl sm:text-6xl';
  if (resLen > 20) {
    resultSize = 'text-3xl sm:text-4xl';
  } else if (resLen > 12) {
    resultSize = 'text-4xl sm:text-5xl';
  }

  return (
    <div className={`w-full flex justify-end items-end flex-col p-2 space-y-2 relative h-full min-h-[160px] transition-colors rounded-3xl ${isEditable ? 'bg-[#303134] border border-[#8ab4f8] shadow-inner' : 'bg-transparent border border-transparent'}`}>
      
      {/* Memory Indicator */}
      {memory !== 0 && (
        <span className="absolute top-2 left-2 text-xs font-bold text-[#8ab4f8] tracking-widest bg-[#8ab4f8]/10 px-2 py-1 rounded-md">
          M
        </span>
      )}

      {/* Input Expression - Expands and Word Wraps */}
      <motion.div 
        key={`input-box`}
        className="w-full text-right flex-1 flex flex-col justify-end overflow-y-auto no-scrollbar"
        ref={containerRef}
      >
        {isEditable ? (
           <textarea 
             ref={inputRef}
             value={input}
             onKeyDown={handleKeyDown}
             onChange={(e) => onInputChange(e.target.value)}
             className={`w-full bg-transparent outline-none resize-none text-right text-[#8ab4f8] font-light transition-all duration-300 ${inputSize}`}
             style={{ wordBreak: 'break-word', lineHeight: '1.2' }}
             rows={3}
           />
        ) : (
          <div 
            className={`text-[#9aa0a6] font-light tracking-wide w-full break-all whitespace-pre-wrap transition-all duration-300 ${inputSize}`}
            style={{ wordBreak: 'break-word', lineHeight: '1.2' }}
          >
            {input || ''}
          </div>
        )}
      </motion.div>

      {/* Result or Error */}
      <motion.div
        key={`result-${resultSize}-${result || error}`}
        initial={{ y: 5, opacity: 0.8 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`w-full text-right ${error ? 'text-[#f28b82]' : 'text-white'}`}
      >
        <div 
           className={`font-light tracking-tight w-full break-all whitespace-pre-wrap transition-all duration-300 ${resultSize}`}
           style={{ wordBreak: 'break-word', lineHeight: '1.1' }}
        >
          {error ? error : result ? `= ${result}` : (input ? '' : '0')}
        </div>
      </motion.div>

    </div>
  );
};

export default Display;
