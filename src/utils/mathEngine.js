import { evaluate } from 'mathjs';

export const evaluateExpression = (expr) => {
  try {
    if (!expr) return '';
    // Replace visual symbols with mathjs compatible ones if needed
    // Assuming UI handles most of the correct symbols
    const cleanExpr = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/√\(/g, 'sqrt(');
      
    // Evaluate using math.js
    const res = evaluate(cleanExpr);
    
    // Format to avoid extreme decimals
    if (typeof res === 'number') {
      return Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(8)).toString();
    }
    return res.toString();
  } catch (error) {
    throw new Error('Invalid Expression');
  }
};
