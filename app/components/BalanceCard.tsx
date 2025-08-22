'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BalanceCard() {
  const [balance, setBalance] = useState(0);
  const [targetBalance] = useState(2847.56);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Animate balance counting up
    setIsAnimating(true);
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetBalance / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetBalance) {
        setBalance(targetBalance);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setBalance(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetBalance]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-green-200 overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #4ade80 0, #4ade80 1px, transparent 1px, transparent 15px)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm text-green-600 font-medium mb-1">Current Balance</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-green-800">£</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={balance}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-4xl font-bold text-green-800 tabular-nums"
                >
                  {balance.toLocaleString('en-GB', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 text-green-600">
              <span className="text-sm font-medium">+12.5%</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Monthly savings goal</span>
            <span>£{(targetBalance * 0.1).toFixed(0)} / £500</span>
          </div>
          <div className="h-2 bg-green-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isAnimating ? '57%' : '57%' }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-green-400 to-green-600"
            />
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-green-50 hover:bg-green-100 text-green-700 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Money
          </button>
          <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            View Stats
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-green-200 rounded-full opacity-20 blur-xl" />
      <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-200 rounded-full opacity-10 blur-2xl" />
    </motion.div>
  );
}
