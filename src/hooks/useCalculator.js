import { useState, useEffect, useCallback } from 'react';
import { evaluateExpression } from '../utils/mathEngine';

export const useCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('calc-history');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [memory, setMemory] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('calc-history', JSON.stringify(history));
  }, [history]);

  const handleInput = useCallback((val) => {
    setError(null);
    if (result) {
      const isOperator = ['+', '-', '×', '÷', '^'].includes(val);
      if (isOperator) {
        setInput(result + val);
      } else {
        setInput(val);
      }
      setResult('');
    } else {
      setInput((prev) => prev + val);
    }
  }, [result]);

  const calculate = useCallback(() => {
    if (!input) return;
    try {
      const res = evaluateExpression(input);
      setResult(res);
      setError(null);
      
      // Save history safely
      setHistory(prev => {
        const newHistory = [{ expr: input, result: res, id: Date.now() }, ...prev];
        return newHistory.slice(0, 50); // keep max 50
      });
    } catch (err) {
      setError('Error');
      setResult('Error');
    }
  }, [input]);

  const clear = useCallback(() => {
    setInput('');
    setResult('');
    setError(null);
  }, []);

  const deleteLast = useCallback(() => {
    setInput((prev) => prev.slice(0, -1));
    setError(null);
  }, []);

  const memoryAdd = useCallback(() => {
    const val = result || input;
    if (!val || val === 'Error') return;
    try {
      const num = Number(evaluateExpression(val));
      setMemory(prev => prev + num);
    } catch {}
  }, [input, result]);

  const memorySubtract = useCallback(() => {
    const val = result || input;
    if (!val || val === 'Error') return;
    try {
      const num = Number(evaluateExpression(val));
      setMemory(prev => prev - num);
    } catch {}
  }, [input, result]);

  const memoryClear = useCallback(() => setMemory(0), []);

  const memoryRecall = useCallback(() => {
    setInput(prev => prev + memory.toString());
  }, [memory]);


  const setExpression = useCallback((expr) => {
    // Allow only digits, standard math symbols, and specific letters used in math functions (sin, cos, tan, log, sqrt, pi, e)
    const sanitized = expr.replace(/[^0-9.+\-*\/×÷^!()episncoalgqrt ]/gi, '');
    setInput(sanitized);
    setResult('');
    setError(null);
  }, []);
  
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    input,
    result,
    error,
    history,
    memory,
    handleInput,
    calculate,
    clear,
    deleteLast,
    memoryAdd,
    memorySubtract,
    memoryClear,
    memoryRecall,
    setExpression,
    clearHistory
  };
};
